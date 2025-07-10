
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Home, 
  LogOut, 
  Calendar, 
  Plus,
  Heart,
  MessageCircle,
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface EventsProps {
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

interface Event {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const initialEvents: Event[] = [
  {
    id: 1,
    author: "Complex Management",
    content: "🎉 Pool maintenance completed! The pool area is now open and ready for summer. New pool hours: 6 AM - 10 PM daily. Please remember to follow pool rules and clean up after yourselves.",
    timestamp: "2 hours ago",
    likes: 12,
    comments: 3
  },
  {
    id: 3,
    author: "Mike T.",
    content: "Community BBQ this Saturday at 2 PM in the courtyard! 🍖 Bring your own food and drinks. Grills and seating will be provided. Looking forward to meeting more neighbors!",
    timestamp: "1 day ago",
    likes: 24,
    comments: 12
  }
];

export const Events = ({ user, onLogout }: EventsProps) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [newEvent, setNewEvent] = useState("");
  const { toast } = useToast();

  const handleSubmitEvent = () => {
    if (!newEvent.trim()) return;

    const event: Event = {
      id: Date.now(),
      author: user?.name || "Anonymous",
      content: newEvent,
      timestamp: "Just now",
      likes: 0,
      comments: 0
    };

    setEvents([event, ...events]);
    setNewEvent("");
    
    toast({
      title: "Event posted!",
      description: "Your event has been shared with the community.",
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
                <span className="text-xl font-bold text-gray-900">Harmony Heights</span>
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
                  <Button variant="outline" size="sm">
                    Issues
                  </Button>
                </Link>
                <Link to="/events">
                  <Button variant="default" size="sm" className="bg-green-600">
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
        {/* Create Event */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Share an Event
            </CardTitle>
            <CardDescription>
              Let everyone know about upcoming community events and activities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Share details about an upcoming event (date, time, location, what to bring, etc.)..."
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              className="min-h-[100px] border-gray-200 focus:border-green-500"
            />
            <Button 
              onClick={handleSubmitEvent}
              disabled={!newEvent.trim()}
              className="bg-green-600 hover:bg-green-700"
            >
              Share Event
            </Button>
          </CardContent>
        </Card>

        {/* Events Feed */}
        <div className="space-y-6">
          {events.map((event) => (
            <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {event.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{event.author}</div>
                      <div className="text-sm text-gray-500">{event.timestamp}</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Event
                  </Badge>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{event.content}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-red-600 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span>{event.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>{event.comments}</span>
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
