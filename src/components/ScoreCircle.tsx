
import { useEffect, useState } from "react";

interface ScoreCircleProps {
  score: number;
  maxScore: number;
  color: "mint" | "blue";
}

const ScoreCircle = ({ score, maxScore, color }: ScoreCircleProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = Math.round((score / maxScore) * 100);
  const circumference = 2 * Math.PI * 18; // radius = 18
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    mint: "text-mint-600",
    blue: "text-blue-600"
  };

  const strokeColors = {
    mint: "#2D9191",
    blue: "#3B82F6"
  };

  useEffect(() => {
    setAnimatedScore(score);
  }, [score]);

  return (
    <div className="relative w-16 h-16">
      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 40 40">
        {/* Background circle */}
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke={strokeColors[color]}
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-lg font-bold ${colorClasses[color]}`}>
          {animatedScore}
        </span>
      </div>
    </div>
  );
};

export default ScoreCircle;
