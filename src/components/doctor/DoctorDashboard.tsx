
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import {
  Search,
  User,
  FileText,
  Calendar,
  ClipboardList,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  role: "patient" | "doctor";
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

interface PatientData {
  id: string;
  patientId: string;
  name: string;
  records: MedicalRecord[];
  profile?: {
    dateOfBirth?: string;
    gender?: string;
    medicalConditions?: string;
    allergies?: string;
  };
}

export default function DoctorDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [patientIdInput, setPatientIdInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<PatientData | null>(null);
  const [recentPatients, setRecentPatients] = useState<PatientData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("verolix-user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== "doctor") {
        // Redirect if not a doctor
        navigate("/");
        return;
      }
      setUser(parsedUser);
    } else {
      // Redirect to login if no user found
      navigate("/");
    }

    // Get recent patients from localStorage
    const savedRecentPatients = localStorage.getItem("verolix-recent-patients");
    if (savedRecentPatients) {
      setRecentPatients(JSON.parse(savedRecentPatients));
    }
  }, [navigate]);

  const handleSearchPatient = () => {
    if (!patientIdInput.trim()) {
      toast.error("Please enter a patient ID");
      return;
    }

    setIsSearching(true);

    // Simulate API call to search for patient
    setTimeout(() => {
      // For demo, we'll create a mock patient if ID starts with "PID-"
      if (patientIdInput.startsWith("PID-")) {
        // Get saved records from localStorage
        const savedRecords = localStorage.getItem("verolix-records");
        const records = savedRecords ? JSON.parse(savedRecords) : [];
        
        // Get saved profile from localStorage
        const savedProfile = localStorage.getItem("verolix-profile");
        const profile = savedProfile ? JSON.parse(savedProfile) : {};
        
        const mockPatient: PatientData = {
          id: crypto.randomUUID(),
          patientId: patientIdInput,
          name: `Patient ${patientIdInput.substring(4)}`,
          records,
          profile: {
            dateOfBirth: profile.dateOfBirth || "",
            gender: profile.gender || "",
            medicalConditions: profile.medicalConditions || "",
            allergies: profile.allergies || ""
          }
        };

        setCurrentPatient(mockPatient);

        // Add to recent patients if not already there
        const patientExists = recentPatients.some(p => p.patientId === patientIdInput);
        if (!patientExists) {
          const updatedRecentPatients = [mockPatient, ...recentPatients].slice(0, 5);
          setRecentPatients(updatedRecentPatients);
          localStorage.setItem("verolix-recent-patients", JSON.stringify(updatedRecentPatients));
        }

        toast.success(`Patient ${patientIdInput} found`);
      } else {
        setCurrentPatient(null);
        toast.error(`No patient found with ID ${patientIdInput}`);
      }

      setIsSearching(false);
    }, 1000);
  };

  const handleSelectRecentPatient = (patient: PatientData) => {
    setCurrentPatient(patient);
    setPatientIdInput(patient.patientId);
  };

  if (!user) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, Dr. {user.name}. Access your patients' health records securely.
          </p>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Patient Lookup</CardTitle>
          <CardDescription>
            Enter patient ID to access their medical records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter Patient ID (e.g. PID-12345)"
                value={patientIdInput}
                onChange={(e) => setPatientIdInput(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button 
              onClick={handleSearchPatient} 
              disabled={isSearching}
              className="whitespace-nowrap"
            >
              {isSearching ? "Searching..." : "Search Patient"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {recentPatients.length > 0 && !currentPatient && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-healthcare-50 cursor-pointer"
                  onClick={() => handleSelectRecentPatient(patient)}>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-healthcare-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-healthcare-600" />
                    </div>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Records
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {currentPatient && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl flex items-center">
                    <User className="h-5 w-5 mr-2 text-healthcare-600" />
                    Patient Information
                  </CardTitle>
                  <CardDescription>
                    ID: {currentPatient.patientId}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{currentPatient.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">
                    {currentPatient.profile?.dateOfBirth || "Not provided"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">
                    {currentPatient.profile?.gender || "Not provided"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Total Records</p>
                  <p className="font-medium">{currentPatient.records.length}</p>
                </div>
              </div>

              {currentPatient.profile?.medicalConditions && (
                <div className="mt-4 p-3 bg-healthcare-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-healthcare-600" />
                    <p className="font-medium">Medical Conditions</p>
                  </div>
                  <p className="text-sm">{currentPatient.profile.medicalConditions}</p>
                </div>
              )}

              {currentPatient.profile?.allergies && (
                <div className="mt-4 p-3 bg-healthcare-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-healthcare-600" />
                    <p className="font-medium">Allergies</p>
                  </div>
                  <p className="text-sm">{currentPatient.profile.allergies}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue="records" className="w-full">
            <TabsList>
              <TabsTrigger value="records" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Medical Records
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Timeline
              </TabsTrigger>
            </TabsList>

            <TabsContent value="records" className="space-y-4 mt-4">
              {currentPatient.records.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <ClipboardList className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-600">No records found</p>
                    <p className="text-sm text-gray-500">
                      This patient hasn't uploaded any medical records yet
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {currentPatient.records.map((record) => (
                    <Card key={record.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-1/4 p-4 bg-healthcare-50 flex items-center justify-center sm:justify-start">
                            {record.type === "prescription" ? (
                              <FileText className="h-8 w-8 text-healthcare-600" />
                            ) : record.type === "lab_result" ? (
                              <ClipboardList className="h-8 w-8 text-healthcare-600" />
                            ) : (
                              <ClipboardList className="h-8 w-8 text-healthcare-600" />
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
                            <div className="mt-4 pt-3 border-t flex justify-between items-center">
                              <Button variant="ghost" size="sm">
                                Add Comment
                              </Button>
                              <Button variant="outline" size="sm">
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="timeline" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Medical History Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentPatient.records.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-lg font-medium text-gray-600">No timeline data available</p>
                      <p className="text-sm text-gray-500">
                        Medical records are needed to generate a timeline
                      </p>
                    </div>
                  ) : (
                    <div className="relative border-l border-healthcare-200 ml-3">
                      {currentPatient.records
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((record, index) => (
                          <div key={record.id} className="mb-6 ml-6">
                            <div className="absolute w-3 h-3 bg-healthcare-600 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                            <time className="mb-1 text-sm font-normal leading-none text-gray-500">
                              {record.date}
                            </time>
                            <h3 className="text-base font-semibold text-gray-900">
                              {record.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {record.type === "prescription" ? "Prescription" : 
                               record.type === "lab_result" ? "Lab Result" : 
                               record.type === "doctor_note" ? "Doctor's Notes" : "Personal Info"}
                            </p>
                            {record.details && (
                              <p className="text-sm mt-1">{record.details}</p>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
