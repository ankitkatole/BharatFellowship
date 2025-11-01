import React from "react";
import { useMgnregaData } from "../../context/DataContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const ChartsView = () => {
  const { data } = useMgnregaData();

  const chartData = data.map((d) => ({
    district: d.district_name,
    works: parseInt(d.Number_of_Completed_Works || 0),
    wages: parseFloat(d.Total_Exp || 0)
  }));

  return (
    <div className="chart-container">
      <h2>MGNREGA Works by District</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="district" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="works" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartsView;
