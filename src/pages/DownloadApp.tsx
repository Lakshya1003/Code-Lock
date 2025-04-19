
import { Button } from "@/components/ui/button";
import { AppleIcon, Smartphone } from "lucide-react";

export default function DownloadApp() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-healthcare-800 mb-6">
          Download Verolix Mobile App
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Access your health records on the go with our mobile application
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
          <Button
            size="lg"
            className="group hover:scale-105 transition-transform duration-300"
          >
            <AppleIcon className="mr-2 h-5 w-5" />
            Download for iOS
          </Button>
          <Button
            size="lg"
            className="group hover:scale-105 transition-transform duration-300"
          >
            <Smartphone className="mr-2 h-5 w-5" />
            Download for Android
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Easy Access</h3>
            <p className="text-gray-600">
              View your medical records anytime, anywhere with our mobile app.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Secure Storage</h3>
            <p className="text-gray-600">
              Your health data is encrypted and protected with bank-level security.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Quick Share</h3>
            <p className="text-gray-600">
              Share your records with healthcare providers instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
