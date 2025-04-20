import { Brain, Users, Cpu, Bot } from "lucide-react";
import AnimateText from "@/utils/textAnimator";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Lakshya Raj Malviya",
      role: "UI/UX Designer & Team Leader, App Developer (Flutter, Java)",
      image: "https://ui-avatars.com/api/?name=Lakshya+Raj+Malviya&background=0A0F24&color=00F0FF"
    },
    {
      name: "Mitali Mehra",
      role: "Canva, Figma, UI/UX, Frontend Specialist",
      image: "https://ui-avatars.com/api/?name=Mitali+Mehra&background=0A0F24&color=6C5CE7"
    },
    {
      name: "Kaushik Barnwal",
      role: "Backend Developer (React, JS, Node.js)",
      image: "https://ui-avatars.com/api/?name=Kaushik+Barnwal&background=0A0F24&color=00F0FF"
    },
    {
      name: "Himang Sahu",
      role: "Database Engineer (Firebase, Cloudinary)",
      image: "https://ui-avatars.com/api/?name=Himang+Sahu&background=0A0F24&color=6C5CE7"
    },
    {
      name: "Krishna Katiyar",
      role: "Frontend Developer (Tailwind, Bootstrap 5)",
      image: "https://ui-avatars.com/api/?name=Krishna+Katiyar&background=0A0F24&color=00F0FF"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="inline-block p-3 glass-card rounded-full mb-4 border border-medbot-cyan/30">
            <Brain className="h-10 w-10 text-medbot-cyan animate-pulse-subtle" />
          </div>
          
          <AnimateText 
            text="About <span class='text-medbot-cyan'>Verolix</span>" 
            tagName="h1" 
            className="text-5xl font-bold text-medbot-silver mb-6"
            preserveSpans={true}
          />
          
          <div className="flex justify-center gap-3 mt-6">
            <span className="inline-flex items-center text-xs text-medbot-silver bg-medbot-black/50 border border-medbot-violet px-3 py-1 rounded-full">
              <Bot className="mr-1 h-3 w-3 text-medbot-cyan" />
              AI-Powered
            </span>
            <span className="inline-flex items-center text-xs text-medbot-silver bg-medbot-black/50 border border-medbot-violet px-3 py-1 rounded-full">
              <Cpu className="mr-1 h-3 w-3 text-medbot-cyan" />
              Healthcare Tech
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="glass-card p-8 space-y-6 reveal reveal-delay-1 animate-float">
            <h2 className="text-2xl font-semibold text-medbot-cyan">Who We Are</h2>
            <p className="text-medbot-silver">
              Verolix is a personalized AI-powered health companion designed to help you prevent chronic conditions before they start. Built on cutting-edge agentic AI architecture, Verolix combines deep health insights, real-time feedback, and intelligent coaching to empower your lifestyle. Whether it's nutrition, activity, or motivation—Vero is with you every step of the way.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-medbot-cyan to-medbot-violet rounded-full"></div>
          </div>
          <div className="glass-card p-8 space-y-6 reveal reveal-delay-2 animate-float">
            <h2 className="text-2xl font-semibold text-medbot-cyan">Vision</h2>
            <p className="text-medbot-silver">
              To create a society where preventive care is not an afterthought, but a daily habit—powered by intelligent, compassionate AI. We envision a world where everyone has access to a personal health coach that evolves with them, guiding them toward a longer, healthier life.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-medbot-violet to-medbot-cyan rounded-full"></div>
          </div>
        </div>

        <div className="mt-24 reveal reveal-delay-2">
          <div className="text-center mb-12">
            <div className="inline-block p-3 glass-card rounded-full mb-4 border border-medbot-violet/30">
              <Users className="h-8 w-8 text-medbot-violet animate-pulse-subtle" />
            </div>
            
            <AnimateText 
              text="Our <span class='text-medbot-cyan'>Team</span>" 
              tagName="h2" 
              className="text-3xl font-semibold text-medbot-cyan mb-4"
              preserveSpans={true}
            />
            
            <p className="text-xl text-medbot-silver/80 max-w-2xl mx-auto">
              Meet the talented individuals behind Verolix
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {teamMembers.map((member, index) => (
              <div key={index} className={`glass-card p-6 rounded-lg text-center flex flex-col items-center group reveal reveal-delay-${index % 4 + 1}`}>
                <div className="mb-4 mx-auto">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-2 border-medbot-violet transition-transform duration-300 transform group-hover:scale-105 group-hover:border-medbot-cyan">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-medbot-cyan text-center w-full">{member.name}</h3>
                <p className="text-sm text-medbot-silver/80 mt-2 px-4 text-center w-full">{member.role}</p>
                <div className="mt-4 h-1 w-12 mx-auto bg-gradient-to-r from-medbot-violet to-transparent rounded-full group-hover:w-24 group-hover:bg-gradient-to-r group-hover:from-medbot-cyan group-hover:to-transparent transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
