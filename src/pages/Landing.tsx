
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, Sparkles, ArrowRight } from "lucide-react";
import AnimatedDocument from "@/components/AnimatedDocument";

const Landing = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="h-8 w-8 text-mint-600" />
            <Sparkles className="h-6 w-6 text-mint-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
            How Good is Your Resume, Really?
          </h1>
          <p className="text-lg text-gray-600 font-medium mb-6">
            Let our friendly AI roast your resume and help you glow up before your next interview 🔥
          </p>
        </div>

        {/* Animated Document */}
        <div className="flex justify-center mb-8">
          <AnimatedDocument />
        </div>

        {/* Main CTA */}
        <div className="mb-8">
          <Link to="/upload">
            <Button className="w-full h-14 text-lg font-semibold bg-mint-600 hover:bg-mint-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              Upload Resume Now 🚀
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Fun tip */}
        <div className="text-center mb-12">
          <p className="text-gray-500 italic">
            We won't tell HR, promise 😉
          </p>
        </div>

        {/* Features Cards */}
        <div className="space-y-4 mb-12">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-mint-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-mint-100 rounded-full flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">ATS Score</h3>
                <p className="text-sm text-gray-600">Beat the robots, get to humans</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border-mint-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-mint-100 rounded-full flex items-center justify-center">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Smart Tips</h3>
                <p className="text-sm text-gray-600">Actionable advice that actually works</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border-mint-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-mint-100 rounded-full flex items-center justify-center">
                <span className="text-xl">🔒</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Private & Secure</h3>
                <p className="text-sm text-gray-600">Your resume stays between us</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <Button variant="outline" className="w-full rounded-xl border-mint-200 hover:bg-mint-50">
            View Sample Score 📊
          </Button>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>🔒 We respect your privacy and don't store your resume</p>
            <p>📱 Works on all devices • ⚡ Results in seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
