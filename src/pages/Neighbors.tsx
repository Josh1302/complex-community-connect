
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  LogOut, 
  Users,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { UserProfile } from "@/components/UserProfile";
import { NeighborsDirectory } from "@/components/NeighborsDirectory";
import { ViewUserProfile } from "@/components/ViewUserProfile";
import { DirectMessages } from "@/components/DirectMessages";

interface NeighborsProps {
  user: { name: string; email: string; unitNumber?: string; bio?: string; profilePicture?: string } | null;
  onLogout: () => void;
  onUserUpdate: (userData: { name: string; email: string; unitNumber?: string; bio?: string; profilePicture?: string }) => void;
}

interface SelectedNeighbor {
  id: string;
  name: string;
  email: string;
  unitNumber?: string;
  bio?: string;
  profilePicture?: string;
  isOnline?: boolean;
}

export const Neighbors = ({ user, onLogout, onUserUpdate }: NeighborsProps) => {
  const [selectedNeighbor, setSelectedNeighbor] = useState<SelectedNeighbor | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("directory");

  const handleViewProfile = (neighbor: SelectedNeighbor) => {
    setSelectedNeighbor(neighbor);
    setShowProfile(true);
  };

  const handleStartMessage = (neighbor: SelectedNeighbor) => {
    setSelectedNeighbor(neighbor);
    setActiveTab("messages");
    setShowProfile(false);
  };

  const handleStartMessageFromProfile = () => {
    setActiveTab("messages");
    setShowProfile(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <Button variant="outline" size="sm">
                    Issues
                  </Button>
                </Link>
                <Link to="/events">
                  <Button variant="outline" size="sm">
                    Events
                  </Button>
                </Link>
                <Link to="/marketplace">
                  <Button variant="outline" size="sm">
                    Marketplace
                  </Button>
                </Link>
                <Link to="/neighbors">
                  <Button variant="default" size="sm" className="bg-blue-600">
                    Neighbors
                  </Button>
                </Link>
              </div>
              <UserProfile user={user} onUserUpdate={onUserUpdate} />
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="directory" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Directory
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="directory" className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Neighbors Directory</h1>
              <p className="text-gray-600">Connect with your community members</p>
            </div>
            <NeighborsDirectory
              currentUser={user}
              onViewProfile={handleViewProfile}
              onStartMessage={handleStartMessage}
            />
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Direct Messages</h1>
              <p className="text-gray-600">Stay connected with your neighbors</p>
            </div>
            <DirectMessages
              currentUser={user}
              selectedNeighbor={selectedNeighbor}
            />
          </TabsContent>
        </Tabs>
      </div>

      <ViewUserProfile
        user={selectedNeighbor}
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        onStartMessage={handleStartMessageFromProfile}
      />
    </div>
  );
};
