
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle, Eye } from "lucide-react";

interface Neighbor {
  id: string;
  name: string;
  email: string;
  unitNumber?: string;
  bio?: string;
  profilePicture?: string;
  isOnline?: boolean;
}

interface NeighborsDirectoryProps {
  currentUser: { name: string; email: string; unitNumber?: string; bio?: string; profilePicture?: string } | null;
  onViewProfile: (neighbor: Neighbor) => void;
  onStartMessage: (neighbor: Neighbor) => void;
}

// Mock data for neighbors - in a real app this would come from a database
const mockNeighbors: Neighbor[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    unitNumber: "2A",
    bio: "Love gardening and organizing community events!",
    profilePicture: "",
    isOnline: true
  },
  {
    id: "2", 
    name: "Mike Chen",
    email: "mike.chen@email.com",
    unitNumber: "3B",
    bio: "Software engineer, happy to help with tech issues.",
    profilePicture: "",
    isOnline: false
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    email: "emma.r@email.com", 
    unitNumber: "1C",
    bio: "Yoga instructor and pet lover. Have two cats!",
    profilePicture: "",
    isOnline: true
  },
  {
    id: "4",
    name: "David Park",
    email: "david.park@email.com",
    unitNumber: "4A",
    bio: "Retired teacher, love reading and helping neighbors.",
    profilePicture: "",
    isOnline: false
  }
];

export const NeighborsDirectory = ({ currentUser, onViewProfile, onStartMessage }: NeighborsDirectoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredNeighbors = mockNeighbors.filter(neighbor =>
    neighbor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    neighbor.unitNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find Your Neighbors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by name or unit number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-gray-200 focus:border-blue-500"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNeighbors.map((neighbor) => (
          <Card key={neighbor.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={neighbor.profilePicture} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-lg">
                      {neighbor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {neighbor.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-gray-900">{neighbor.name}</h3>
                  {neighbor.unitNumber && (
                    <Badge variant="outline" className="text-xs">
                      Unit {neighbor.unitNumber}
                    </Badge>
                  )}
                  {neighbor.bio && (
                    <p className="text-sm text-gray-600 line-clamp-2">{neighbor.bio}</p>
                  )}
                </div>

                <div className="flex space-x-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewProfile(neighbor)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onStartMessage(neighbor)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNeighbors.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 text-center text-gray-500">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No neighbors found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
