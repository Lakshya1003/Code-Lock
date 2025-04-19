
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { FileUp, FileText, Loader2 } from "lucide-react";

interface MedicalRecord {
  id: string;
  type: "prescription" | "lab_result" | "doctor_note" | "personal_info";
  title: string;
  fileName?: string;
  date: string;
  doctor?: string;
  details?: string;
}

interface MedicalRecordUploadProps {
  onRecordAdded: (record: MedicalRecord) => void;
}

export default function MedicalRecordUpload({ onRecordAdded }: MedicalRecordUploadProps) {
  const [recordType, setRecordType] = useState<"prescription" | "lab_result" | "doctor_note" | "personal_info">("prescription");
  const [title, setTitle] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!title || !date || !file) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Simulate upload delay
    setTimeout(() => {
      const newRecord: MedicalRecord = {
        id: crypto.randomUUID(),
        type: recordType,
        title,
        fileName: file?.name,
        date,
        doctor: doctor || undefined,
        details: details || undefined,
      };

      onRecordAdded(newRecord);
      toast.success("Record uploaded successfully!");

      // Reset form
      setTitle("");
      setDoctor("");
      setDate("");
      setDetails("");
      setFile(null);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Upload Medical Document</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="record-type">Document Type *</Label>
              <Select
                value={recordType}
                onValueChange={(value: any) => setRecordType(value)}
                required
              >
                <SelectTrigger id="record-type">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prescription">Prescription</SelectItem>
                  <SelectItem value="lab_result">Lab Result</SelectItem>
                  <SelectItem value="doctor_note">Doctor's Note</SelectItem>
                  <SelectItem value="personal_info">Personal Info</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Document Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Annual Checkup Results"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Document Date *</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Healthcare Provider</Label>
              <Input
                id="doctor"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                placeholder="Dr. Name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Additional Details</Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter any additional details about this document..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Upload File *</Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                  file ? "bg-healthcare-50 border-healthcare-300" : "bg-gray-50 border-gray-300"
                } hover:bg-healthcare-50 hover:border-healthcare-300`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {file ? (
                    <>
                      <FileText className="w-8 h-8 mb-2 text-healthcare-500" />
                      <p className="text-sm text-healthcare-500 font-semibold">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <FileUp className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="mb-1 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and
                        drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, JPG, PNG (MAX. 10MB)
                      </p>
                    </>
                  )}
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  required
                />
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <FileUp className="mr-2 h-4 w-4" />
                Upload Document
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
