import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, LogOut, Menu, X, User, FileText, Home, Info, Phone, Download, ArrowUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface User {
  id: string;
  email: string;
  name: string;
  role: "patient" | "doctor";
  patientId?: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("verolix-user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("verolix-user");
    setUser(null);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToAuth = () => {
    const authSection = document.getElementById("auth-section");
    if (authSection) {
      // Set the active tab to login
      const loginTab = authSection.querySelector('[data-value="patientLogin"]') as HTMLElement;
      if (loginTab) {
        loginTab.click();
      }
      authSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Show/hide scroll to top button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <header className="bg-white border-b border-b-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 transition-transform hover:scale-105 duration-300">
          <Heart className="h-8 w-8 text-healthcare-600" strokeWidth={2} />
          <span className="text-2xl font-bold text-healthcare-800">
            Verolix
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex items-center justify-center flex-grow space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-healthcare-600 transition-colors duration-300">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>

            <Link to="/about" className="flex items-center space-x-1 text-gray-600 hover:text-healthcare-600 transition-colors duration-300">
              <Info className="h-5 w-5" />
              <span>About Us</span>
            </Link>

            <Link to="/contact" className="flex items-center space-x-1 text-gray-600 hover:text-healthcare-600 transition-colors duration-300">
              <Phone className="h-5 w-5" />
              <span>Contact</span>
            </Link>

            <Link to="/download" className="flex items-center space-x-1 text-gray-600 hover:text-healthcare-600 transition-colors duration-300">
              <Download className="h-5 w-5" />
              <span>Download App</span>
            </Link>
          </div>
        )}

        {/* Login/Signup and User Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link 
                to={user.role === "patient" ? "/patient-dashboard" : "/doctor-dashboard"} 
                className="flex items-center space-x-1 text-gray-600 hover:text-healthcare-600 transition-colors duration-300"
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              
              {user.role === "patient" && (
                <Link 
                  to="/my-records" 
                  className="flex items-center space-x-1 text-gray-600 hover:text-healthcare-600 transition-colors duration-300"
                >
                  <FileText className="h-5 w-5" />
                  <span>My Records</span>
                </Link>
              )}
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 group">
                  <div className="h-8 w-8 rounded-full bg-healthcare-100 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <User className="h-5 w-5 text-healthcare-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    {user.role === "patient" && user.patientId && (
                      <span className="text-xs text-gray-500">
                        ID: {user.patientId}
                      </span>
                    )}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout} 
                  className="flex items-center space-x-1 hover:bg-healthcare-50 hover:text-healthcare-600 transition-colors duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </>
          ) : (
            <Button 
              onClick={scrollToAuth} 
              className="hover:bg-healthcare-700 transition-colors duration-300"
            >
              Login / Sign Up
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            onClick={toggleMenu} 
            className="p-2 focus:outline-none transition-transform hover:scale-105 duration-300" 
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-healthcare-800" />
            ) : (
              <Menu className="h-6 w-6 text-healthcare-800" />
            )}
          </button>
        )}

        {/* Scroll to Top Button */}
        {isVisible && (
          <button 
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-healthcare-600 text-white p-3 rounded-full shadow-lg hover:bg-healthcare-700 transition-all duration-300 z-50 animate-bounce"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="bg-white shadow-lg py-4 px-6 absolute w-full z-50">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="flex items-center space-x-3 p-2 hover:bg-healthcare-50 rounded-md transition-colors duration-300" 
              onClick={closeMenu}
            >
              <Home className="h-5 w-5 text-healthcare-600" />
              <span>Home</span>
            </Link>

            <Link 
              to="/about" 
              className="flex items-center space-x-3 p-2 hover:bg-healthcare-50 rounded-md transition-colors duration-300" 
              onClick={closeMenu}
            >
              <Info className="h-5 w-5 text-healthcare-600" />
              <span>About Us</span>
            </Link>

            <Link 
              to="/contact" 
              className="flex items-center space-x-3 p-2 hover:bg-healthcare-50 rounded-md transition-colors duration-300" 
              onClick={closeMenu}
            >
              <Phone className="h-5 w-5 text-healthcare-600" />
              <span>Contact</span>
            </Link>

            <Link 
              to="/download" 
              className="flex items-center space-x-3 p-2 hover:bg-healthcare-50 rounded-md transition-colors duration-300" 
              onClick={closeMenu}
            >
              <Download className="h-5 w-5 text-healthcare-600" />
              <span>Download App</span>
            </Link>

            {user ? (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b">
                  <div className="h-10 w-10 rounded-full bg-healthcare-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-healthcare-600" />
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    {user.role === "patient" && user.patientId && (
                      <p className="text-sm text-gray-500">ID: {user.patientId}</p>
                    )}
                  </div>
                </div>
                
                <Link 
                  to={user.role === "patient" ? "/patient-dashboard" : "/doctor-dashboard"} 
                  className="flex items-center space-x-3 p-2 hover:bg-healthcare-50 rounded-md" 
                  onClick={closeMenu}
                >
                  <Home className="h-5 w-5 text-healthcare-600" />
                  <span>Dashboard</span>
                </Link>
                
                {user.role === "patient" && (
                  <Link 
                    to="/my-records" 
                    className="flex items-center space-x-3 p-2 hover:bg-healthcare-50 rounded-md" 
                    onClick={closeMenu}
                  >
                    <FileText className="h-5 w-5 text-healthcare-600" />
                    <span>My Records</span>
                  </Link>
                )}
                
                <button 
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }} 
                  className="flex items-center space-x-3 p-2 hover:bg-healthcare-50 rounded-md text-left"
                >
                  <LogOut className="h-5 w-5 text-healthcare-600" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Button 
                  variant="default" 
                  className="w-full hover:bg-healthcare-700 transition-colors duration-300" 
                  onClick={() => {
                    scrollToAuth();
                    closeMenu();
                  }}
                >
                  Login / Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
