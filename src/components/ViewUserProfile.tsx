
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, MapPin, User, ArrowLeft } from "lucide-react";

interface ViewUserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    unitNumber?: string;
    bio?: string;
    profilePicture?: string;
    isOnline?: boolean;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onStartMessage: () => void;
}

export const ViewUserProfile = ({ user, isOpen, onClose, onStartMessage }: ViewUserProfileProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Neighbor Profile
            </span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Picture and Basic Info */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.profilePicture} />
                <AvatarFallback className="bg-blue-100 text-blue-700 text-xl">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              {user.isOnline ? (
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              ) : (
                <Badge variant="secondary">Offline</Badge>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            {user.unitNumber && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm font-medium text-gray-700">Unit Number</div>
                  <div className="text-gray-900">{user.unitNumber}</div>
                </div>
              </div>
            )}

            {user.bio && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-2">About</div>
                <p className="text-gray-900 text-sm leading-relaxed">{user.bio}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-center">
            <Button 
              onClick={onStartMessage}
              className="bg-blue-600 hover:bg-blue-700 w-full"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
