
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LoadingAnimationProps {
  progress: number;
}

const LoadingAnimation = ({ progress }: LoadingAnimationProps) => {
  const getLoadingMessage = () => {
    if (progress < 30) return "Feeding your resume to AI pigeons... 🐦🤖";
    if (progress < 60) return "Teaching robots to read... 📖🤖";
    if (progress < 90) return "Preparing the roast... 🔥😎";
    return "Almost done! Getting ready to score... 🎯";
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <Card className="p-8 bg-white/90 backdrop-blur-sm border-mint-100">
          <div className="text-center space-y-8">
            {/* Cute robot animation */}
            <div className="relative">
              <div className="w-24 h-24 bg-mint-100 rounded-2xl mx-auto flex items-center justify-center animate-bounce">
                <span className="text-4xl animate-pulse">🤖</span>
              </div>
              
              {/* Flying papers */}
              <div className="absolute -top-2 -left-4 text-2xl animate-float">📄</div>
              <div className="absolute -top-4 -right-2 text-xl animate-float delay-500">📄</div>
              <div className="absolute -bottom-2 left-2 text-lg animate-float delay-1000">📄</div>
              
              {/* Sparkles */}
              <div className="absolute top-0 right-8 text-yellow-400 animate-pulse">✨</div>
              <div className="absolute bottom-4 -left-2 text-yellow-400 animate-pulse delay-700">✨</div>
            </div>

            {/* Loading message */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Analyzing Your Resume...
              </h2>
              <p className="text-gray-600 font-medium animate-pulse">
                {getLoadingMessage()}
              </p>
            </div>

            {/* Progress bar */}
            <div className="space-y-3">
              <Progress 
                value={progress} 
                className="h-3 bg-mint-100"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Fun tip */}
            <div className="bg-mint-50 p-4 rounded-xl border border-mint-200">
              <p className="text-sm text-gray-600">
                <strong>Pro Tip:</strong> While we analyze, remember that most recruiters spend only 6 seconds scanning a resume! 👀⏰
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoadingAnimation;
