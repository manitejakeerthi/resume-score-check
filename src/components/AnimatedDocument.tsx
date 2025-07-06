
import { useState, useEffect } from "react";
import { FileText } from "lucide-react";

const AnimatedDocument = () => {
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsScanning(true);
      setTimeout(() => setIsScanning(false), 2000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className={`p-6 bg-white rounded-2xl shadow-lg border-2 border-mint-200 transition-all duration-300 ${isScanning ? 'scan-effect' : ''} animate-float`}>
        <FileText className="h-16 w-16 text-mint-600 mx-auto" />
        <div className="mt-4 space-y-2">
          <div className="h-2 bg-gray-200 rounded w-full"></div>
          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
        </div>
        
        {/* Cute face */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-mint-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">😊</span>
        </div>
        
        {/* Sparkles */}
        <div className="absolute -top-1 -left-1 text-yellow-400 animate-pulse">✨</div>
        <div className="absolute -bottom-1 -right-1 text-yellow-400 animate-pulse delay-500">✨</div>
      </div>
    </div>
  );
};

export default AnimatedDocument;
