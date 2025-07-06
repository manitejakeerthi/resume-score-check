
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, Bot, Trophy, Upload } from "lucide-react";

interface ApiResponse {
  resume_score: number;
  ats_score: number;
  tips: string[];
}

interface ResultsDisplayProps {
  results: ApiResponse;
  onUploadAnother: () => void;
}

const ResultsDisplay = ({ results, onUploadAnother }: ResultsDisplayProps) => {
  const [resumeScore, setResumeScore] = useState(0);
  const [atsScore, setAtsScore] = useState(0);
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    // Animate scores
    const resumeInterval = setInterval(() => {
      setResumeScore(prev => {
        if (prev >= results.resume_score) {
          clearInterval(resumeInterval);
          return results.resume_score;
        }
        return prev + 2;
      });
    }, 50);

    const atsInterval = setInterval(() => {
      setAtsScore(prev => {
        if (prev >= results.ats_score) {
          clearInterval(atsInterval);
          setTimeout(() => setShowTips(true), 500);
          return results.ats_score;
        }
        return prev + 2;
      });
    }, 60);

    return () => {
      clearInterval(resumeInterval);
      clearInterval(atsInterval);
    };
  }, [results]);

  const getGrade = () => {
    const average = (results.resume_score + results.ats_score) / 2;
    if (average >= 90) return { grade: "A+", emoji: "🏆", message: "Absolutely crushing it!" };
    if (average >= 80) return { grade: "A", emoji: "🎯", message: "Your resume's almost too hot for HR!" };
    if (average >= 70) return { grade: "B+", emoji: "🔥", message: "Pretty solid! Just needs some tweaks" };
    if (average >= 60) return { grade: "B", emoji: "👍", message: "Good foundation, room for improvement" };
    return { grade: "C+", emoji: "💪", message: "Time for a resume glow-up!" };
  };

  const gradeInfo = getGrade();

  // Add some fun emojis to tips
  const addEmojiToTip = (tip: string, index: number) => {
    const emojis = ["💪", "🎯", "✨", "🔥", "⚡", "🚀", "💎", "🎨"];
    return `${emojis[index % emojis.length]} ${tip}`;
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Here's Your Score! 🎉</h1>
            <p className="text-gray-600 text-sm">Fresh from our AI kitchen</p>
          </div>
        </div>

        {/* Score Cards with Animated Progress Bars */}
        <div className="space-y-6 mb-8">
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-mint-100 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-mint-100 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-mint-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">🎯 Resume Score</h3>
                  <p className="text-sm text-gray-600">Overall quality</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-mint-600">{resumeScore}</span>
                <span className="text-gray-500">/100</span>
              </div>
            </div>
            <Progress 
              value={resumeScore} 
              className="h-3 bg-mint-100"
            />
          </Card>

          <Card className="p-6 bg-white/90 backdrop-blur-sm border-mint-100 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">🤖 ATS Score</h3>
                  <p className="text-sm text-gray-600">Robot-friendly</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-blue-600">{atsScore}</span>
                <span className="text-gray-500">/100</span>
              </div>
            </div>
            <Progress 
              value={atsScore} 
              className="h-3 bg-blue-100"
            />
          </Card>
        </div>

        {/* Overall Grade */}
        <Card className="p-6 bg-gradient-to-r from-mint-500 to-mint-600 text-white mb-8 shadow-lg">
          <div className="text-center">
            <div className="text-4xl mb-2 animate-bounce">{gradeInfo.emoji}</div>
            <h2 className="text-2xl font-bold mb-2">Grade: {gradeInfo.grade}</h2>
            <p className="text-mint-100">
              {gradeInfo.message}
            </p>
          </div>
        </Card>

        {/* Tips as Meme Cards */}
        {showTips && results.tips.length > 0 && (
          <div className="space-y-4 mb-8 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              🔥 Hot Tips from the AI Kitchen
            </h3>
            
            <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
              {results.tips.map((tip, index) => (
                <Card 
                  key={index}
                  className="p-4 bg-white/80 backdrop-blur-sm border-l-4 border-l-mint-400 hover:bg-mint-50 transition-all duration-300 hover:shadow-md transform hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {["💡", "🎯", "⚡", "🚀", "💎", "🔥", "✨", "💪"][index % 8]}
                    </div>
                    <p className="text-gray-700 font-medium flex-1">
                      {addEmojiToTip(tip, index)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={onUploadAnother}
            className="w-full h-14 text-lg font-semibold bg-mint-600 hover:bg-mint-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
          >
            <Upload className="mr-2 h-5 w-5" />
            Upload Another Resume 📄
          </Button>
          
          <Link to="/">
            <Button variant="ghost" className="w-full text-gray-600">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Fun footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm italic">
            Remember: Even the best resumes get rejected sometimes. It's not you, it's them! 😤💪
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
