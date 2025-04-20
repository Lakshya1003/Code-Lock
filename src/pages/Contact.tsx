import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimateText from "@/utils/textAnimator";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear the error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {
      name: formData.name ? "" : "Name is required",
      email: formData.email ? (validateEmail(formData.email) ? "" : "Please enter a valid email") : "Email is required",
      message: formData.message ? "" : "Message is required"
    };
    
    setErrors(newErrors);
    
    // Check if form is valid
    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      // In a real app, you would submit the form data to your backend
      console.log("Form submitted:", formData);
      setSubmitted(true);
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="inline-block p-3 glass-card rounded-full mb-4 border border-medbot-cyan/30">
            <Bot className="h-10 w-10 text-medbot-cyan animate-pulse-subtle" />
          </div>
          
          <AnimateText 
            text="Connect <span class='text-medbot-cyan'>With Us</span>" 
            tagName="h1" 
            className="text-5xl font-bold text-medbot-silver mb-6"
            preserveSpans={true}
          />
          
          <p className="text-xl text-medbot-silver/80 max-w-2xl mx-auto">
            Get in touch with our AI-assisted team for support or inquiries
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8 reveal reveal-delay-1">
            <div className="glass-card p-6 flex items-start space-x-4 hover:border-medbot-cyan transition-colors duration-300 animate-float">
              <div className="h-12 w-12 rounded-full bg-medbot-black/70 border border-medbot-violet flex items-center justify-center">
                <Mail className="h-6 w-6 text-medbot-cyan" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-medbot-cyan">Email</h3>
                <p className="text-medbot-silver">support@verolix.com</p>
              </div>
            </div>
            <div className="glass-card p-6 flex items-start space-x-4 hover:border-medbot-cyan transition-colors duration-300 animate-float" style={{animationDelay: '0.2s'}}>
              <div className="h-12 w-12 rounded-full bg-medbot-black/70 border border-medbot-violet flex items-center justify-center">
                <Phone className="h-6 w-6 text-medbot-cyan" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-medbot-cyan">Phone</h3>
                <p className="text-medbot-silver">+91 123-456-7890</p>
              </div>
            </div>
            <div className="glass-card p-6 flex items-start space-x-4 hover:border-medbot-cyan transition-colors duration-300 animate-float" style={{animationDelay: '0.4s'}}>
              <div className="h-12 w-12 rounded-full bg-medbot-black/70 border border-medbot-violet flex items-center justify-center">
                <MapPin className="h-6 w-6 text-medbot-cyan" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-medbot-cyan">Address</h3>
                <p className="text-medbot-silver">
                  Acropolis Institute Of Technology And Research - AITR<br />
                  Indore, Madhya Pradesh
                </p>
              </div>
            </div>
            
            {/* Google Map */}
            <div className="mt-8 h-[300px] rounded-lg overflow-hidden shadow-md glass-card p-1 reveal reveal-delay-2">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.2999411584757!2d75.86921941120642!3d22.72023697902144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd0b7d3bdf89%3A0x11b1311c2e715eda!2sAcropolis%20Institute%20of%20Technology%20and%20Research!5e0!3m2!1sen!2sin!4v1698924271252!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="reveal reveal-delay-3">
            {submitted ? (
              <div className="glass-card border border-medbot-cyan p-8 rounded-lg flex flex-col items-center space-y-4 animate-float">
                <div className="h-16 w-16 rounded-full bg-medbot-black/70 border-2 border-medbot-cyan flex items-center justify-center mb-2">
                  <CheckCircle className="h-8 w-8 text-medbot-cyan" />
                </div>
                <h3 className="font-semibold text-xl text-medbot-cyan">Message Sent!</h3>
                <p className="text-medbot-silver text-center">Thank you for contacting us. Our AI assistant will analyze your request and we'll get back to you soon.</p>
                <div className="h-1 w-24 bg-gradient-to-r from-medbot-violet to-medbot-cyan rounded-full mt-4"></div>
              </div>
            ) : (
              <form className="glass-card p-8 rounded-lg shadow-sm border border-glass-border hover:border-medbot-violet/50 transition-colors duration-300" onSubmit={handleSubmit}>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-medbot-cyan">Send a Message</h2>
                  <div className="h-1 w-16 bg-gradient-to-r from-medbot-violet to-medbot-cyan rounded-full mx-auto mt-3"></div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-medbot-silver mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-glass-border'} bg-medbot-black/30 px-4 py-3 shadow-sm focus:border-medbot-cyan focus:ring-1 focus:ring-medbot-cyan text-medbot-silver outline-none`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" /> {errors.name}
                    </p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-medbot-silver mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-glass-border'} bg-medbot-black/30 px-4 py-3 shadow-sm focus:border-medbot-cyan focus:ring-1 focus:ring-medbot-cyan text-medbot-silver outline-none`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" /> {errors.email}
                    </p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-medbot-silver mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`block w-full rounded-md border ${errors.message ? 'border-red-500' : 'border-glass-border'} bg-medbot-black/30 px-4 py-3 shadow-sm focus:border-medbot-cyan focus:ring-1 focus:ring-medbot-cyan text-medbot-silver outline-none`}
                    placeholder="Your message"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" /> {errors.message}
                    </p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full neon-button flex items-center justify-center gap-2 py-3"
                >
                  <span>Send Message</span>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
