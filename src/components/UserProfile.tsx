
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Edit, Camera, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfileProps {
  user: { name: string; email: string } | null;
  onUserUpdate: (userData: { name: string; email: string; unitNumber?: string; bio?: string; profilePicture?: string }) => void;
}

export const UserProfile = ({ user, onUserUpdate }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    unitNumber: "",
    bio: "",
    profilePicture: ""
  });
  const { toast } = useToast();

  const handleSave = () => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      name: editData.name,
      unitNumber: editData.unitNumber,
      bio: editData.bio,
      profilePicture: editData.profilePicture
    };
    
    onUserUpdate(updatedUser);
    setIsEditing(false);
    
    toast({
      title: "Profile updated!",
      description: "Your profile information has been saved.",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditData(prev => ({
          ...prev,
          profilePicture: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={editData.profilePicture} />
            <AvatarFallback className="bg-blue-100 text-blue-700">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline">{user.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            My Profile
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={editData.profilePicture} />
                <AvatarFallback className="bg-blue-100 text-blue-700 text-lg">
                  {editData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <label className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                  <Camera className="h-4 w-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={editData.name}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 p-2 bg-gray-50 rounded">{editData.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <p className="mt-1 p-2 bg-gray-50 rounded text-gray-600">{user.email}</p>
            </div>

            <div>
              <Label htmlFor="unit">Unit Number</Label>
              {isEditing ? (
                <Input
                  id="unit"
                  value={editData.unitNumber}
                  onChange={(e) => setEditData(prev => ({ ...prev, unitNumber: e.target.value }))}
                  placeholder="e.g., 2B, 15A, etc."
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 p-2 bg-gray-50 rounded">{editData.unitNumber || "Not specified"}</p>
              )}
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  value={editData.bio}
                  onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell your neighbors about yourself..."
                  className="mt-1 min-h-[80px]"
                />
              ) : (
                <p className="mt-1 p-2 bg-gray-50 rounded min-h-[80px]">{editData.bio || "No bio added yet."}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
