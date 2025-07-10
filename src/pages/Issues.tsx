
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileUpload } from "@/components/FileUpload";
import { 
  Home, 
  LogOut, 
  AlertTriangle, 
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Image,
  Video,
  FileText,
  File
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface IssuesProps {
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

interface FileItem {
  file: File;
  preview?: string;
  type: 'image' | 'video' | 'document' | 'other';
}

interface Issue {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  files?: FileItem[];
}

const initialIssues: Issue[] = [
  {
    id: 2,
    author: "Sarah M.",
    content: "Has anyone else noticed the parking lot lights flickering near building C? It's been going on for a few days now. Should we report this to management?",
    timestamp: "5 hours ago",
    likes: 8,
    comments: 5
  },
  {
    id: 6,
    author: "Mike R.",
    content: "The elevator in building A has been making strange noises. Might want to get it checked before it breaks down completely.",
    timestamp: "1 day ago",
    likes: 12,
    comments: 8
  }
];

export const Issues = ({ user, onLogout }: IssuesProps) => {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [newIssue, setNewIssue] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<FileItem[]>([]);
  const { toast } = useToast();

  const handleSubmitIssue = () => {
    if (!newIssue.trim() && attachedFiles.length === 0) return;

    const issue: Issue = {
      id: Date.now(),
      author: user?.name || "Anonymous",
      content: newIssue,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      files: attachedFiles.length > 0 ? attachedFiles : undefined
    };

    setIssues([issue, ...issues]);
    setNewIssue("");
    setAttachedFiles([]);
    
    toast({
      title: "Issue reported!",
      description: "Your issue has been shared with the community.",
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <Home className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Summer Grove</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <Link to="/general">
                  <Button variant="outline" size="sm">
                    General
                  </Button>
                </Link>
                <Link to="/issues">
                  <Button variant="default" size="sm" className="bg-red-600">
                    Issues
                  </Button>
                </Link>
                <Link to="/events">
                  <Button variant="outline" size="sm">
                    Events
                  </Button>
                </Link>
              </div>
              <span className="text-sm text-gray-600">Welcome, {user?.name}!</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Issue */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Report an Issue
            </CardTitle>
            <CardDescription>
              Let the community know about problems that need attention.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Describe the issue you've noticed (maintenance problems, safety concerns, etc.)..."
              value={newIssue}
              onChange={(e) => setNewIssue(e.target.value)}
              className="min-h-[100px] border-gray-200 focus:border-red-500"
            />
            <FileUpload files={attachedFiles} onFilesChange={setAttachedFiles} />
            <Button 
              onClick={handleSubmitIssue}
              disabled={!newIssue.trim() && attachedFiles.length === 0}
              className="bg-red-600 hover:bg-red-700"
            >
              Report Issue
            </Button>
          </CardContent>
        </Card>

        {/* Issues Feed */}
        <div className="space-y-6">
          {issues.map((issue) => (
            <Card key={issue.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-red-100 text-red-700">
                        {issue.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{issue.author}</div>
                      <div className="text-sm text-gray-500">{issue.timestamp}</div>
                    </div>
                  </div>
                  <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Issue
                  </Badge>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{issue.content}</p>
                
                {/* Display attached files */}
                {issue.files && issue.files.length > 0 && (
                  <div className="mb-4 space-y-2">
                    <div className="text-sm font-medium text-gray-600">Attachments:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {issue.files.map((fileItem, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          {fileItem.type === 'image' && fileItem.preview && (
                            <img 
                              src={fileItem.preview} 
                              alt="Attachment" 
                              className="w-8 h-8 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
                            />
                          )}
                          {fileItem.type !== 'image' && (
                            <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                              {getFileIcon(fileItem.type)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {fileItem.file.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {(fileItem.file.size / 1024 / 1024).toFixed(1)} MB
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {fileItem.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-red-600 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span>{issue.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>{issue.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-600 transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
