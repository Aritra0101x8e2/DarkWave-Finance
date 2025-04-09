
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  isLoading = false 
}) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Trigger animation when value changes
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, [value]);
  
  return (
    <div className={`cyber-card p-4 transition-all duration-300 hover:scale-[1.01] ${animate ? 'animate-glow' : 'animate-pulse-glow'}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-gray-300 text-sm uppercase tracking-wider font-medium">{title}</h3>
        <div className="text-cyber-blue">{icon}</div>
      </div>
      
      <div className="flex items-baseline">
        {isLoading ? (
          <div className="h-8 w-24 bg-gray-700/50 animate-pulse rounded"></div>
        ) : (
          <div className="text-2xl font-bold transition-all duration-500 ease-in-out">
            {value}
          </div>
        )}
      </div>
      
      <div className="flex items-center mt-2">
        {change >= 0 ? (
          <span className="flex items-center text-cyber-green text-sm">
            <ArrowUp size={12} className="mr-1" />
            {change}%
          </span>
        ) : (
          <span className="flex items-center text-cyber-red text-sm">
            <ArrowDown size={12} className="mr-1" />
            {Math.abs(change)}%
          </span>
        )}
        <span className="text-xs text-gray-400 ml-2">vs. previous period</span>
      </div>
    </div>
  );
};

export default StatCard;
