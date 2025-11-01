import React, { useState } from "react";
import { useMgnregaData } from "../context/DataContext";
import FilterControls from "./Dashboard/FilterControls";
import KPICards from "./Dashboard/KPICards";
import MgnregaChart from "./Dashboard/MgnregaChart";
import MgnregaTable from "./Dashboard/MgnregaTable";
import ExpenditureChart from "./Dashboard/ExpenditureChart";
import LoadingOverlay from "./LoadingOverlay";
import SarathiInsights from "./Dashboard/SarathiInsights"; 

const DataView = () => {
  const { data, loading, error } = useMgnregaData();
  const [isGeminiModalOpen, setIsGeminiModalOpen] = useState(false); 

  return (
    <div className="pt-52 px-6 sm:px-10 pb-16 bg-beige min-h-screen animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <FilterControls />

        <div className="mt-4 flex justify-end animate-fadeIn">
          <button
            onClick={() => setIsGeminiModalOpen(true)}
            className="px-6 py-3 rounded-lg bg-black text-beige border-2 border-black text-base font-bold hover:bg-black/80 transition-colors font-momo shadow-lg"
            title="Ask Sarathi for AI-powered insights"
          >
            Ask Sarathi
          </button>
        </div>

        {loading && <LoadingOverlay message="Fetching MGNREGA data..." />}
        {error && <p className="text-red-600 mt-6 font-bold">{error}</p>}
        {!loading && !error && (
          <div className="animate-fadeIn">
            <KPICards />
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MgnregaChart />
              </div>
              <div className="lg:col-span-1">
                <ExpenditureChart />
              </div>
            </div>
            <MgnregaTable />
          </div>
        )}
      </div>

      <SarathiInsights 
        isOpen={isGeminiModalOpen} 
        onClose={() => setIsGeminiModalOpen(false)} 
      />
    </div>
  );
};

export default DataView;