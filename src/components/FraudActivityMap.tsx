
import { useEffect, useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";
import { RefreshCw, Shield } from "lucide-react";

// Generate sample data for fraud activity
const generateFraudData = () => {
  return Array.from({ length: 50 }, () => ({
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    z: Math.floor(Math.random() * 100) + 50, // Severity
    region: ["North America", "Europe", "Asia", "South America", "Africa"][
      Math.floor(Math.random() * 5)
    ],
    type: ["Credit Card", "Identity Theft", "Phishing", "Wire Transfer", "Account Takeover"][
      Math.floor(Math.random() * 5)
    ],
  }));
};

const FraudActivityMap = () => {
  const [data, setData] = useState(generateFraudData());
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState("All");

  const refreshData = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setData(generateFraudData());
      setLoading(false);
      setLastUpdated(new Date());
    }, 800);
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 40000); // Refresh every 40 seconds
    return () => clearInterval(interval);
  }, []);

  const filteredData = activeFilter === "All" 
    ? data 
    : data.filter(item => item.region === activeFilter || item.type === activeFilter);

  const regions = ["All", "North America", "Europe", "Asia", "South America", "Africa"];
  const fraudTypes = ["Credit Card", "Identity Theft", "Phishing", "Wire Transfer", "Account Takeover"];

  const severityColor = (severity: number) => {
    if (severity > 120) return "#FF5E5B"; // High risk
    if (severity > 80) return "#FFC145"; // Medium risk
    return "#00FF9D"; // Low risk
  };

  return (
    <div className="cyber-card p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center">
            <Shield size={18} className="mr-2 text-cyber-blue" />
            Fraud Activity Heatmap
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

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveFilter("All")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            activeFilter === "All"
              ? "bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30"
              : "bg-gray-800 text-gray-400 border border-transparent"
          }`}
        >
          All
        </button>
        
        {regions.slice(1).map((region) => (
          <button
            key={region}
            onClick={() => setActiveFilter(region)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeFilter === region
                ? "bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30"
                : "bg-gray-800 text-gray-400 border border-transparent"
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="h-[300px] transition-opacity duration-300" style={{ opacity: loading ? 0.5 : 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              type="number"
              dataKey="x"
              name="Risk Factor"
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
              domain={[0, 100]}
              label={{ value: 'Risk Factor', position: 'insideBottom', offset: -5, fill: '#9CA3AF', fontSize: 10 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Detection Index"
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
              domain={[0, 100]}
              label={{ value: 'Detection Index', angle: -90, position: 'insideLeft', offset: 10, fill: '#9CA3AF', fontSize: 10 }}
            />
            <ZAxis
              type="number"
              dataKey="z"
              range={[20, 200]}
              domain={[0, 200]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 31, 44, 0.9)',
                border: '1px solid rgba(30, 174, 219, 0.2)',
                borderRadius: '0.5rem',
                boxShadow: '0 0 10px rgba(30, 174, 219, 0.2)',
                color: '#fff',
              }}
              formatter={(value: any, name: string, props: any) => {
                if (name === "z") return ["Severity: " + value, ""];
                return [value, name];
              }}
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-gray-900 border border-cyber-blue/20 p-2 rounded shadow-lg">
                      <p className="text-xs font-semibold mb-1">{data.type}</p>
                      <p className="text-xs text-gray-400">Region: {data.region}</p>
                      <p className="text-xs text-gray-400">Severity: {data.z}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter
              name="Fraud Activity"
              data={filteredData}
              fill="#1EAEDB"
              isAnimationActive={true}
              animationDuration={1000}
              shape={(props: any) => {
                const { cx, cy, r } = props;
                const severity = props.payload.z;
                const color = severityColor(severity);
                
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={color}
                    opacity={0.7}
                    className="animate-pulse-glow"
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FraudActivityMap;
