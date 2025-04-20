/**
 * Handles scroll-based animations for elements with the 'reveal' class
 * Elements will animate in when they enter the viewport
 */
export function initScrollAnimations(): void {
  // Function to check if an element is in viewport
  function isInViewport(element: Element): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  }

  // Function to handle scroll events
  function handleScroll(): void {
    const revealElements = document.querySelectorAll('.reveal');
    
    revealElements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add('active');
      }
    });
  }

  // Initial check for elements in viewport on page load
  window.addEventListener('load', handleScroll);
  
  // Check for elements in viewport on scroll
  window.addEventListener('scroll', handleScroll);
}

/**
 * Adds a small shrink effect to the navbar when scrolling down
 */
export function initNavbarScrollEffect(): void {
  function handleNavbarScroll(): void {
    const navbar = document.querySelector('header');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }
  
  window.addEventListener('scroll', handleNavbarScroll);
}

/**
 * Applies hover effects to buttons and interactive elements
 */
export function initHoverEffects(): void {
  // Add hover effects to buttons
  const buttons = document.querySelectorAll('button, .btn, [role="button"]');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.classList.add('hover-effect');
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('hover-effect');
    });
  });
}

/**
 * Initialize all animations
 */
export function initAllAnimations(): void {
  initScrollAnimations();
  initNavbarScrollEffect();
  initHoverEffects();
} 