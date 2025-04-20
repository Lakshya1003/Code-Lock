import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PatientDashboard from "./components/patient/PatientDashboard";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import MyRecords from "./components/patient/MyRecords";
import Layout from "./components/layout/Layout";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import DownloadApp from "./pages/DownloadApp";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";

const queryClient = new QueryClient();
      
const App = () => {
  // Activate scroll reveal animations
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        } else {
          reveals[i].classList.remove('active');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on page load to reveal elements that are already visible
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route element={<Layout />}>
              <Route path="/patient-dashboard" element={<PatientDashboard />} />
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/my-records" element={<MyRecords />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/download" element={<DownloadApp />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
