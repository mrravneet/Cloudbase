import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NeuralCard } from "@/components/ui/neural-card";
import { FloatingElements, NeuralNetwork } from "@/components/ui/floating-elements";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Cloud, 
  Upload, 
  Image, 
  Video, 
  FileText, 
  LogOut,
  User,
  Settings,
  Download,
  Trash2,
  Brain,
  Sparkles,
  Cpu,
  Zap,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface FileItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'note';
  size?: string;
  uploadDate: string;
  content?: string;
}

const Dashboard = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const newFile: FileItem = {
          id: Date.now().toString(),
          name: file.name,
          type: type,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          content: URL.createObjectURL(file) // For preview
        };
        setFiles([newFile, ...files]);
        toast({
          title: "File Uploaded!",
          description: `${file.name} has been uploaded successfully.`,
        });
      } catch (error: any) {
        toast({
          title: "Upload Error",
          description: error.message || "Failed to upload file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleNoteCreate = () => {
    if (newNote.title && newNote.content) {
      const note: FileItem = {
        id: Date.now().toString(),
        name: newNote.title,
        type: 'note',
        uploadDate: new Date().toISOString().split('T')[0],
        content: newNote.content
      };
      setFiles([note, ...files]);
      setNewNote({ title: "", content: "" });
      toast({
        title: "Note Created!",
        description: "Your note has been saved successfully.",
      });
    }
  };

  const handleDeleteFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
    toast({
      title: "File Deleted",
      description: "File has been removed from your cloud storage.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      case 'note': return <FileText className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getFilesByType = (type: 'image' | 'video' | 'note') => {
    return files.filter(file => file.type === type);
  };

  return (
    <div className="min-h-screen mesh-bg relative overflow-hidden">
      <FloatingElements count={15} />
      <NeuralNetwork />
      
      {/* Header */}
      <header className="relative z-10 border-b border-white/10 glass-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Brain className="h-8 w-8 text-primary animate-neural-pulse" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-accent animate-glow" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Minicloud
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {/* <Button variant="quantum" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="quantum" size="icon">
              <Settings className="h-5 w-5" />
            </Button> */}
            <Button variant="quantum" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">AI-Powered </span>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience intelligent file management with neural network-enhanced organization and AI-powered insights.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Files</CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{files.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Images & Videos</CardTitle>
              <Image className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getFilesByType('image').length + getFilesByType('video').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getFilesByType('note').length}</div>
            </CardContent>
          </Card>
        </div>

        {/* File Management Tabs */}
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Image className="h-5 w-5" />
                    <span>Upload Images</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Label htmlFor="image-upload">Choose Image</Label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'image')}
                    />
                    <p className="text-sm text-muted-foreground">
                      Supported formats: JPG, PNG, GIF, WEBP
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Video Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="h-5 w-5" />
                    <span>Upload Videos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Label htmlFor="video-upload">Choose Video</Label>
                    <Input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, 'video')}
                    />
                    <p className="text-sm text-muted-foreground">
                      Supported formats: MP4, AVI, MOV, WEBM
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Create Note */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Create Note</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="note-title">Note Title</Label>
                    <Input
                      id="note-title"
                      placeholder="Enter note title"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="note-content">Note Content</Label>
                    <Textarea
                      id="note-content"
                      placeholder="Write your note here..."
                      className="min-h-[120px]"
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleNoteCreate} variant="hero">
                    Create Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white rounded-lg shadow-md sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider rounded-tl-lg">
                      Thumbnail
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
                  {getFilesByType('image').map((file) => (
                    <tr key={file.id}>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                        <img className="h-10 w-10 object-cover rounded-md" src={file.content || `https://via.placeholder.com/150`} alt={file.name} />
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {getFileIcon(file.type)}
                          <span>{file.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                        {file.size}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                        {file.uploadDate}
                      </td>
                        <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteFile(file.id)}>
                          <Trash2 className="h-5 w-5 text-red-500" />
                        </Button>
                        <Button variant="outline" size="icon" className="ml-2">
                          <Download className="h-5 w-5 text-blue-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {getFilesByType('image').length === 0 && (
              <div className="col-span-full text-center py-8">
                <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No images uploaded yet.</p>
              </div>
            )}
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilesByType('video').map((file) => (
                <Card key={file.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getFileIcon(file.type)}
                        <span className="font-medium text-sm">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Size: {file.size}</p>
                      <p>Uploaded: {file.uploadDate}</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {getFilesByType('video').length === 0 && (
                <div className="col-span-full text-center py-8">
                  <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No videos uploaded yet.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFilesByType('note').map((file) => (
                <Card key={file.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        {getFileIcon(file.type)}
                        <span>{file.name}</span>
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                      {file.content}
                    </p>
                    <div className="text-xs text-muted-foreground mb-3">
                      Created: {file.uploadDate}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Full Note
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {getFilesByType('note').length === 0 && (
                <div className="col-span-full text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No notes created yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;