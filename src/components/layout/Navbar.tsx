import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X, User, FileText, Home, Info, Phone, Download, ArrowUp, Bot } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import useCustomCursor from "@/hooks/use-cursor";

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
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Refs for the custom cursor elements
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  
  // Use the custom cursor hook
  useCustomCursor({ dotRef: cursorDotRef, outlineRef: cursorOutlineRef });

  useEffect(() => {
    const userData = localStorage.getItem("verolix-user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Add navbar shrink effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <>
      <header className={`glass-card sticky top-0 z-50 transition-all duration-300 border-b border-glass-border ${isScrolled ? 'py-1' : 'py-3'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 transition-transform hover:scale-105 duration-300 bounce-hover">
            <img 
              src="/images/verolix-logo.svg" 
              alt="Verolix Logo" 
              className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'}`}
            />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center justify-center flex-grow space-x-6">
              <Link to="/" className="nav-link flex items-center space-x-1 text-medbot-silver hover:text-medbot-cyan transition-colors duration-300 bounce-hover">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>

              <Link to="/about" className="nav-link flex items-center space-x-1 text-medbot-silver hover:text-medbot-cyan transition-colors duration-300 bounce-hover">
                <Info className="h-5 w-5" />
                <span>About Us</span>
              </Link>

              <Link to="/contact" className="nav-link flex items-center space-x-1 text-medbot-silver hover:text-medbot-cyan transition-colors duration-300 bounce-hover">
                <Phone className="h-5 w-5" />
                <span>Contact</span>
              </Link>

              <Link to="/download" className="nav-link flex items-center space-x-1 text-medbot-silver hover:text-medbot-cyan transition-colors duration-300 bounce-hover">
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
                  className="nav-link flex items-center space-x-1 text-medbot-silver hover:text-medbot-cyan transition-colors duration-300 bounce-hover"
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                
                {user.role === "patient" && (
                  <Link 
                    to="/my-records" 
                    className="nav-link flex items-center space-x-1 text-medbot-silver hover:text-medbot-cyan transition-colors duration-300 bounce-hover"
                  >
                    <FileText className="h-5 w-5" />
                    <span>My Records</span>
                  </Link>
                )}
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 group">
                    <div className="h-8 w-8 rounded-full bg-medbot-violet/20 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 border border-medbot-violet">
                      <User className="h-5 w-5 text-medbot-cyan" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-medbot-silver">{user.name}</span>
                      {user.role === "patient" && user.patientId && (
                        <span className="text-xs text-medbot-silver/70">
                          ID: {user.patientId}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout} 
                    className="neon-button text-medbot-cyan border-medbot-cyan bounce-hover"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    <span>Logout</span>
                  </Button>
                </div>
              </>
            ) : (
              <Button 
                onClick={scrollToAuth} 
                className="violet-button flex items-center gap-2 bounce-hover"
              >
                <Bot className="h-4 w-4" />
                <span>Login / Sign Up</span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <button 
              onClick={toggleMenu} 
              className="p-2 focus:outline-none transition-transform bounce-hover duration-300 text-medbot-cyan" 
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          )}

          {/* Scroll to Top Button */}
          {isVisible && (
            <button 
              onClick={scrollToTop}
              className="fixed bottom-4 right-4 bg-medbot-black text-medbot-cyan border border-medbot-cyan p-3 rounded-full shadow-lg hover:bg-medbot-cyan hover:text-medbot-black transition-all duration-300 z-50 animate-float bounce-hover"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="glass-card absolute w-full z-50 py-4 px-6 border-t border-glass-border">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="nav-link flex items-center space-x-3 p-2 hover:bg-medbot-black/50 rounded-md transition-colors duration-300 text-medbot-silver hover:text-medbot-cyan bounce-hover" 
                onClick={closeMenu}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>

              <Link 
                to="/about" 
                className="nav-link flex items-center space-x-3 p-2 hover:bg-medbot-black/50 rounded-md transition-colors duration-300 text-medbot-silver hover:text-medbot-cyan bounce-hover" 
                onClick={closeMenu}
              >
                <Info className="h-5 w-5" />
                <span>About Us</span>
              </Link>

              <Link 
                to="/contact" 
                className="nav-link flex items-center space-x-3 p-2 hover:bg-medbot-black/50 rounded-md transition-colors duration-300 text-medbot-silver hover:text-medbot-cyan bounce-hover" 
                onClick={closeMenu}
              >
                <Phone className="h-5 w-5" />
                <span>Contact</span>
              </Link>

              <Link 
                to="/download" 
                className="nav-link flex items-center space-x-3 p-2 hover:bg-medbot-black/50 rounded-md transition-colors duration-300 text-medbot-silver hover:text-medbot-cyan bounce-hover" 
                onClick={closeMenu}
              >
                <Download className="h-5 w-5" />
                <span>Download App</span>
              </Link>

              {user ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3 pb-3 border-b border-glass-border">
                    <div className="h-10 w-10 rounded-full bg-medbot-violet/20 flex items-center justify-center border border-medbot-violet">
                      <User className="h-6 w-6 text-medbot-cyan" />
                    </div>
                    <div>
                      <p className="font-medium text-medbot-silver">{user.name}</p>
                      {user.role === "patient" && user.patientId && (
                        <p className="text-sm text-medbot-silver/70">ID: {user.patientId}</p>
                      )}
                    </div>
                  </div>
                  
                  <Link 
                    to={user.role === "patient" ? "/patient-dashboard" : "/doctor-dashboard"} 
                    className="nav-link flex items-center space-x-3 p-2 hover:bg-medbot-black/50 rounded-md text-medbot-silver hover:text-medbot-cyan bounce-hover" 
                    onClick={closeMenu}
                  >
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  
                  {user.role === "patient" && (
                    <Link 
                      to="/my-records" 
                      className="nav-link flex items-center space-x-3 p-2 hover:bg-medbot-black/50 rounded-md text-medbot-silver hover:text-medbot-cyan bounce-hover" 
                      onClick={closeMenu}
                    >
                      <FileText className="h-5 w-5" />
                      <span>My Records</span>
                    </Link>
                  )}
                  
                  <button 
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }} 
                    className="nav-link flex items-center space-x-3 p-2 hover:bg-medbot-black/50 rounded-md text-left text-medbot-silver hover:text-medbot-cyan bounce-hover"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Button 
                    className="violet-button flex items-center gap-2 bounce-hover"
                    onClick={() => {
                      scrollToAuth();
                      closeMenu();
                    }}
                  >
                    <Bot className="h-4 w-4" />
                    <span>Login / Sign Up</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      
      {/* Custom Cursor Elements */}
      <div ref={cursorDotRef} className="cursor-dot"></div>
      <div ref={cursorOutlineRef} className="cursor-outline"></div>
    </>
  );
}
