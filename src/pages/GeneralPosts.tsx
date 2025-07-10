import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Home, 
  LogOut, 
  MessageSquare, 
  Plus,
  Heart,
  MessageCircle,
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface GeneralPostsProps {
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

interface Post {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const initialPosts: Post[] = [
  {
    id: 4,
    author: "Lisa K.",
    content: "Thank you to whoever returned my lost keys! They were left at my door this morning. This community is amazing! ❤️",
    timestamp: "2 days ago",
    likes: 18,
    comments: 7
  },
  {
    id: 5,
    author: "John D.",
    content: "Does anyone know if the gym will be open this weekend? Planning my workout schedule!",
    timestamp: "3 days ago",
    likes: 5,
    comments: 3
  }
];

export const GeneralPosts = ({ user, onLogout }: GeneralPostsProps) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");
  const { toast } = useToast();

  const handleSubmitPost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now(),
      author: user?.name || "Anonymous",
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0
    };

    setPosts([post, ...posts]);
    setNewPost("");
    
    toast({
      title: "Post shared!",
      description: "Your message has been shared with the community.",
    });
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
                  <Button variant="default" size="sm" className="bg-blue-600">
                    General
                  </Button>
                </Link>
                <Link to="/issues">
                  <Button variant="outline" size="sm">
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
        {/* Create Post */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Share a General Post
            </CardTitle>
            <CardDescription>
              What's happening in the neighborhood?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Share an update, ask a question, or let neighbors know what's happening..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px] border-gray-200 focus:border-blue-500"
            />
            <Button 
              onClick={handleSubmitPost}
              disabled={!newPost.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Share Post
            </Button>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {post.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{post.author}</div>
                      <div className="text-sm text-gray-500">{post.timestamp}</div>
                    </div>
                  </div>
                  <Badge className="bg-gray-100 text-gray-800 flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    General
                  </Badge>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-red-600 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
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
