import React from "react";
import { useMgnregaData } from "../../context/DataContext";
import { formatCurrencyLakh, formatNumber } from "../../utils/formatters";

const KPICards = () => {
  const { data } = useMgnregaData();

  const totalWorks = data.reduce((acc, d) => acc + (parseInt(d.Number_of_Completed_Works) || 0), 0);
  const districts = new Set(data.map((d) => d.district_name)).size;
  const totalExp = data.reduce((acc, d) => acc + (parseFloat(d.Total_Exp) || 0), 0);
  const totalHHWorked = data.reduce((acc, d) => acc + (parseInt(d.Total_Households_Worked) || 0), 0);

  const metrics = [
    { label: "Completed Works", value: formatNumber(totalWorks) },
    { label: "Households Worked", value: formatNumber(totalHHWorked) },
    { label: "Total Expenditure", value: formatCurrencyLakh(totalExp) },
    { label: "Districts in Result", value: formatNumber(districts) },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 text-black">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="bg-beige rounded-2xl p-6 text-center shadow-lg border-2 border-black/20 animate-fadeIn"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <h3 className="text-xl font-bold text-black">{m.label}</h3>
          <p className="text-3xl font-bold mt-2 text-black">{m.value}</p>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
