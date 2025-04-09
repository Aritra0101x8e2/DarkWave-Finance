
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { RefreshCw } from "lucide-react";

// Generate sample data for crypto trends
const generateCryptoData = () => {
  const bitcoinBase = 50000 + Math.random() * 10000;
  const etherBase = 3000 + Math.random() * 500;
  
  return Array.from({ length: 24 }, (_, i) => {
    const btcFluctuation = Math.random() * 1000 - 500;
    const ethFluctuation = Math.random() * 200 - 100;
    
    return {
      time: `${i}:00`,
      bitcoin: Math.max(bitcoinBase + btcFluctuation, bitcoinBase - 2000),
      ethereum: Math.max(etherBase + ethFluctuation, etherBase - 300),
      solana: Math.max(100 + Math.random() * 10 - 5, 80),
    };
  });
};

const CryptoTrendChart = () => {
  const [data, setData] = useState(generateCryptoData());
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [activeCrypto, setActiveCrypto] = useState<string[]>(["bitcoin", "ethereum", "solana"]);

  const cryptoColors = {
    bitcoin: "#F7931A",
    ethereum: "#627EEA",
    solana: "#00FFA3",
  };

  const toggleCrypto = (crypto: string) => {
    if (activeCrypto.includes(crypto)) {
      setActiveCrypto(activeCrypto.filter(c => c !== crypto));
    } else {
      setActiveCrypto([...activeCrypto, crypto]);
    }
  };

  const refreshData = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setData(generateCryptoData());
      setLoading(false);
      setLastUpdated(new Date());
    }, 800);
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 35000); // Refresh every 35 seconds
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="cyber-card p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Cryptocurrency Trends</h2>
          <p className="text-xs text-gray-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={refreshData}
          disabled={loading}
          className="p-2 rounded-full hover:bg-cyber-blue/10 text-gray-400 hover:text-cyber-blue transition-colors"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => toggleCrypto("bitcoin")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            activeCrypto.includes("bitcoin")
              ? "bg-[#F7931A]/20 text-[#F7931A] border border-[#F7931A]/30"
              : "bg-gray-800 text-gray-400 border border-transparent"
          }`}
        >
          Bitcoin
        </button>
        <button
          onClick={() => toggleCrypto("ethereum")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            activeCrypto.includes("ethereum")
              ? "bg-[#627EEA]/20 text-[#627EEA] border border-[#627EEA]/30"
              : "bg-gray-800 text-gray-400 border border-transparent"
          }`}
        >
          Ethereum
        </button>
        <button
          onClick={() => toggleCrypto("solana")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            activeCrypto.includes("solana")
              ? "bg-[#00FFA3]/20 text-[#00FFA3] border border-[#00FFA3]/30"
              : "bg-gray-800 text-gray-400 border border-transparent"
          }`}
        >
          Solana
        </button>
      </div>

      <div className="h-[300px] transition-opacity duration-300" style={{ opacity: loading ? 0.5 : 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="time"
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatCurrency}
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 31, 44, 0.9)',
                border: '1px solid rgba(30, 174, 219, 0.2)',
                borderRadius: '0.5rem',
                boxShadow: '0 0 10px rgba(30, 174, 219, 0.2)',
                color: '#fff',
              }}
              formatter={(value: any, name: string) => [
                formatCurrency(value),
                name.charAt(0).toUpperCase() + name.slice(1),
              ]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span style={{ color: '#9CA3AF', fontSize: '12px' }}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )}
            />
            {activeCrypto.includes("bitcoin") && (
              <Line
                type="monotone"
                dataKey="bitcoin"
                stroke={cryptoColors.bitcoin}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: cryptoColors.bitcoin, strokeWidth: 2, fill: '#1A1F2C' }}
                isAnimationActive={true}
                animationDuration={1000}
              />
            )}
            {activeCrypto.includes("ethereum") && (
              <Line
                type="monotone"
                dataKey="ethereum"
                stroke={cryptoColors.ethereum}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: cryptoColors.ethereum, strokeWidth: 2, fill: '#1A1F2C' }}
                isAnimationActive={true}
                animationDuration={1000}
              />
            )}
            {activeCrypto.includes("solana") && (
              <Line
                type="monotone"
                dataKey="solana"
                stroke={cryptoColors.solana}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: cryptoColors.solana, strokeWidth: 2, fill: '#1A1F2C' }}
                isAnimationActive={true}
                animationDuration={1000}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CryptoTrendChart;
