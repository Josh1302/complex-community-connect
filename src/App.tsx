
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { GeneralPosts } from "./pages/GeneralPosts";
import { Issues } from "./pages/Issues";
import { Events } from "./pages/Events";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('summerGroveUser');
    const savedLoginStatus = localStorage.getItem('summerGroveLoggedIn');
    
    if (savedUser && savedLoginStatus === 'true') {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('summerGroveUser');
        localStorage.removeItem('summerGroveLoggedIn');
      }
    }
  }, []);

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
    setIsLoggedIn(true);
    
    // Save to localStorage
    localStorage.setItem('summerGroveUser', JSON.stringify(userData));
    localStorage.setItem('summerGroveLoggedIn', 'true');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    
    // Clear localStorage
    localStorage.removeItem('summerGroveUser');
    localStorage.removeItem('summerGroveLoggedIn');
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<Index onLogin={handleLogin} />} />
      {isLoggedIn && (
        <>
          <Route path="/general" element={<GeneralPosts user={user} onLogout={handleLogout} />} />
          <Route path="/issues" element={<Issues user={user} onLogout={handleLogout} />} />
          <Route path="/events" element={<Events user={user} onLogout={handleLogout} />} />
        </>
      )}
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
