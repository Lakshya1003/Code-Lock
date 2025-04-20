import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BMICalculator from "@/components/BMICalculator";
import FeaturePopup from "@/components/FeaturePopup";
import { 
  Heart, Shield, FilePlus, Share2, Activity, ArrowRight, ChevronRight, 
  Calendar, Stethoscope, Calculator, Database, Utensils, BookOpen, 
  TrendingUp, BarChart2, Cpu, Bot, Zap, BrainCircuit, LineChart, Scan
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimateText from "@/utils/textAnimator";

// Animated hero features
const features = [{
  title: "AI-Powered Analytics",
  description: "Get intelligent insights from your health data.",
  icon: <BrainCircuit className="h-6 w-6 text-medbot-cyan" />
}, {
  title: "Voice Assistant",
  description: "Control the app with simple voice commands.",
  icon: <Bot className="h-6 w-6 text-medbot-cyan" />
}, {
  title: "Health Predictions",
  description: "Advanced ML algorithms predict potential health issues.",
  icon: <LineChart className="h-6 w-6 text-medbot-cyan" />
}];

// App features with detailed popups
const healthFeatures = [
  {
    id: 1,
    title: "BMI Calculator",
    description: "Instantly calculate your Body Mass Index to track your fitness journey. Our AI algorithms provide personalized recommendations based on your results and health history.",
    icon: <Calculator className="h-6 w-6 text-medbot-cyan" />
  },
  {
    id: 2,
    title: "Health Data Storage",
    description: "Securely store and access all your health records in one place. Military-grade encryption keeps your sensitive information safe while making it instantly accessible when needed.",
    icon: <Database className="h-6 w-6 text-medbot-cyan" />
  },
  {
    id: 3,
    title: "Nutrition Planner",
    description: "Personalized diet recommendations for your health goals. Our AI analyzes your preferences, restrictions, and health metrics to create the perfect nutrition plan for you.",
    icon: <Utensils className="h-6 w-6 text-medbot-cyan" />
  },
  {
    id: 4,
    title: "Health Explore Page",
    description: "Discover articles, advice, and wellness tips for a healthier life. Content is curated based on your interests and health profile, ensuring relevant information.",
    icon: <BookOpen className="h-6 w-6 text-medbot-cyan" />
  },
  {
    id: 5,
    title: "Streak Counter",
    description: "Stay motivated by tracking your healthy habits streaks. Gamification elements and AI-powered reminders help you maintain consistency in your wellness journey.",
    icon: <TrendingUp className="h-6 w-6 text-medbot-cyan" />
  },
  {
    id: 6,
    title: "Graphical Analysis",
    description: "Visualize your health progress through beautiful and informative charts. Advanced data visualization makes complex health metrics easy to understand and track over time.",
    icon: <BarChart2 className="h-6 w-6 text-medbot-cyan" />
  }
];

export default function Index() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState<null | number>(null);
  const [typingText, setTypingText] = useState("");
  const fullText = "Your Health, Now Enhanced With AI.";
  
  useEffect(() => {
    const user = localStorage.getItem("verolix-user");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === "patient") {
        navigate("/patient-dashboard");
      } else if (userData.role === "doctor") {
        navigate("/doctor-dashboard");
      }
    }
  }, [navigate]);
  
  // Animated features carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  // Typing effect for hero headline
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTypingText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(typing);
      }
    }, 100);
    return () => clearInterval(typing);
  }, []);
  
  // Handle popup open/close
  const openFeaturePopup = (featureId: number) => {
    setSelectedFeature(featureId);
  };
  
  const closeFeaturePopup = () => {
    setSelectedFeature(null);
  };
  
  // Find the currently selected feature
  const currentFeature = healthFeatures.find(feature => feature.id === selectedFeature);
  
  return <div className="flex flex-col min-h-screen bg-medbot-black">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-medbot-black to-[#151a36] text-medbot-silver py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center" />
          
          {/* Animated Particle/Circuit Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute h-px w-32 bg-medbot-cyan/50 top-1/4 left-1/4 animate-pulse-subtle" style={{animationDelay: '0.2s'}}></div>
            <div className="absolute h-px w-48 bg-medbot-violet/30 top-1/3 right-1/3 animate-pulse-subtle" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute h-px w-24 bg-medbot-cyan/40 bottom-1/4 left-1/3 animate-pulse-subtle" style={{animationDelay: '0.8s'}}></div>
            <div className="absolute h-px w-64 bg-medbot-violet/20 bottom-1/3 right-1/4 animate-pulse-subtle" style={{animationDelay: '1.1s'}}></div>
            <div className="absolute h-32 w-px bg-medbot-cyan/30 top-1/4 left-2/3 animate-pulse-subtle" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute h-48 w-px bg-medbot-violet/20 top-1/2 left-1/4 animate-pulse-subtle" style={{animationDelay: '0.6s'}}></div>
            <div className="absolute h-24 w-px bg-medbot-cyan/40 bottom-1/3 right-1/3 animate-pulse-subtle" style={{animationDelay: '0.9s'}}></div>
            <div className="absolute h-64 w-px bg-medbot-violet/30 bottom-1/4 right-2/3 animate-pulse-subtle" style={{animationDelay: '1.2s'}}></div>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10 text-center md:text-left">
                <div className="inline-flex items-center text-xs text-medbot-silver bg-medbot-black/50 border border-medbot-violet px-3 py-1 rounded-full mb-6">
                  <Bot className="mr-2 h-3 w-3 text-medbot-cyan" />
                  <span>MedBot AI Technology</span>
                </div>
                
                {/* Animate text with proper wrapping */}
                <div className="max-w-full">
                  <AnimateText 
                    text="Your Health, Now Enhanced With <span class='text-medbot-cyan'>AI.</span>" 
                    tagName="h1" 
                    className="text-4xl md:text-5xl font-bold mb-6 text-medbot-silver normal-case break-words text-center md:text-left whitespace-normal"
                    preserveSpans={true}
                  />
                </div>
                
                <p className="text-lg md:text-xl mb-8 text-medbot-silver/80">
                  Verolix connects patients and doctors through AI-powered health management and analytics.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button 
                    size="lg" 
                    className="neon-button group transition-all duration-300 flex items-center gap-2" 
                    onClick={() => document.getElementById("auth-section")?.scrollIntoView({
                      behavior: "smooth"
                    })}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-medbot-violet/10 to-medbot-cyan/10 rounded-lg" />
                  <div className="glass-card p-5 rounded-lg animate-float">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=870" 
                        alt="Doctor using AI technology with patient" 
                        className="w-full h-auto rounded opacity-90" 
                      />
                      <div className="absolute top-3 right-3 bg-medbot-black/70 px-3 py-1 rounded-full text-xs text-medbot-cyan border border-medbot-cyan flex items-center">
                        <Zap className="h-3 w-3 mr-1" />
                        AI-Enhanced
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Features List */}
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="glass-card rounded-xl p-6 transform hover:scale-105 transition-all duration-300 border border-glass-border">
                <h3 className="text-center text-medbot-cyan font-semibold mb-4 text-lg">Smart Features</h3>
                {features.map((feature, index) => (
                  <div key={index} className={`flex items-center space-x-4 py-3 ${index === activeFeature ? 'opacity-100' : 'opacity-60'} transition-opacity duration-300`}>
                    <div className="h-10 w-10 rounded-full bg-medbot-black/70 border border-medbot-violet flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-medbot-silver">{feature.title}</h3>
                      <p className="text-sm text-medbot-silver/70">{feature.description}</p>
                    </div>
                    <ChevronRight className={`ml-auto h-5 w-5 text-medbot-cyan transform transition-transform duration-300 ${index === activeFeature ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BMI Calculator Section */}
        <section className="py-16 bg-medbot-black/90 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute h-px w-64 bg-medbot-cyan/10 top-1/3 left-1/5 animate-pulse-subtle" style={{animationDelay: '0.7s'}}></div>
            <div className="absolute h-px w-96 bg-medbot-violet/10 bottom-1/4 right-1/6 animate-pulse-subtle" style={{animationDelay: '1.3s'}}></div>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12 reveal">
              <div className="inline-block p-3 glass-card rounded-full mb-4 border border-medbot-cyan/30">
                <Calculator className="h-8 w-8 text-medbot-cyan animate-pulse-subtle" />
              </div>
              
              <AnimateText 
                text="AI-Powered <span class='text-medbot-cyan'>BMI Analysis</span>" 
                tagName="h2" 
                className="text-3xl md:text-4xl font-bold mb-4 text-medbot-silver"
                preserveSpans={true}
              />
              
              <p className="text-lg text-medbot-silver/80 max-w-3xl mx-auto">
                Use our smart BMI calculator to check your body mass index and get AI-generated health recommendations
              </p>
            </div>
            <div className="glass-card p-6 rounded-lg border border-glass-border reveal reveal-delay-1">
              <BMICalculator />
            </div>
          </div>
        </section>
        
        {/* App Features Section */}
        <section className="py-16 bg-medbot-black relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute h-48 w-px bg-medbot-violet/10 top-1/4 left-1/3 animate-pulse-subtle" style={{animationDelay: '0.4s'}}></div>
            <div className="absolute h-64 w-px bg-medbot-cyan/10 bottom-1/3 right-1/2 animate-pulse-subtle" style={{animationDelay: '1.0s'}}></div>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12 reveal">
              <div className="inline-block p-3 glass-card rounded-full mb-4 border border-medbot-violet/30">
                <Cpu className="h-8 w-8 text-medbot-violet animate-pulse-subtle" />
              </div>
              
              <AnimateText 
                text="Verolix <span class='text-medbot-cyan'>MedBot</span> Features" 
                tagName="h2" 
                className="text-3xl md:text-4xl font-bold mb-4 text-medbot-silver"
                preserveSpans={true}
              />
              
              <p className="text-lg text-medbot-silver/80 max-w-3xl mx-auto">
                Discover the AI-powered tools designed to revolutionize your healthcare experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {healthFeatures.map((feature, index) => (
                <div 
                  key={feature.id}
                  onClick={() => openFeaturePopup(feature.id)}
                  className={`feature-card p-6 cursor-pointer reveal reveal-delay-${index % 4 + 1}`}
                >
                  <div className="feature-icon h-12 w-12 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-medbot-cyan mb-2">{feature.title}</h3>
                  <p className="text-medbot-silver/70 text-sm">Click to learn more</p>
                </div>
              ))}
            </div>
            
            {/* Feature Popup */}
            {currentFeature && (
              <FeaturePopup
                title={currentFeature.title}
                description={currentFeature.description}
                icon={currentFeature.icon}
                isOpen={selectedFeature !== null}
                onClose={closeFeaturePopup}
              />
            )}
          </div>
        </section>

        {/* Features Tabs Section */}
        <section className="py-16 bg-medbot-black/80 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute h-px w-80 bg-medbot-cyan/10 top-1/5 left-1/2 animate-pulse-subtle" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute h-72 w-px bg-medbot-violet/10 bottom-1/6 right-1/4 animate-pulse-subtle" style={{animationDelay: '1.1s'}}></div>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12 reveal">
              <AnimateText 
                text="Why Choose <span class='text-medbot-cyan'>Verolix</span>" 
                tagName="h2" 
                className="text-3xl md:text-4xl font-bold mb-4 text-medbot-silver"
                preserveSpans={true}
              />
              
              <p className="text-lg text-medbot-silver/80 max-w-3xl mx-auto">
                Experience the future of healthcare management with our comprehensive AI-enhanced features
              </p>
            </div>

            <Tabs defaultValue="security" className="max-w-4xl mx-auto reveal reveal-delay-1">
              <TabsList className="grid grid-cols-4 mb-8 bg-medbot-black/50 border border-glass-border">
                <TabsTrigger value="security" className="flex items-center data-[state=active]:bg-medbot-black data-[state=active]:text-medbot-cyan">
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="upload" className="data-[state=active]:bg-medbot-black data-[state=active]:text-medbot-cyan">
                  <FilePlus className="mr-2 h-4 w-4" />
                  Easy Upload
                </TabsTrigger>
                <TabsTrigger value="sharing" className="data-[state=active]:bg-medbot-black data-[state=active]:text-medbot-cyan">
                  <Share2 className="mr-2 h-4 w-4" />
                  Sharing
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-medbot-black data-[state=active]:text-medbot-cyan">
                  <Activity className="mr-2 h-4 w-4" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="security" className="space-y-4">
                <div className="glass-card p-6 transition-all duration-300 hover:border-medbot-cyan">
                  <h3 className="text-xl font-bold mb-4 text-medbot-cyan">Quantum-Level Security</h3>
                  <p className="text-medbot-silver">
                    Your health data is protected with state-of-the-art encryption and security measures. We employ the same security standards used by leading financial institutions.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-medbot-silver">
                      <Shield className="h-5 w-5 mr-2 text-medbot-cyan" />
                      End-to-end quantum encryption
                    </li>
                    <li className="flex items-center text-medbot-silver">
                      <Shield className="h-5 w-5 mr-2 text-medbot-cyan" />
                      Regular AI-powered security audits
                    </li>
                    <li className="flex items-center text-medbot-silver">
                      <Shield className="h-5 w-5 mr-2 text-medbot-cyan" />
                      HIPAA compliant biometric storage
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="upload" className="space-y-4">
                <div className="glass-card p-6 transition-all duration-300 hover:border-medbot-cyan">
                  <h3 className="text-xl font-bold mb-4 text-medbot-cyan">Effortless Document Uploads</h3>
                  <p className="text-medbot-silver">
                    Quickly and easily upload your medical records, prescriptions, and test results. Our intuitive interface makes managing your documents a breeze.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-medbot-silver">
                      <FilePlus className="h-5 w-5 mr-2 text-medbot-cyan" />
                      AI-powered document recognition
                    </li>
                    <li className="flex items-center text-medbot-silver">
                      <FilePlus className="h-5 w-5 mr-2 text-medbot-cyan" />
                      Support for multiple file formats
                    </li>
                    <li className="flex items-center text-medbot-silver">
                      <FilePlus className="h-5 w-5 mr-2 text-medbot-cyan" />
                      Automatic file categorization
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="sharing" className="space-y-4">
                <div className="glass-card p-6 transition-all duration-300 hover:border-medbot-cyan">
                  <h3 className="text-xl font-bold mb-4 text-medbot-cyan">Secure Record Sharing</h3>
                  <p className="text-medbot-silver">
                    Instantly share your medical records with healthcare providers using your unique patient ID. Control who has access to your information.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-medbot-silver">
                      <Share2 className="h-5 w-5 mr-2 text-medbot-cyan" />
                      One-click sharing with doctors
                    </li>
                    <li className="flex items-center text-medbot-silver">
                      <Share2 className="h-5 w-5 mr-2 text-medbot-cyan" />
                      Customizable permission levels
                    </li>
                    <li className="flex items-center text-medbot-silver">
                      <Share2 className="h-5 w-5 mr-2 text-medbot-cyan" />
                      Access logs to monitor activity
                    </li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-4">
                <div className="glass-card p-6 transition-all duration-300 hover:border-medbot-cyan">
                  <h3 className="text-xl font-bold mb-4 text-medbot-cyan">Complete Health History</h3>
                  <p className="text-medbot-silver">
                    Maintain a comprehensive record of your health journey, including visits, diagnoses, medications, and test results over time.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-medbot-silver">
                      <Activity className="h-5 w-5 mr-2 text-medbot-cyan" />
                      Lifetime health timeline
                    </li>
                    <li className="flex items-center text-medbot-silver">
                      <Activity className="h-5 w-5 mr-2 text-medbot-cyan" />
                      Advanced search capabilities
                    </li>
                    <li className="flex items-center text-medbot-silver">
                      <Activity className="h-5 w-5 mr-2 text-medbot-cyan" />
                      AI-powered health trend analysis
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Auth Section */}
        <section id="auth-section" className="py-16 bg-medbot-black relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute h-px w-64 bg-medbot-violet/10 top-1/4 right-1/3 animate-pulse-subtle" style={{animationDelay: '0.8s'}}></div>
            <div className="absolute h-48 w-px bg-medbot-cyan/10 bottom-1/4 left-2/3 animate-pulse-subtle" style={{animationDelay: '1.4s'}}></div>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-md mx-auto reveal">
              <div className="text-center mb-8">
                <div className="inline-block p-3 glass-card rounded-full mb-4 border border-medbot-cyan/30">
                  <Bot className="h-8 w-8 text-medbot-cyan animate-pulse-subtle" />
                </div>
                
                <AnimateText 
                  text="Start Your <span class='text-medbot-cyan'>AI</span> Journey" 
                  tagName="h2" 
                  className="text-3xl font-bold mb-4 text-medbot-silver"
                  preserveSpans={true}
                />
                
                <p className="text-medbot-silver/80">Create an account or log in to access your health dashboard</p>
              </div>
              <div className="glass-card p-8 border border-glass-border hover:border-medbot-violet/50 transition-colors duration-300">
                <AuthForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
}