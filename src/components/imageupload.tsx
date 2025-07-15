'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(null);
  const [filePath, setFilePath] = useState(null); // Track file path for deletion

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) return alert('No image selected');

    setUploading(true);

    const fileExt = image.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error } = await supabase.storage
      .from('user-uploads') // updated bucket name
      .upload(filePath, image, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error.message);
      alert('Upload failed');
    } else {
      const { data } = supabase.storage
        .from('user-uploads') // updated bucket name
        .getPublicUrl(filePath);
      setUrl(data.publicUrl);
      setFilePath(filePath); // Save file path for deletion
    }

    setUploading(false);
  };

  const deleteImage = async () => {
    if (!filePath) return alert('No image to delete');
    setUploading(true);
    const { error } = await supabase.storage
      .from('user-uploads') // updated bucket name
      .remove([filePath]);
    setUploading(false);
    if (error) {
      alert('Delete failed');
    } else {
      setUrl(null);
      setFilePath(null);
      setImage(null);
      alert('Image deleted');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={uploadImage} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>

      {url && (
        <div>
          <p>Uploaded Image:</p>
          <img src={url} alt="Uploaded" width={200} />
          <button onClick={deleteImage} disabled={uploading}>
            {uploading ? 'Deleting...' : 'Delete Image'}
          </button>
        </div>
      )}
    </div>
  );
}
