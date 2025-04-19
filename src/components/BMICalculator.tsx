
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const heightInMeters = Number(height) / 100;
    const weightInKg = Number(weight);
    
    if (heightInMeters > 0 && weightInKg > 0) {
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(Number(bmiValue.toFixed(1)));
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { category: "Normal", color: "text-green-600" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-600" };
    return { category: "Obese", color: "text-red-600" };
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-center mb-6">
        <Calculator className="h-8 w-8 text-healthcare-600 mr-3" />
        <h2 className="text-2xl font-bold text-healthcare-800">BMI Calculator</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-healthcare-500 focus:border-healthcare-500"
            placeholder="Enter height in cm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-healthcare-500 focus:border-healthcare-500"
            placeholder="Enter weight in kg"
          />
        </div>
        
        <Button 
          onClick={calculateBMI}
          className="w-full"
        >
          Calculate BMI
        </Button>
        
        {bmi !== null && (
          <div className="mt-4 text-center">
            <p className="text-lg">Your BMI is: <span className="font-bold">{bmi}</span></p>
            <p className={`text-lg ${getBMICategory(bmi).color}`}>
              Category: {getBMICategory(bmi).category}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
