
import { useEffect, useState } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import GoldPriceChart from "../components/GoldPriceChart";
import CryptoTrendChart from "../components/CryptoTrendChart";
import ForexRatesChart from "../components/ForexRatesChart";
import FraudActivityMap from "../components/FraudActivityMap";
import { DollarSign, TrendingUp, Shield, Bitcoin, AlertTriangle } from "lucide-react";

const generateRandomStats = () => {
  return {
    goldPrice: (1900 + Math.random() * 200).toFixed(2),
    goldChange: (Math.random() * 5 - 2.5).toFixed(2),
    bitcoinPrice: (50000 + Math.random() * 5000).toFixed(2),
    bitcoinChange: (Math.random() * 10 - 5).toFixed(2),
    fraudDetections: Math.floor(1500 + Math.random() * 500),
    fraudChange: (Math.random() * 8 - 4).toFixed(2),
    riskIndex: (Math.random() * 100).toFixed(2),
    riskChange: (Math.random() * 6 - 3).toFixed(2)
  };
};

const Dashboard = () => {
  const [stats, setStats] = useState(generateRandomStats());
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setDataLoaded(true);
      }, 500);
    }, 1200);
    
    const interval = setInterval(() => {
      setStats(generateRandomStats());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-cyber-navy text-white font-cyber">
      {}
      <div className="grid-overlay"></div>
      
      <Header />
      
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-cyber-blue text-2xl font-mono animate-pulse">
              LOADING SYSTEM DATA...
            </div>
          </div>
        ) : (
          <div className={`transition-opacity duration-1000 ${dataLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="mb-6">
              <h1 className="text-3xl font-bold glow-text mb-1">Reduce Financial Loss</h1>
              <p className="text-gray-400">Real-time monitoring and fraud detection system</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard 
                title="Gold Price (XAU/USD)" 
                value={`$${stats.goldPrice}`} 
                change={parseFloat(stats.goldChange)} 
                icon={<DollarSign size={20} />}
                isLoading={!dataLoaded}
              />
              <StatCard 
                title="Bitcoin Price (BTC/USD)" 
                value={`$${stats.bitcoinPrice}`} 
                change={parseFloat(stats.bitcoinChange)} 
                icon={<Bitcoin size={20} />}
                isLoading={!dataLoaded}
              />
              <StatCard 
                title="Fraud Detections (24h)" 
                value={stats.fraudDetections} 
                change={parseFloat(stats.fraudChange)} 
                icon={<Shield size={20} />}
                isLoading={!dataLoaded}
              />
              <StatCard 
                title="Risk Index" 
                value={stats.riskIndex} 
                change={parseFloat(stats.riskChange)} 
                icon={<AlertTriangle size={20} />}
                isLoading={!dataLoaded}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <GoldPriceChart />
              <CryptoTrendChart />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ForexRatesChart />
              <FraudActivityMap />
            </div>
          </div>
        )}
      </main>
      
      <footer className="p-4 border-t border-cyber-blue/20 text-center text-xs text-gray-500">
        <div className="flex justify-center items-center space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse"></div>
          <span>DARKWAVE FINANCE</span>
          <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse"></div>
        </div>
        <div className="mt-1">© {new Date().getFullYear()} DARKWAVE Corporation - Aritra Kundu. All systems monitored.</div>
      </footer>
    </div>
  );
};

export default Dashboard;
