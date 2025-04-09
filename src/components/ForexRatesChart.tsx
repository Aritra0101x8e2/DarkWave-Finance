
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { RefreshCw, ChevronDown } from "lucide-react";

// Sample data for forex rates
const generateForexData = () => {
  return [
    { currency: "EUR/USD", rate: 1.05 + Math.random() * 0.1, change: (Math.random() * 2 - 1).toFixed(2) },
    { currency: "USD/JPY", rate: 150 + Math.random() * 5, change: (Math.random() * 2 - 1).toFixed(2) },
    { currency: "GBP/USD", rate: 1.25 + Math.random() * 0.1, change: (Math.random() * 2 - 1).toFixed(2) },
    { currency: "USD/CAD", rate: 1.35 + Math.random() * 0.1, change: (Math.random() * 2 - 1).toFixed(2) },
    { currency: "AUD/USD", rate: 0.65 + Math.random() * 0.05, change: (Math.random() * 2 - 1).toFixed(2) },
    { currency: "NZD/USD", rate: 0.59 + Math.random() * 0.05, change: (Math.random() * 2 - 1).toFixed(2) },
  ];
};

const ForexRatesChart = () => {
  const [data, setData] = useState(generateForexData());
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const refreshData = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setData(generateForexData());
      setLoading(false);
      setLastUpdated(new Date());
    }, 800);
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 25000); // Refresh every 25 seconds
    return () => clearInterval(interval);
  }, []);

  const formatRate = (value: number) => {
    return value.toFixed(4);
  };

  return (
    <div className="cyber-card p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Forex Exchange Rates</h2>
          <p className="text-xs text-gray-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-cyber-blue/10 text-cyber-blue text-xs"
            >
              <span>Base: {baseCurrency}</span>
              <ChevronDown size={12} />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-24 rounded-lg bg-gray-800 border border-cyber-blue/20 shadow-lg z-10">
                {["USD", "EUR", "GBP"].map((currency) => (
                  <button
                    key={currency}
                    onClick={() => {
                      setBaseCurrency(currency);
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-xs hover:bg-cyber-blue/10 text-gray-300 hover:text-cyber-blue"
                  >
                    {currency}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={refreshData}
            disabled={loading}
            className="p-2 rounded-full hover:bg-cyber-blue/10 text-gray-400 hover:text-cyber-blue transition-colors"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="h-[300px] transition-opacity duration-300" style={{ opacity: loading ? 0.5 : 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            barGap={2}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="currency"
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatRate}
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
              domain={['dataMin - 0.1', 'dataMax + 0.1']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 31, 44, 0.9)',
                border: '1px solid rgba(30, 174, 219, 0.2)',
                borderRadius: '0.5rem',
                boxShadow: '0 0 10px rgba(30, 174, 219, 0.2)',
                color: '#fff',
              }}
              formatter={(value: any) => [formatRate(value), 'Rate']}
            />
            <Bar
              dataKey="rate"
              fill="#1EAEDB"
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForexRatesChart;
