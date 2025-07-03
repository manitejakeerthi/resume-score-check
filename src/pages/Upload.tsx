
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Upload as UploadIcon, FileText, ArrowLeft, Sparkles } from "lucide-react";
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
  const [apiResults, setApiResults] = useState<ApiResponse | null>(null);
  const navigate = useNavigate();

  const handleFileSelect = useCallback((selectedFile: File) => {
    console.log("File selected:", selectedFile.name);
    setFile(selectedFile);
    setApiResults(null); // Clear previous results
    toast({
      title: "File selected! 📄",
      description: `${selectedFile.name} is ready to be analyzed`,
    });
  }, []);

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "Oops! 🤔",
        description: "Please upload a resume first",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (1MB limit)
    if (file.size > 1024 * 1024) {
      toast({
        title: "File too large! 📏",
        description: "Please upload a file smaller than 1MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Create FormData for multipart/form-data
    const formData = new FormData();
    formData.append('resume', file);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      console.log("Sending request to API...");
      const response = await fetch('https://resume-scoring-api-macha.up.railway.app/analyze', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      console.log("API Response:", data);

      setTimeout(() => {
        setIsUploading(false);
        setApiResults(data);
        toast({
          title: "Analysis Complete! 🎉",
          description: "Your resume has been scored successfully",
        });
      }, 1000);

    } catch (error) {
      console.error("API Error:", error);
      setIsUploading(false);
      setUploadProgress(0);
      
      toast({
        title: "Oops! Something went wrong 😅",
        description: "Our AI pigeons are taking a coffee break. Try again in a moment!",
        variant: "destructive",
      });
    }
  };

  if (isUploading) {
    return <LoadingAnimation progress={uploadProgress} />;
  }

  // Show results if we have them
  if (apiResults) {
    return <ResultsDisplay results={apiResults} onUploadAnother={() => {
      setApiResults(null);
      setFile(null);
    }} />;
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Let's Roast It 😬</h1>
            <p className="text-gray-600 text-sm">Upload your resume (PDF or DOCX)</p>
          </div>
        </div>

        {/* Subtext */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 font-medium">
            We'll be nice. Maybe. 😈
          </p>
        </div>

        {/* Upload Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }} className="space-y-8">
          {/* Upload Zone */}
          <div className="mb-8">
            <label htmlFor="resume-upload" className="block text-lg font-semibold text-gray-800 mb-4">
              Upload Your Resume (PDF or DOCX)
            </label>
            <FileUploadZone onFileSelect={handleFileSelect} selectedFile={file} />
            <p className="text-center text-sm text-gray-500 mt-3 flex items-center justify-center gap-2">
              <span>💡</span>
              Max 1MB. We respect your privacy 🫡
            </p>
          </div>

          {/* Tips */}
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-mint-100 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm">💡</span>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-gray-800">Quick Tips:</p>
                <ul className="text-gray-600 space-y-1">
                  <li>• Max 1MB file size</li>
                  <li>• PDF or DOCX formats only</li>
                  <li>• We respect your privacy 🫡</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Analyze Button */}
          <Button
            type="submit"
            disabled={!file}
            className={`w-full h-14 text-lg font-semibold rounded-2xl shadow-lg transition-all duration-300 ${
              file
                ? "bg-mint-600 hover:bg-mint-700 text-white hover:shadow-xl transform hover:scale-[1.02]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {file ? "Analyze Now 🔍" : "Upload a file first"}
            {file && <Sparkles className="ml-2 h-5 w-5 animate-pulse" />}
          </Button>
        </form>

        {/* Fun footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm italic">
            Our AI pigeons are hungry for resumes 🐦🤖
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upload;
