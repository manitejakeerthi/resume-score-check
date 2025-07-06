
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, ArrowRight, CheckCircle, Users, Trophy, Shield } from "lucide-react";
import AnimatedDocument from "@/components/AnimatedDocument";
import TechLogosSlider from "@/components/TechLogosSlider";
import Hero3D from "@/components/Hero3D";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Animation */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="absolute inset-0 z-0">
          <Hero3D />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border mb-8 animate-fade-in">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-gray-700">Trusted by 50,000+ professionals</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Perfect Your
              <span className="block text-transparent bg-gradient-to-r from-primary to-blue-600 bg-clip-text">
                Resume Score
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.4s'}}>
              Get AI-powered insights to optimize your resume for ATS systems and land your dream job faster
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <Link to="/upload">
                <Button className="h-14 px-8 text-lg font-semibold bg-gray-900 hover:bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Analyze My Resume
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="h-14 px-8 text-lg font-medium rounded-xl border-2 hover:bg-gray-50 transition-all duration-300">
                View Sample Report
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500 animate-fade-in" style={{animationDelay: '0.8s'}}>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Free Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <span>50K+ Users</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-60 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-100 rounded-full opacity-60 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-green-100 rounded-full opacity-60 animate-float" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Tech Companies Section */}
      <section className="py-16 bg-gray-50 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Trusted by professionals at leading companies
            </h2>
            <p className="text-gray-600">
              Join thousands who've improved their resume scores
            </p>
          </div>
          <TechLogosSlider />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Resume Analyzer?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get detailed insights and actionable feedback to improve your resume's performance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">ATS Optimization</h3>
              <p className="text-gray-600 leading-relaxed">
                Ensure your resume passes through Applicant Tracking Systems with our advanced scanning technology
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Detailed Scoring</h3>
              <p className="text-gray-600 leading-relaxed">
                Get comprehensive scores across multiple criteria including format, content, and keyword optimization
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Actionable Tips</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive specific, actionable recommendations to improve your resume's impact and effectiveness
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Perfect Your Resume?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have improved their job prospects with our AI-powered resume analysis
          </p>
          <Link to="/upload">
            <Button className="h-14 px-8 text-lg font-semibold bg-white text-gray-900 hover:bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
