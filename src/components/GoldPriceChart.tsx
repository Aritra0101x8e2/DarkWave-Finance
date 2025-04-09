
import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { RefreshCw } from "lucide-react";

// Sample data for gold prices
const generateGoldData = () => {
  const basePrice = 2000 + Math.random() * 100;
  return Array.from({ length: 24 }, (_, i) => {
    const fluctuation = Math.random() * 30 - 15;
    return {
      time: `${i}:00`,
      price: Math.max(basePrice + fluctuation, basePrice - 50),
      volatility: Math.random() * 5,
    };
  });
};

const GoldPriceChart = () => {
  const [data, setData] = useState(generateGoldData());
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refreshData = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setData(generateGoldData());
      setLoading(false);
      setLastUpdated(new Date());
    }, 800);
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="cyber-card p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center">
            Gold Price
            <span className="ml-2 px-2 py-0.5 bg-cyber-yellow/20 text-cyber-yellow text-xs rounded-full">
              XAU/USD
            </span>
          </h2>
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

      <div className="h-[300px] transition-opacity duration-300" style={{ opacity: loading ? 0.5 : 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFC145" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FFC145" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 31, 44, 0.9)',
                border: '1px solid rgba(30, 174, 219, 0.2)',
                borderRadius: '0.5rem',
                boxShadow: '0 0 10px rgba(30, 174, 219, 0.2)',
                color: '#fff',
              }}
              formatter={(value: any) => [formatCurrency(value), 'Price']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#FFC145"
              strokeWidth={2}
              fill="url(#goldGradient)"
              activeDot={{ r: 4, stroke: '#FFC145', strokeWidth: 2, fill: '#1A1F2C' }}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GoldPriceChart;
