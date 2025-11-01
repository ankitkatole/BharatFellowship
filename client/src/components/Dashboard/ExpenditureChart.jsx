import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useMgnregaData } from "../../context/DataContext";

const ExpenditureChart = () => {
  const { data } = useMgnregaData();

  const chartData = useMemo(() => {
    return data.map((d, i) => ({
      name: d.district_name || `District ${i + 1}`,
      totalExp: Number(d.Total_Exp || 0),
    })).sort((a, b) => b.totalExp - a.totalExp).slice(0, 12);
  }, [data]);

  return (
    <div className="w-full h-[450px] bg-beige p-6 rounded-2xl shadow-lg border-2 border-black/20 animate-fadeIn">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <XAxis 
            dataKey="name" 
            stroke="#000" 
            tick={{ fontSize: 11, fill: '#000', fontWeight: 'bold' }} 
            interval={0} 
            angle={-45} 
            textAnchor="end"
            height={120}
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


