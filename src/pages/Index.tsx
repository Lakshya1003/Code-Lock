import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BMICalculator from "@/components/BMICalculator";
import { Heart, Shield, FilePlus, Share2, Activity, ArrowRight, ChevronRight, Calendar, Stethoscope } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const features = [{
  title: "Schedule Appointments",
  description: "Book and manage your medical appointments with ease.",
  icon: <Calendar className="h-6 w-6" />
}, {
  title: "Access Medical Records",
  description: "View and share your complete medical history securely.",
  icon: <FilePlus className="h-6 w-6" />
}, {
  title: "Connect with Doctors",
  description: "Communicate directly with your healthcare providers.",
  icon: <Stethoscope className="h-6 w-6" />
}];
export default function Index() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
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
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-healthcare-800 to-healthcare-600 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                  Your Health Records, <span className="text-healthcare-200">Simplified</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 text-healthcare-50">
                  Verolix connects patients and doctors through seamless health record management.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button size="lg" className="bg-white text-healthcare-700 hover:bg-healthcare-100 group transition-all duration-300" onClick={() => document.getElementById("auth-section")?.scrollIntoView({
                  behavior: "smooth"
                })}>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-healthcare-600/20 to-healthcare-800/20 rounded-lg" />
                  <div className="bg-white p-5 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=870" alt="Doctor and patient discussing health records" className="w-full h-auto rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Features List */}
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
                {features.map((feature, index) => <div key={index} className={`flex items-center space-x-4 py-3 ${index === activeFeature ? 'opacity-100' : 'opacity-60'} transition-opacity duration-300`}>
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-healthcare-50">{feature.description}</p>
                    </div>
                    <ChevronRight className={`ml-auto h-5 w-5 transform transition-transform duration-300 ${index === activeFeature ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} />
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* BMI Calculator Section */}
        <section className="py-16 bg-healthcare-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Check Your BMI
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Use our BMI calculator to check your body mass index and get instant results
              </p>
            </div>
            <BMICalculator />
          </div>
        </section>

        {/* Features Tabs Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Verolix</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Experience the future of healthcare management with our comprehensive features.
              </p>
            </div>

            <Tabs defaultValue="security" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="security" className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="upload">
                  <FilePlus className="mr-2 h-4 w-4" />
                  Easy Upload
                </TabsTrigger>
                <TabsTrigger value="sharing">
                  <Share2 className="mr-2 h-4 w-4" />
                  Sharing
                </TabsTrigger>
                <TabsTrigger value="history">
                  <Activity className="mr-2 h-4 w-4" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="security" className="space-y-4">
                <div className="bg-healthcare-50 p-6 rounded-lg transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Bank-Level Security</h3>
                  <p className="text-gray-600">
                    Your health data is protected with state-of-the-art encryption and security measures. We employ the same security standards used by leading financial institutions.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-gray-700">
                      <Shield className="h-5 w-5 mr-2 text-healthcare-600" />
                      End-to-end encryption
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Shield className="h-5 w-5 mr-2 text-healthcare-600" />
                      Regular security audits
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Shield className="h-5 w-5 mr-2 text-healthcare-600" />
                      HIPAA compliant storage
                    </li>
                  </ul>
                </div>
              </TabsContent>

              {/* Add similar detailed content for other tabs */}
              <TabsContent value="upload" className="space-y-4">
                <div className="bg-healthcare-50 p-6 rounded-lg transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Effortless Document Uploads</h3>
                  <p className="text-gray-600">
                    Quickly and easily upload your medical records, prescriptions, and test results. Our intuitive interface makes managing your documents a breeze.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-gray-700">
                      <FilePlus className="h-5 w-5 mr-2 text-healthcare-600" />
                      Drag-and-drop functionality
                    </li>
                    <li className="flex items-center text-gray-700">
                      <FilePlus className="h-5 w-5 mr-2 text-healthcare-600" />
                      Support for multiple file formats
                    </li>
                    <li className="flex items-center text-gray-700">
                      <FilePlus className="h-5 w-5 mr-2 text-healthcare-600" />
                      Automatic file categorization
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="sharing" className="space-y-4">
                <div className="bg-healthcare-50 p-6 rounded-lg transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Secure Record Sharing</h3>
                  <p className="text-gray-600">
                    Instantly share your medical records with healthcare providers using your unique patient ID. Control who has access to your information.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-gray-700">
                      <Share2 className="h-5 w-5 mr-2 text-healthcare-600" />
                      One-click sharing with doctors
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Share2 className="h-5 w-5 mr-2 text-healthcare-600" />
                      Revoke access at any time
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Share2 className="h-5 w-5 mr-2 text-healthcare-600" />
                      Detailed access logs
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <div className="bg-healthcare-50 p-6 rounded-lg transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Comprehensive Medical History</h3>
                  <p className="text-gray-600">
                    Maintain a complete timeline of your medical history in one accessible place. Track appointments, medications, and test results.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-gray-700">
                      <Activity className="h-5 w-5 mr-2 text-healthcare-600" />
                      Chronological record display
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Activity className="h-5 w-5 mr-2 text-healthcare-600" />
                      Interactive timeline view
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Activity className="h-5 w-5 mr-2 text-healthcare-600" />
                      Easy filtering and search
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* How It Works Section - Now with hover effects and animations */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get started with Verolix in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((step, index) => <div key={step} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-healthcare-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-12 transition-transform duration-300">
                      {step}
                    </div>
                    {index < 2 && <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-healthcare-300" />}
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {step === 1 ? "Create an Account" : step === 2 ? "Upload Documents" : "Share with Doctors"}
                  </h3>
                  <p className="text-gray-600">
                    {step === 1 ? "Sign up as a patient and receive your unique patient ID, or register as a healthcare provider." : step === 2 ? "Securely upload your medical records, prescriptions, and test results to your personal dashboard." : "Provide your patient ID to healthcare providers, allowing them to access your complete medical history."}
                  </p>
                </div>)}
            </div>
          </div>
        </section>

        {/* Authentication Section */}
        <section id="auth-section" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Verolix Today</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Create an account or log in to start managing your health records securely.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <AuthForm />
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Join thousands of patients and doctors who trust Verolix for health record management.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-healthcare-100 flex items-center justify-center mr-3">
                    <p className="font-bold text-healthcare-700">JD</p>
                  </div>
                  <div>
                    <h4 className="font-bold">John Doe</h4>
                    <p className="text-sm text-gray-600">Patient</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Verolix has changed how I manage my healthcare. I can easily share my records with new specialists without carrying folders of paperwork."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-healthcare-100 flex items-center justify-center mr-3">
                    <p className="font-bold text-healthcare-700">DR</p>
                  </div>
                  <div>
                    <h4 className="font-bold">Dr. Rebecca Smith</h4>
                    <p className="text-sm text-gray-600">Cardiologist</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "As a doctor, Verolix helps me quickly access patient histories, making diagnoses more accurate and treatment more effective."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-healthcare-100 flex items-center justify-center mr-3">
                    <p className="font-bold text-healthcare-700">ML</p>
                  </div>
                  <div>
                    <h4 className="font-bold">Maria Lopez</h4>
                    <p className="text-sm text-gray-600">Patient</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I manage healthcare for my elderly parents, and Verolix makes it so much easier to keep track of their medications and appointments."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-16 bg-healthcare-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-healthcare-700 to-healthcare-900 opacity-50" />
          <div className="container mx-auto px-4 text-center relative">
            <div className="flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 mr-4 animate-pulse" strokeWidth={1.5} />
              <h2 className="text-3xl md:text-4xl font-bold">Ready to take control of your health records?</h2>
            </div>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join Verolix today and experience the future of healthcare record management.
            </p>
            <Button size="lg" className="bg-white text-healthcare-700 hover:bg-healthcare-100 group transition-all duration-300" onClick={() => document.getElementById("auth-section")?.scrollIntoView({
            behavior: "smooth"
          })}>
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
}