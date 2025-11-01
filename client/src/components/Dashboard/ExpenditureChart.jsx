import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useMgnregaData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext"; // Import language hook

const ExpenditureChart = () => {
  const { data } = useMgnregaData();
  const { t } = useLanguage(); // Get translation function

  const chartData = useMemo(() => {
    return data.map((d, i) => ({
      name: d.district_name || `District ${i + 1}`,
      totalExp: Number(d.Total_Exp || 0),
    })).sort((a, b) => b.totalExp - a.totalExp).slice(0, 12); // Get top 12
  }, [data]);

  return (
    <div className="w-full h-[450px] bg-beige p-6 rounded-2xl shadow-lg border-2 border-black/20 animate-fadeIn">
      {/* --- ADDED TITLE --- */}
      <h3 className="text-xl font-momo text-black text-center mb-4">
        {t('chartTitleExpenditure')}
      </h3>
      {/* --- END TITLE --- */}
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 85 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <XAxis 
            dataKey="name" 
            stroke="#000" 
            tick={{ fontSize: 11, fill: '#000', fontWeight: 'bold' }} 
            interval={0} 
            angle={-45} 
            textAnchor="end"
            height={100}
            dy={10}
          />
          <YAxis stroke="#000" tick={{ fontSize: 14, fill: '#000', fontWeight: 'bold' }} />
          <Tooltip contentStyle={{ backgroundColor: "#F5F5DC", border: "2px solid #000", color: "#000", fontSize: '14px', fontWeight: 'bold' }} />
          <Bar dataKey="totalExp" fill="#000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenditureChart;
