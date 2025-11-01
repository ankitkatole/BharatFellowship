import React from "react";
import { useMgnregaData } from "../context/DataContext";
import FilterControls from "./Dashboard/FilterControls";
import KPICards from "./Dashboard/KPICards";
import MgnregaChart from "./Dashboard/MgnregaChart";
import MgnregaTable from "./Dashboard/MgnregaTable";
import ExpenditureChart from "./Dashboard/ExpenditureChart";
import LoadingOverlay from "./LoadingOverlay";

const DataView = () => {
  const { data, loading, error } = useMgnregaData();

  return (
    <div className="pt-32 px-6 sm:px-10 pb-16 bg-beige min-h-screen animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <FilterControls />
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
    </div>
  );
};

export default DataView;
