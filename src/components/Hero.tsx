import React, { useEffect } from 'react';
import { Brain, Bot, Shield, PlusCircle, ActivitySquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  useEffect(() => {
    // Function to handle scroll animations
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;
      
      reveals.forEach((reveal) => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
          reveal.classList.add('active');
        }
      });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Initial check for elements in view on load
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden w-full bg-medbot-black">
      {/* Background elements */}
      <div className="absolute inset-0 data-flow-bg opacity-25"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-medbot-black/80"></div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side content */}
          <div className="w-full md:w-1/2 space-y-6 z-10">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="text-medbot-cyan h-8 w-8 animate-pulse-subtle" />
              <p className="text-medbot-cyan font-medium cyber-border px-3 py-1 text-sm">
                NEXT GENERATION HEALTHCARE
              </p>
            </div>
            
            <h1 className="glitch-text text-4xl md:text-5xl lg:text-6xl font-bold text-white" data-text="Healthcare Redefined by AI">
              Healthcare <span className="text-medbot-cyan">Redefined</span> by AI
            </h1>
            
            <div className="h-1 w-24 bg-gradient-to-r from-medbot-cyan to-medbot-violet rounded-full mb-6 animate-pulse-subtle"></div>
            
            <p className="text-gray-300 text-lg max-w-lg reveal reveal-delay-1">
              Experience the perfect fusion of advanced medical expertise and cutting-edge artificial intelligence. 
              MedBot delivers personalized healthcare solutions with unprecedented accuracy and accessibility.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8 reveal reveal-delay-2">
              <Link to="/services" className="neon-button flex items-center gap-2 px-8 py-3">
                Explore <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
              <Link to="/contact" className="glass-button flex items-center gap-2 px-8 py-3">
                Contact Us
              </Link>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4 mt-10 reveal reveal-delay-3">
              <div className="flex items-center gap-3">
                <Shield className="text-medbot-violet h-5 w-5" />
                <span className="text-gray-300">Data Security</span>
              </div>
              <div className="flex items-center gap-3">
                <ActivitySquare className="text-medbot-cyan h-5 w-5" />
                <span className="text-gray-300">Precise Diagnostics</span>
              </div>
              <div className="flex items-center gap-3">
                <Brain className="text-medbot-violet h-5 w-5" />
                <span className="text-gray-300">AI-Powered Insights</span>
              </div>
              <div className="flex items-center gap-3">
                <PlusCircle className="text-medbot-cyan h-5 w-5" />
                <span className="text-gray-300">24/7 Assistance</span>
              </div>
            </div>
          </div>
          
          {/* Right side - 3D Hero visual */}
          <div className="w-full md:w-1/2 flex justify-center items-center z-10 reveal reveal-delay-2">
            <div className="relative scanning-effect rotate-3d">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-medbot-cyan to-medbot-violet rounded-full blur opacity-70 animate-pulse-subtle"></div>
              <div className="glass-card border border-glass-border p-1 rounded-full">
                <div className="bg-medbot-black/80 rounded-full p-6 md:p-12 relative overflow-hidden hologram-flicker">
                  <img
                    src="/images/hero-medbot.png"
                    alt="MedBot AI Assistant"
                    className="w-64 h-64 md:w-80 md:h-80 object-contain"
                  />
                  
                  {/* Pulsing circles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full border-2 border-medbot-cyan/20 rounded-full animate-pulse-subtle"></div>
                    <div className="absolute w-3/4 h-3/4 border-2 border-medbot-violet/20 rounded-full animate-pulse-subtle"></div>
                    <div className="absolute w-1/2 h-1/2 border-2 border-medbot-cyan/20 rounded-full animate-pulse-subtle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scrolling stats bar */}
        <div className="mt-20 glass-card border border-glass-border p-6 rounded-lg shimmer reveal reveal-delay-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Satisfied Patients</p>
              <p className="text-3xl font-bold text-white neon-text-pulse">25,000+</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Accuracy Rate</p>
              <p className="text-3xl font-bold text-white neon-text-pulse">99.8%</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Healthcare Partners</p>
              <p className="text-3xl font-bold text-white neon-text-pulse">250+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 