
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Home, 
  LogOut, 
  Plus,
  Search,
  DollarSign,
  MessageCircle,
  Calendar,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { UserProfile } from "@/components/UserProfile";

interface MarketplaceProps {
  user: { name: string; email: string } | null;
  onLogout: () => void;
  onUserUpdate: (userData: any) => void;
}

interface MarketplaceItem {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  seller: string;
  sellerUnit: string;
  timestamp: string;
  images?: string[];
  status: 'available' | 'sold' | 'pending';
}

const categories = [
  "Furniture", "Electronics", "Appliances", "Books", "Clothing", 
  "Sports & Recreation", "Home & Garden", "Toys & Games", "Other"
];

const conditions = ["New", "Like New", "Good", "Fair", "Poor"];

const initialItems: MarketplaceItem[] = [
  {
    id: 1,
    title: "Coffee Table - Excellent Condition",
    description: "Beautiful wooden coffee table, perfect for small living rooms. No scratches or damage.",
    price: 150,
    category: "Furniture",
    condition: "Like New",
    seller: "Sarah M.",
    sellerUnit: "3B",
    timestamp: "2 hours ago",
    status: "available"
  },
  {
    id: 2,
    title: "Xbox Series S Gaming Console",
    description: "Barely used Xbox Series S with controller and 3 games included. Moving sale!",
    price: 250,
    category: "Electronics",
    condition: "Like New",
    seller: "Mike T.",
    sellerUnit: "7A",
    timestamp: "1 day ago",
    status: "available"
  }
];

export const Marketplace = ({ user, onLogout, onUserUpdate }: MarketplaceProps) => {
  const [items, setItems] = useState<MarketplaceItem[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
    condition: "",
    images: [] as string[]
  });
  const { toast } = useToast();

  const handleCreateListing = () => {
    if (!newItem.title || !newItem.description || !newItem.price || !newItem.category || !newItem.condition) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to create a listing.",
        variant: "destructive"
      });
      return;
    }

    const listing: MarketplaceItem = {
      id: Date.now(),
      title: newItem.title,
      description: newItem.description,
      price: newItem.price,
      category: newItem.category,
      condition: newItem.condition,
      seller: user?.name || "Anonymous",
      sellerUnit: "Your Unit", // This would come from user profile
      timestamp: "Just now",
      images: newItem.images,
      status: "available"
    };

    setItems([listing, ...items]);
    setNewItem({
      title: "",
      description: "",
      price: 0,
      category: "",
      condition: "",
      images: []
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Listing created!",
      description: "Your item has been posted to the marketplace.",
    });
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory && item.status === "available";
  });

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
                  <Button variant="default" size="sm" className="bg-green-600">
                    Marketplace
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community Marketplace</h1>
            <p className="text-gray-600 mt-2">Buy and sell with your neighbors</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                List Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Listing</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newItem.title}
                    onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="What are you selling?"
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newItem.price || ""}
                    onChange={(e) => setNewItem(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newItem.category} onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Select value={newItem.condition} onValueChange={(value) => setNewItem(prev => ({ ...prev, condition: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map(condition => (
                        <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newItem.description}
                    onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your item..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateListing} className="bg-green-600 hover:bg-green-700">
                    Create Listing
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{item.category}</Badge>
                      <Badge variant="outline">{item.condition}</Badge>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${item.price}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 line-clamp-3">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {item.seller.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{item.seller}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Unit {item.sellerUnit}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {item.timestamp}
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Seller
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or create a new listing.</p>
          </div>
        )}
      </div>
    </div>
  );
};
