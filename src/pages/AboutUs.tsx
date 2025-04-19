
import { Heart } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-healthcare-100 rounded-full mb-4">
            <Heart className="h-8 w-8 text-healthcare-600" />
          </div>
          <h1 className="text-4xl font-bold text-healthcare-800 mb-6">About Verolix</h1>
          <p className="text-xl text-gray-600 mb-8">
            Revolutionizing healthcare record management through technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-healthcare-700">Our Mission</h2>
            <p className="text-gray-600">
              At Verolix, we're committed to making healthcare information accessible,
              secure, and easy to manage for both patients and healthcare providers.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-healthcare-700">Our Vision</h2>
            <p className="text-gray-600">
              We envision a future where managing health records is seamless,
              enabling better healthcare decisions and outcomes for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
