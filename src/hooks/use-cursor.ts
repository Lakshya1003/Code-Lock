import { useEffect, RefObject } from 'react';

interface UseCursorProps {
  dotRef: RefObject<HTMLDivElement>;
  outlineRef: RefObject<HTMLDivElement>;
}

export function useCustomCursor({ dotRef, outlineRef }: UseCursorProps) {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update dot position immediately
      if (dotRef.current) {
        dotRef.current.style.left = `${clientX}px`;
        dotRef.current.style.top = `${clientY}px`;
      }
      
      // Update outline position with slight delay for smoother effect
      requestAnimationFrame(() => {
        if (outlineRef.current) {
          outlineRef.current.style.left = `${clientX}px`;
          outlineRef.current.style.top = `${clientY}px`;
        }
      });
    };
    
    // Apply scale effect when hovering over clickable elements
    const handleElementHover = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        dotRef.current.style.backgroundColor = 'transparent';
      }
      
      if (outlineRef.current) {
        outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        outlineRef.current.style.borderColor = 'var(--medbot-cyan)';
      }
    };
    
    // Reset cursor styling when not hovering over elements
    const handleElementLeave = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        dotRef.current.style.backgroundColor = 'var(--cursor-color)';
      }
      
      if (outlineRef.current) {
        outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        outlineRef.current.style.borderColor = 'var(--cursor-border)';
      }
    };
    
    // Apply interactive cursor behavior on clickable elements
    const applyInteractiveCursor = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleElementHover);
        el.addEventListener('mouseleave', handleElementLeave);
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    applyInteractiveCursor();
    
    // Handle cursor visibility when window gets focus or loses focus
    window.addEventListener('focus', () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (outlineRef.current) outlineRef.current.style.opacity = '1';
    });
    
    window.addEventListener('blur', () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (outlineRef.current) outlineRef.current.style.opacity = '0';
    });
    
    // Clean up
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, [dotRef, outlineRef]);
}

export default useCustomCursor; 