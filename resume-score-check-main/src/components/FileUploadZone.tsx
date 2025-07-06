
import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Upload, FileText, CheckCircle } from "lucide-react";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

const FileUploadZone = ({ onFileSelect, selectedFile }: FileUploadZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  return (
    <Card
      className={`relative p-8 border-2 border-dashed transition-all duration-300 cursor-pointer hover:shadow-md ${
        isDragOver
          ? "border-mint-500 bg-mint-50"
          : selectedFile
          ? "border-green-400 bg-green-50"
          : "border-mint-200 bg-white/80 backdrop-blur-sm hover:border-mint-400"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileInput}
        className="hidden"
      />
      
      <div className="text-center">
        {selectedFile ? (
          <div className="space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-bounce" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                File Ready! ✅
              </h3>
              <p className="text-gray-600 font-medium">{selectedFile.name}</p>
              <p className="text-sm text-gray-500 mt-1">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <p className="text-sm text-gray-500 italic">
              Click to change file
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <Upload className="h-16 w-16 text-mint-500 mx-auto animate-float" />
              <div className="absolute -top-2 -right-8 text-yellow-400 animate-pulse">✨</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Drop your resume here
              </h3>
              <p className="text-gray-600">or click to browse</p>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>PDF</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>DOCX</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Flying papers animation */}
      {isDragOver && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 text-mint-400 animate-bounce">📄</div>
          <div className="absolute top-8 right-6 text-mint-400 animate-bounce delay-100">📄</div>
          <div className="absolute bottom-6 left-8 text-mint-400 animate-bounce delay-200">📄</div>
        </div>
      )}
    </Card>
  );
};

export default FileUploadZone;
