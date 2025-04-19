
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-healthcare-600" />
              <span className="text-xl font-bold text-healthcare-800">Verolix</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 max-w-md">
              Empowering healthcare through seamless record management and improved doctor-patient communication
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Platform</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-healthcare-600 text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-healthcare-600 text-sm">
                    For Patients
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-healthcare-600 text-sm">
                    For Doctors
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-healthcare-600 text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-healthcare-600 text-sm">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-healthcare-600 text-sm">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Support</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-healthcare-600 text-sm">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-healthcare-600 text-sm">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-healthcare-600 text-sm">
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Verolix. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-healthcare-600">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-healthcare-600">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-healthcare-600">
              <span className="sr-only">Facebook</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
