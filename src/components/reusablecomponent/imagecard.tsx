import React, { useRef, useState } from 'react'
import { Card, CardContent, CardTitle, CardHeader } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { ImageIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { supabase } from '@/lib/supabaseClient'
import { useToast } from '@/hooks/use-toast'

const ImageCard = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { toast } = useToast();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setUploadError(null);
    } else {
      setFile(null);
      setFileName(null);
    }
  };

  const uploadImage = async () => {
    if (!file) return alert('No image selected');
    setUploading(true);
    setUploadError(null);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;
    const { error } = await supabase.storage
      .from('user-uploads')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });
    setUploading(false);
    if (error) {
      setUploadError(error.message);
      return;
    }
    toast({
      title: 'Image Uploaded!',
      description: 'Your image has been uploaded successfully.',
    });
    // Reset input and state after upload
    setFile(null);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const onCancelClick = () => {
    setFile(null);
    setFileName(null);
    setUploading(false);
    setUploadError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <Card className='w-full' >
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5" />
            <span>Upload Images</span>
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <div className="space-y-4">
            <Label htmlFor="image-upload">Choose Image</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={onFileChange}
            />
            <p className="text-sm text-muted-foreground">
              Supported formats: JPG, PNG, GIF, WEBP
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="hero" type="button" onClick={uploadImage} disabled={!file || uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
            <Button variant="destructive" onClick={onCancelClick} disabled={!file && !fileName}>
              Cancel
            </Button>
          </div>
          {fileName && (
            <p className="text-sm text-foreground">Selected: {fileName}</p>
          )}
          {uploadError && (
            <p className="text-sm text-red-500">Error: {uploadError}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ImageCard