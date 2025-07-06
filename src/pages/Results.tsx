
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, Bot, Trophy, AlertCircle } from "lucide-react";
import ScoreCircle from "@/components/ScoreCircle";

const Results = () => {
  const [resumeScore, setResumeScore] = useState(0);
  const [atsScore, setAtsScore] = useState(0);
  const [showTips, setShowTips] = useState(false);

  const finalResumeScore = 82;
  const finalAtsScore = 74;

  useEffect(() => {
    // Animate scores
    const resumeInterval = setInterval(() => {
      setResumeScore(prev => {
        if (prev >= finalResumeScore) {
          clearInterval(resumeInterval);
          return finalResumeScore;
        }
        return prev + 2;
      });
    }, 50);

    const atsInterval = setInterval(() => {
      setAtsScore(prev => {
        if (prev >= finalAtsScore) {
          clearInterval(atsInterval);
          setTimeout(() => setShowTips(true), 500);
          return finalAtsScore;
        }
        return prev + 2;
      });
    }, 60);

    return () => {
      clearInterval(resumeInterval);
      clearInterval(atsInterval);
    };
  }, []);

  const suggestions = [
    {
      icon: "💪",
      text: "Add stronger verbs like 'spearheaded' or 'engineered' – not 'did' 😭",
      priority: "high"
    },
    {
      icon: "🎯",
      text: "Your resume needs a glow-up – center those bullets!",
      priority: "medium"
    },
    {
      icon: "🔄",
      text: "You wrote 'responsible for' 7 times. You good?",
      priority: "high"
    },
    {
      icon: "📏",
      text: "Maybe trim it down? 3 pages is giving 'War and Peace' vibes",
      priority: "medium"
    },
    {
      icon: "🔍",
      text: "Add more keywords from the job description",
      priority: "high"
    }
  ];

  const tips = [
    "✅ Keep resume 1 page (unless you're Elon)",
    "✅ Customize for each job",
    "✅ Use keywords from JD",
    "✅ Quantify achievements with numbers",
    "✅ Use active voice, not passive"
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/upload">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Here's Your Score! 🎉</h1>
            <p className="text-gray-600 text-sm">Time for some friendly roasting</p>
          </div>
        </div>

        {/* Score Cards */}
        <div className="space-y-6 mb-8">
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-mint-100 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-mint-100 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-mint-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Resume Score</h3>
                  <p className="text-sm text-gray-600">Overall quality</p>
                </div>
              </div>
              <ScoreCircle score={resumeScore} maxScore={100} color="mint" />
            </div>
          </Card>

          <Card className="p-6 bg-white/90 backdrop-blur-sm border-mint-100 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">ATS Score</h3>
                  <p className="text-sm text-gray-600">Robot-friendly</p>
                </div>
              </div>
              <ScoreCircle score={atsScore} maxScore={100} color="blue" />
            </div>
          </Card>
        </div>

        {/* Overall Grade */}
        <Card className="p-6 bg-gradient-to-r from-mint-500 to-mint-600 text-white mb-8 shadow-lg">
          <div className="text-center">
            <Trophy className="h-12 w-12 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold mb-2">Grade: B+ 🎯</h2>
            <p className="text-mint-100">
              Your resume is pretty solid! Just needs some tweaks to make it shine ✨
            </p>
          </div>
        </Card>

        {/* Suggestions */}
        {showTips && (
          <div className="space-y-4 mb-8 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-mint-600" />
              Friendly Roasts & Fixes
            </h3>
            
            {suggestions.map((suggestion, index) => (
              <Card 
                key={index}
                className={`p-4 bg-white/80 backdrop-blur-sm border-l-4 transition-all duration-300 hover:shadow-md ${
                  suggestion.priority === 'high' 
                    ? 'border-l-red-400 hover:bg-red-50' 
                    : 'border-l-yellow-400 hover:bg-yellow-50'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{suggestion.icon}</span>
                  <p className="text-gray-700 font-medium flex-1">
                    {suggestion.text}
                  </p>
                  {suggestion.priority === 'high' && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                      High Priority
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Coming Soon Button */}
        <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-mint-600 to-mint-700 hover:from-mint-700 hover:to-mint-800 text-white rounded-2xl shadow-lg mb-8">
          Improve My Resume (Coming Soon) 🚀
        </Button>

        {/* Pro Tips */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-mint-100 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            💡 Pro Tips for Your Next Attempt
          </h3>
          <div className="space-y-2">
            {tips.map((tip, index) => (
              <p key={index} className="text-gray-700 text-sm">
                {tip}
              </p>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link to="/upload">
            <Button variant="outline" className="w-full rounded-xl border-mint-200 hover:bg-mint-50">
              Upload Another Resume 📄
            </Button>
          </Link>
          
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

export default Results;
