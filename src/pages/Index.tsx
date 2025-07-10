import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Shield, 
  Home,
  Bell,
  Heart,
  Star
} from "lucide-react";
import { LoginForm } from "@/components/LoginForm";
import { SignUpForm } from "@/components/SignUpForm";
import { useNavigate } from "react-router-dom";

interface IndexProps {
  onLogin: (userData: { name: string; email: string }) => void;
}

const Index = ({ onLogin }: IndexProps) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (userData: { name: string; email: string }) => {
    onLogin(userData);
    navigate('/general');
  };

  const handleSignUp = (userData: { name: string; email: string }) => {
    onLogin(userData);
    navigate('/general');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Summer Grove</span>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => setShowLogin(true)}
                className="text-blue-600 hover:bg-blue-50"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => setShowSignUp(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium mb-4">
              Welcome to Your Community
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Connect with Your
            <span className="text-blue-600 block">Neighbors</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stay connected, share updates, and build stronger relationships with fellow residents 
            at Summer Grove. Your community, your voice, your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setShowSignUp(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg hover-scale"
            >
              Get Started Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setShowLogin(true)}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg hover-scale"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything Your Community Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From sharing neighborhood updates to staying informed about events, 
              we've got you covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-scale transition-all duration-300 border-0 shadow-lg hover:shadow-xl">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl">Community Posts</CardTitle>
                <CardDescription>
                  Share updates, ask questions, and discuss neighborhood happenings with your neighbors.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-scale transition-all duration-300 border-0 shadow-lg hover:shadow-xl">
              <CardHeader>
                <Bell className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-xl">Announcements</CardTitle>
                <CardDescription>
                  Stay informed about important updates, maintenance schedules, and complex news.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-scale transition-all duration-300 border-0 shadow-lg hover:shadow-xl">
              <CardHeader>
                <Calendar className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl">Events</CardTitle>
                <CardDescription>
                  Discover community events, social gatherings, and activities happening around you.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-scale transition-all duration-300 border-0 shadow-lg hover:shadow-xl">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle className="text-xl">Safety First</CardTitle>
                <CardDescription>
                  Report issues, share safety concerns, and help keep our community secure.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-scale transition-all duration-300 border-0 shadow-lg hover:shadow-xl">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-xl">Neighbor Directory</CardTitle>
                <CardDescription>
                  Connect with neighbors, build relationships, and create a stronger community.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-scale transition-all duration-300 border-0 shadow-lg hover:shadow-xl">
              <CardHeader>
                <Heart className="h-12 w-12 text-pink-600 mb-4" />
                <CardTitle className="text-xl">Community Support</CardTitle>
                <CardDescription>
                  Help each other out, share resources, and build lasting friendships.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Residents Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "This platform has transformed how we communicate in our building. 
                  I finally know my neighbors!"
                </p>
                <div className="text-sm font-semibold text-gray-900">- Sarah M., Unit 4B</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The announcements feature keeps me updated on everything happening. 
                  No more missed important notices!"
                </p>
                <div className="text-sm font-semibold text-gray-900">- Mike T., Unit 12A</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Love the community events section. I've made so many new friends 
                  through the activities posted here."
                </p>
                <div className="text-sm font-semibold text-gray-900">- Lisa K., Unit 8C</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Home className="h-6 w-6" />
              <span className="text-lg font-semibold">Summer Grove Community</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Summer Grove. Building stronger communities together.
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showLogin && (
        <LoginForm 
          onClose={() => setShowLogin(false)} 
          onLogin={handleLogin}
          onSwitchToSignUp={() => {
            setShowLogin(false);
            setShowSignUp(true);
          }}
        />
      )}
      
      {showSignUp && (
        <SignUpForm 
          onClose={() => setShowSignUp(false)} 
          onSignUp={handleSignUp}
          onSwitchToLogin={() => {
            setShowSignUp(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
};

export default Index;
