
import { Bell, Settings } from "lucide-react";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <header className="flex items-center justify-between p-4 border-b border-cyber-blue/20">
      <div className="flex items-center">
        <div className="mr-4 relative">
          <div className="text-cyber-blue font-bold text-4xl shine-text">DARKWAVE</div>
          <div className="text-xs text-gray-400 uppercase tracking-widest absolute -bottom-3 right-0">
            Financial Sentinel
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="px-6 py-1 rounded-full glow-border mr-6 flex items-center">
          <div className="w-2 h-2 rounded-full bg-cyber-green mr-2 animate-pulse"></div>
          <div className="font-mono text-sm">
            SYSTEM ONLINE | <span className="text-cyber-blue">{currentTime}</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="p-2 rounded-full hover:bg-cyber-blue/10 text-gray-400 hover:text-cyber-blue transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-cyber-blue/10 text-gray-400 hover:text-cyber-blue transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
