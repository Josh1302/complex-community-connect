
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onClose: () => void;
  onLogin: (userData: { name: string; email: string }) => void;
  onSwitchToSignUp: () => void;
}

export const LoginForm = ({ onClose, onLogin, onSwitchToSignUp }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in to your community.",
        });
        onLogin({ 
          name: email.split('@')[0], 
          email 
        });
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
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to connect with your community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-gray-200 focus:border-blue-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={onSwitchToSignUp}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Join your community
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
