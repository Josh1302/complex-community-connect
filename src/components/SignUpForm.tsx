
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SignUpFormProps {
  onClose: () => void;
  onSignUp: (userData: { name: string; email: string }) => void;
  onSwitchToLogin: () => void;
}

export const SignUpForm = ({ onClose, onSignUp, onSwitchToLogin }: SignUpFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sign up process
    setTimeout(() => {
      if (name && email && password && confirmPassword && unitNumber) {
        if (password !== confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords don't match.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        toast({
          title: "Welcome to the community!",
          description: "Your account has been created successfully.",
        });
        onSignUp({ name, email });
      } else {
        toast({
          title: "Error",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="text-center relative">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold">Summer Grove</span>
          </div>
          <CardTitle className="text-2xl font-bold">Join Your Community</CardTitle>
          <CardDescription>
            Create your account to connect with neighbors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your-email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unitNumber">Unit Number</Label>
              <Input
                id="unitNumber"
                type="text"
                placeholder="e.g., 4B, 12A"
                value={unitNumber}
                onChange={(e) => setUnitNumber(e.target.value)}
                required
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
