
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  FilePlus,
  Stethoscope,
  ClipboardList,
  User,
  Calendar
} from "lucide-react";
import MedicalRecordUpload from "./MedicalRecordUpload";
import PatientProfile from "./PatientProfile";

interface User {
  id: string;
  email: string;
  name: string;
  role: "patient" | "doctor";
  patientId?: string;
}

interface MedicalRecord {
  id: string;
  type: "prescription" | "lab_result" | "doctor_note" | "personal_info";
  title: string;
  fileName?: string;
  date: string;
  doctor?: string;
  details?: string;
}

export default function PatientDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("verolix-user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to login if no user found
      navigate("/");
    }

    // Get records from localStorage or initialize with sample data
    const savedRecords = localStorage.getItem("verolix-records");
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    } else {
      // Sample data
      const sampleRecords: MedicalRecord[] = [
        {
          id: "1",
          type: "prescription",
          title: "Amoxicillin Prescription",
          fileName: "amoxicillin_prescription.pdf",
          date: "2023-04-15",
          doctor: "Dr. Sarah Johnson",
          details: "500mg, three times daily for 7 days"
        },
        {
          id: "2",
          type: "lab_result",
          title: "Blood Test Results",
          fileName: "blood_test_apr2023.pdf",
          date: "2023-04-10",
          doctor: "Dr. David Chen",
          details: "Complete blood count and lipid panel"
        },
        {
          id: "3",
          type: "doctor_note",
          title: "Annual Checkup Notes",
          fileName: "checkup_notes.pdf",
          date: "2023-03-22",
          doctor: "Dr. Sarah Johnson",
          details: "General examination, follow-up in 6 months"
        },
      ];
      setRecords(sampleRecords);
      localStorage.setItem("verolix-records", JSON.stringify(sampleRecords));
    }
  }, [navigate]);

  const handleAddRecord = (newRecord: MedicalRecord) => {
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    localStorage.setItem("verolix-records", JSON.stringify(updatedRecords));
  };

  if (!user) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user.name}. Manage your health records securely.
          </p>
        </div>
        <div className="mt-4 md:mt-0 p-4 bg-healthcare-50 rounded-lg flex flex-col items-start">
          <span className="text-sm text-gray-600">Your Patient ID</span>
          <span className="text-xl font-bold text-healthcare-700">{user.patientId}</span>
          <span className="text-xs text-gray-500 mt-1">Share with your doctor to grant access</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center">
              <FileText className="h-5 w-5 mr-2 text-healthcare-600" />
              Medical Records
            </CardTitle>
            <CardDescription>Total documents stored</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-healthcare-700">
              {records.length}
            </div>
            <p className="text-sm text-gray-500 mt-1">Documents uploaded</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center">
              <Stethoscope className="h-5 w-5 mr-2 text-healthcare-600" />
              Healthcare Providers
            </CardTitle>
            <CardDescription>Doctors who can access your records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-healthcare-700">2</div>
            <p className="text-sm text-gray-500 mt-1">Authorized providers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-healthcare-600" />
              Last Updated
            </CardTitle>
            <CardDescription>Most recent record update</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-healthcare-700">
              {new Date().toLocaleDateString()}
            </div>
            <p className="text-sm text-gray-500 mt-1">Today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="records" className="w-full mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="records" className="flex items-center">
            <ClipboardList className="h-4 w-4 mr-2" />
            My Records
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center">
            <FilePlus className="h-4 w-4 mr-2" />
            Upload Records
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            My Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">My Medical Records</h2>
            <Button onClick={() => document.getElementById("tab-upload")?.click()}>
              <FilePlus className="h-4 w-4 mr-2" />
              Upload New Record
            </Button>
          </div>

          {records.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-600">No records found</p>
                <p className="text-sm text-gray-500 mb-4">
                  Start by uploading your medical documents
                </p>
                <Button onClick={() => document.getElementById("tab-upload")?.click()}>
                  <FilePlus className="h-4 w-4 mr-2" />
                  Upload Records
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {records.map((record) => (
                <Card key={record.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/4 p-4 bg-healthcare-50 flex items-center justify-center sm:justify-start">
                        {record.type === "prescription" ? (
                          <FileText className="h-8 w-8 text-healthcare-600" />
                        ) : record.type === "lab_result" ? (
                          <ClipboardList className="h-8 w-8 text-healthcare-600" />
                        ) : (
                          <Stethoscope className="h-8 w-8 text-healthcare-600" />
                        )}
                      </div>
                      <div className="p-4 sm:w-3/4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{record.title}</h3>
                            <p className="text-sm text-gray-500">{record.fileName}</p>
                            <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-600 mt-2">
                              <span>Date: {record.date}</span>
                              {record.doctor && <span>Doctor: {record.doctor}</span>}
                            </div>
                            {record.details && (
                              <p className="text-sm mt-2">{record.details}</p>
                            )}
                          </div>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upload" id="tab-upload">
          <h2 className="text-xl font-semibold mb-6">Upload Medical Records</h2>
          <MedicalRecordUpload onRecordAdded={handleAddRecord} />
        </TabsContent>

        <TabsContent value="profile">
          <h2 className="text-xl font-semibold mb-6">My Profile</h2>
          <PatientProfile user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
