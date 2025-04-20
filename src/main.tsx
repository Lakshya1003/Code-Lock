import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initAllAnimations } from './lib/animations'

createRoot(document.getElementById("root")!).render(<App />);

// Initialize animations after the app is rendered
document.addEventListener('DOMContentLoaded', () => {
  initAllAnimations();
});
