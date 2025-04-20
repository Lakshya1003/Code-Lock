import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeaturePopupProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function FeaturePopup({ 
  title, 
  description, 
  icon, 
  isOpen, 
  onClose 
}: FeaturePopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-medbot-black/80 backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-300 animate-fade-in">
      <div 
        className="glass-card max-w-lg w-full mx-4 p-8 animate-scale border border-glass-border shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-medbot-black/70 border border-medbot-violet flex items-center justify-center mr-4">
              {icon}
            </div>
            <h3 className="text-2xl font-semibold text-medbot-cyan">{title}</h3>
          </div>
          <Button 
            onClick={onClose}
            variant="ghost" 
            size="icon"
            className="h-8 w-8 rounded-full text-medbot-silver hover:bg-medbot-black/50 hover:text-medbot-cyan transition-colors"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="glass-card p-6 mb-6 border border-medbot-violet/30">
          <p className="text-medbot-silver leading-relaxed">{description}</p>
          <div className="h-1 w-16 bg-gradient-to-r from-medbot-violet to-transparent rounded-full mt-4"></div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={onClose}
            className="neon-button"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
} 