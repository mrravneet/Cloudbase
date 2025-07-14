'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(null);

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
      .from('user-images') // your bucket name
      .upload(filePath, image, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error.message);
      alert('Upload failed');
    } else {
      const { data } = supabase.storage
        .from('user-images')
        .getPublicUrl(filePath);
      setUrl(data.publicUrl);
    }

    setUploading(false);
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
        </div>
      )}
    </div>
  );
}
