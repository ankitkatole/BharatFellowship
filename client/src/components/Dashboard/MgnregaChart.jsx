import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useMgnregaData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext"; 

const MgnregaChart = () => {
  const { data } = useMgnregaData();
  const { t } = useLanguage(); 
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!data.length) return;
    const formatted = data.map((d, i) => ({
      name: d.district_name || `District ${i + 1}`,
      works: parseInt(d.Number_of_Completed_Works || 0),
    })).sort((a, b) => b.works - a.works).slice(0, 12); // Get top 12
    setChartData(formatted);
  }, [data]);

  return (
    <div className="w-full h-[450px] bg-beige p-6 rounded-2xl shadow-lg border-2 border-black/20 animate-fadeIn">
     
      <h3 className="text-xl font-momo text-black text-center mb-4">
        {t('chartTitleWorks')}
      </h3>
      
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <XAxis dataKey="name" stroke="#000" tick={{ fontSize: 12, fill: '#000', fontWeight: 'bold' }} />
          <YAxis stroke="#000" tick={{ fontSize: 14, fill: '#000', fontWeight: 'bold' }} />
          <Tooltip contentStyle={{ backgroundColor: "#F5F5DC", border: "2px solid #000", color: "#000", fontSize: '14px', fontWeight: 'bold' }} />
          <Line
            type="monotone"
            dataKey="works"
            stroke="#000"
            strokeWidth={3}
            dot={{ fill: "#000", r: 4 }}
            activeDot={{ r: 6, fill: "#000" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MgnregaChart;
