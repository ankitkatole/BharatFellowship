import React from "react";
import { useMgnregaData } from "../../context/DataContext";
import { formatCurrencyLakh, formatNumber, formatPercent } from "../../utils/formatters";

const MgnregaTable = () => {
  const { data, loading, error } = useMgnregaData();

  if (loading) return <p className="text-black mt-6 font-bold">Loading data...</p>;
  if (error) return <p className="text-red-600 mt-6 font-bold">{error}</p>;

  return (
    <div className="overflow-x-auto mt-10 animate-fadeIn">
      <div className="min-w-full rounded-2xl overflow-hidden border-2 border-black/20 bg-beige">
        <table className="min-w-full text-base text-black">
          <thead className="uppercase text-sm">
            <tr>
              <th className="sticky top-[100px] z-20 bg-black text-beige py-4 px-6 text-left shadow-lg font-bold">District</th>
              <th className="sticky top-[100px] z-20 bg-black text-beige py-4 px-6 text-right shadow-lg font-bold">Completed Works</th>
              <th className="sticky top-[100px] z-20 bg-black text-beige py-4 px-6 text-right shadow-lg font-bold">Households Worked</th>
              <th className="sticky top-[100px] z-20 bg-black text-beige py-4 px-6 text-right shadow-lg font-bold">Women Persondays</th>
              <th className="sticky top-[100px] z-20 bg-black text-beige py-4 px-6 text-right shadow-lg font-bold">Total Expenditure</th>
              <th className="sticky top-[100px] z-20 bg-black text-beige py-4 px-6 text-right shadow-lg font-bold">Wage % within 15d</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={`${row.district_code}-${i}`} className="border-t border-black/20 hover:bg-black/5 font-bold">
                <td className="py-4 px-6">{row.district_name}</td>
                <td className="py-4 px-6 text-right">{formatNumber(row.Number_of_Completed_Works)}</td>
                <td className="py-4 px-6 text-right">{formatNumber(row.Total_Households_Worked)}</td>
                <td className="py-4 px-6 text-right">{formatNumber(row.Women_Persondays)}</td>
                <td className="py-4 px-6 text-right">{formatCurrencyLakh(row.Total_Exp)}</td>
                <td className="py-4 px-6 text-right">{formatPercent(row.percentage_payments_gererated_within_15_days)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MgnregaTable;
