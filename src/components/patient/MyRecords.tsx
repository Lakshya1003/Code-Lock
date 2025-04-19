
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Download, Search, ClipboardList, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MedicalRecord {
  id: string;
  type: "prescription" | "lab_result" | "doctor_note" | "personal_info";
  title: string;
  fileName?: string;
  date: string;
  doctor?: string;
  details?: string;
}

export default function MyRecords() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecords, setFilteredRecords] = useState<MedicalRecord[]>([]);

  useEffect(() => {
    // Get records from localStorage
    const savedRecords = localStorage.getItem("verolix-records");
    if (savedRecords) {
      const parsedRecords = JSON.parse(savedRecords);
      setRecords(parsedRecords);
      setFilteredRecords(parsedRecords);
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRecords(records);
    } else {
      const filtered = records.filter(
        (record) =>
          record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.doctor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.fileName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecords(filtered);
    }
  }, [searchTerm, records]);

  const getRecordIcon = (type: string) => {
    switch (type) {
      case "prescription":
        return <FileText className="h-8 w-8 text-healthcare-600" />;
      case "lab_result":
        return <ClipboardList className="h-8 w-8 text-healthcare-600" />;
      case "doctor_note":
        return <Stethoscope className="h-8 w-8 text-healthcare-600" />;
      default:
        return <FileText className="h-8 w-8 text-healthcare-600" />;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">My Medical Records</h1>
        <div className="w-full md:w-auto relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full md:w-[300px]"
          />
        </div>
      </div>

      {filteredRecords.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            {searchTerm ? (
              <>
                <p className="text-lg font-medium text-gray-600">No matching records found</p>
                <p className="text-sm text-gray-500 mb-4">
                  Try different search terms or clear your search
                </p>
                <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
              </>
            ) : (
              <>
                <p className="text-lg font-medium text-gray-600">No records found</p>
                <p className="text-sm text-gray-500 mb-4">
                  You haven't uploaded any medical records yet
                </p>
                <Button onClick={() => window.location.href = "/patient-dashboard?tab=upload"}>
                  Upload Records
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredRecords.map((record) => (
            <Card key={record.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/5 p-6 bg-healthcare-50 flex items-center justify-center">
                    {getRecordIcon(record.type)}
                  </div>
                  <div className="p-6 sm:w-4/5">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <h3 className="font-medium text-lg mb-2">{record.title}</h3>
                        <p className="text-sm text-gray-500 mb-1">
                          {record.fileName}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-600 mt-2">
                          <span className="flex items-center mb-1 sm:mb-0">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              ></path>
                            </svg>
                            {record.date}
                          </span>
                          {record.doctor && (
                            <span className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                ></path>
                              </svg>
                              {record.doctor}
                            </span>
                          )}
                        </div>
                        {record.details && (
                          <p className="text-sm mt-3 text-gray-700">{record.details}</p>
                        )}
                      </div>
                      <div className="flex mt-4 sm:mt-0">
                        <Button variant="outline" size="sm" className="mr-2">
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
