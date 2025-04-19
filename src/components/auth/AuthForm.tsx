
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "patient" | "doctor";
  patientId?: string;
}

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>, role: "patient" | "doctor") => {
    e.preventDefault();
    setIsLoading(true);
    
    // Get form data
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Generate mock user data
      const mockUser: User = {
        id: crypto.randomUUID(),
        email,
        name: email.split('@')[0],
        role,
        patientId: role === "patient" ? `PID-${Math.floor(10000 + Math.random() * 90000)}` : undefined
      };
      
      // Store user in local storage
      localStorage.setItem("verolix-user", JSON.stringify(mockUser));
      
      // Show success message
      toast.success(`Login successful! Welcome to Verolix Health.`);
      
      // Navigate to appropriate dashboard
      navigate(role === "patient" ? "/patient-dashboard" : "/doctor-dashboard");
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Get form data
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Validate name length
    if (name.length < 2) {
      toast.error("Name must be at least 2 characters long");
      setIsLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Validate password length and complexity
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }
    
    // Simulate registration API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Generate patient ID
      const patientId = `PID-${Math.floor(10000 + Math.random() * 90000)}`;
      
      // Store user in local storage
      localStorage.setItem("verolix-user", JSON.stringify({
        id: crypto.randomUUID(),
        email,
        name,
        role: "patient",
        patientId
      }));
      
      // Show success message with patient ID
      toast.success(`Account created! Your Patient ID is ${patientId}`);
      
      // Navigate to patient dashboard
      navigate("/patient-dashboard");
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <Tabs defaultValue="patientLogin" className="w-full">
        <TabsList className="grid grid-cols-3 mb-2">
          <TabsTrigger value="patientLogin">Patient Login</TabsTrigger>
          <TabsTrigger value="doctorLogin">Doctor Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        {/* Patient Login Form */}
        <TabsContent value="patientLogin">
          <form onSubmit={(e) => handleLogin(e, "patient")}>
            <CardHeader>
              <CardTitle className="text-2xl">Patient Login</CardTitle>
              <CardDescription>
                Access your personal health records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <MailIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    name="email" 
                    placeholder="Email" 
                    type="email" 
                    required 
                    className="pl-10" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <LockIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    name="password" 
                    placeholder="Password" 
                    type="password" 
                    required 
                    className="pl-10" 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        
        {/* Doctor Login Form */}
        <TabsContent value="doctorLogin">
          <form onSubmit={(e) => handleLogin(e, "doctor")}>
            <CardHeader>
              <CardTitle className="text-2xl">Doctor Login</CardTitle>
              <CardDescription>
                Access your patients' health records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <MailIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    name="email" 
                    placeholder="Email" 
                    type="email" 
                    required 
                    className="pl-10" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <LockIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    name="password" 
                    placeholder="Password" 
                    type="password" 
                    required 
                    className="pl-10" 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        
        {/* Registration Form */}
        <TabsContent value="register">
          <form onSubmit={handleRegister}>
            <CardHeader>
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>
                Join Verolix to manage your health records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    name="name" 
                    placeholder="Full Name" 
                    required 
                    className="pl-10" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <MailIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    name="email" 
                    placeholder="Email" 
                    type="email" 
                    required 
                    className="pl-10" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <LockIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    name="password" 
                    placeholder="Password" 
                    type="password" 
                    required 
                    className="pl-10" 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
