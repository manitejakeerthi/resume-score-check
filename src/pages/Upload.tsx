
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { Upload as UploadIcon, FileText, ArrowLeft, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import LoadingAnimation from "@/components/LoadingAnimation";
import FileUploadZone from "@/components/FileUploadZone";
import ResultsDisplay from "@/components/ResultsDisplay";

interface ApiResponse {
  resume_score: number;
  ats_score: number;
  tips: string[];
}

const Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [apiResults, setApiResults] = useState<ApiResponse | null>(null);
  const navigate = useNavigate();

  const handleFileSelect = useCallback((selectedFile: File) => {
    console.log("File selected:", selectedFile.name);
    setFile(selectedFile);
    setApiResults(null);
    toast({
      title: "File selected",
      description: `${selectedFile.name} is ready to be analyzed`,
    });
  }, []);

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a resume first",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 1MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      const resumeText = await file.text();

      const response = await fetch("https://resume-score-check-backend-648s.vercel.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          resumeText: resumeText,
          jobDescription: jobDescription,
        }),
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const result = await response.json();

      const data: ApiResponse = {
        resume_score: result.score || 0,
        ats_score: result.score || 0,
        tips: result.tips || ["Nice resume! Try to add more achievements."],
      };

      setTimeout(() => {
        setIsUploading(false);
        setApiResults(data);
        toast({
          title: "Analysis Complete",
          description: `Resume Score: ${result.score}`,
        });
      }, 1000);
    } catch (error) {
      console.error("API Error:", error);
      setIsUploading(false);
      setUploadProgress(0);
      toast({
        title: "Analysis failed",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  if (isUploading) {
    return <LoadingAnimation progress={uploadProgress} />;
  }

  if (apiResults) {
    return <ResultsDisplay results={apiResults} onUploadAnother={() => {
      setApiResults(null);
      setFile(null);
      setJobDescription("");
    }} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Resume Analysis</h1>
            <p className="text-gray-600 text-sm">Upload your resume for professional scoring</p>
          </div>
        </div>

        {/* Upload Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }} className="space-y-8">
          {/* Upload Zone */}
          <div className="mb-8">
            <label htmlFor="resume-upload" className="block text-lg font-medium text-gray-900 mb-4">
              Upload Your Resume
            </label>
            <FileUploadZone onFileSelect={handleFileSelect} selectedFile={file} />
            <p className="text-center text-sm text-gray-500 mt-3">
              Maximum 1MB. Supports PDF and DOCX formats.
            </p>
          </div>

          {/* Job Description Input */}
          <div className="mb-8">
            <label htmlFor="job-description" className="block text-lg font-medium text-gray-900 mb-4">
              Job Description or Job Role (Optional)
            </label>
            <Textarea
              id="job-description"
              placeholder="Paste the job description or enter the job role you're applying for. This helps us provide more targeted feedback."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[120px] resize-y"
            />
            <p className="text-sm text-gray-500 mt-2">
              Adding a job description helps us tailor the analysis to specific requirements.
            </p>
          </div>

          {/* Guidelines */}
          <Card className="p-6 bg-gray-50 border border-gray-200 mb-8">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-gray-600 mt-1" />
              <div className="space-y-3 text-sm">
                <p className="font-medium text-gray-900">Upload Guidelines:</p>
                <ul className="text-gray-600 space-y-1">
                  <li>• Maximum file size: 1MB</li>
                  <li>• Supported formats: PDF, DOCX</li>
                  <li>• Your data is processed securely and not stored</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Analyze Button */}
          <Button
            type="submit"
            disabled={!file}
            className={`w-full h-12 text-base font-medium rounded-lg transition-all duration-200 ${
              file
                ? "bg-gray-900 hover:bg-gray-800 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {file ? (
              <>
                <Search className="mr-2 h-4 w-4" />
                Analyze Resume
              </>
            ) : (
              "Upload a file first"
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Get professional insights to improve your resume's effectiveness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upload;
