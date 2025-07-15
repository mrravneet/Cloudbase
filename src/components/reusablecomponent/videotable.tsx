import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Trash2, Download } from "lucide-react";

function formatBytes(bytes) {
  if (bytes === 0 || !bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Add prop type for onVideoCountChange
const VideoTable = ({ onVideoCountChange }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from("user-uploads")
        .list("uploads", { limit: 100, offset: 0 });

      if (error) {
        console.error("Error fetching videos:", error.message);
        setLoading(false);
        if (onVideoCountChange) onVideoCountChange(0);
        return;
      }

      const videoFiles = data
        .filter((file) => file.name.match(/\.(mp4|avi|mov|webm)$/i))
        .map((file) => {
          const path = `uploads/${file.name}`;
          const { data: urlData } = supabase.storage
            .from("user-uploads")
            .getPublicUrl(path);
          return {
            name: file.name,
            size: formatBytes(file.metadata?.size),
            uploadDate: file.created_at || "-",
            url: urlData.publicUrl,
          };
        });
      setVideos(videoFiles);
      setLoading(false);
      if (onVideoCountChange) onVideoCountChange(videoFiles.length);
    };
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteVideo = async (fileName) => {
    const filePath = `uploads/${fileName}`;
    const { error } = await supabase.storage
      .from("user-uploads")
      .remove([filePath]);
    if (error) {
      alert("Delete failed: " + error.message);
      return;
    }
    setVideos((prev) => {
      const updated = prev.filter((vid) => vid.name !== fileName);
      if (onVideoCountChange) onVideoCountChange(updated.length);
      return updated;
    });
    alert("Video deleted!");
  };

  const handleDownloadVideo = (url, fileName) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-white rounded-lg shadow-md sticky top-0 z-10">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider rounded-tl-lg">
              Preview
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Size
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Upload Date
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider rounded-tr-lg">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white bg-white">
          {videos.map((file) => (
            <tr key={file.name}>
              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                <video
                  className="h-10 w-16 object-cover rounded-md"
                  src={file.url}
                  controls
                  preload="metadata"
                  style={{ maxWidth: 80 }}
                />
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                <span>{file.name}</span>
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                {file.size}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                {file.uploadDate}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                <Button variant="ghost" size="icon" onClick={() => handleDeleteVideo(file.name)}>
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
                <Button variant="outline" size="icon" className="ml-2" onClick={() => handleDownloadVideo(file.url, file.name)}>
                  <Download className="h-5 w-5 text-blue-500" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <div className="text-center py-4">Loading...</div>}
      {!loading && videos.length === 0 && (
        <div className="col-span-full text-center py-8">
          <div className="h-12 w-12 mx-auto text-muted-foreground mb-4">🎬</div>
          <p className="text-muted-foreground">No videos uploaded yet.</p>
        </div>
      )}
    </div>
  );
};

export default VideoTable; 