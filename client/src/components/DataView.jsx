import React, { useState } from "react";
import { useMgnregaData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext"; // Import language hook
import FilterControls from "./Dashboard/FilterControls";
import KPICards from "./Dashboard/KPICards";
import ColorLegend from "./Dashboard/ColorLegend"; // <-- IMPORTED THE NEW LEGEND
import MgnregaChart from "./Dashboard/MgnregaChart";
import MgnregaTable from "./Dashboard/MgnregaTable";
import ExpenditureChart from "./Dashboard/ExpenditureChart";
import LoadingOverlay from "./LoadingOverlay";
import SarathiInsights from "./Dashboard/SarathiInsights";
import Glossary from "./Dashboard/Glossary"; // Import Glossary component

// Simple SVG Icon for Glossary/Book
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.234-.124 2.502.124 3.612.421.114.03.114.17 0 .2L8 3.21l-.008.004-.002.001-.002.001-.003.001h-.001a.009.009 0 0 1-.001 0l-.002-.001-.003-.001-.002-.001-.008-.004c-1.11-.297-2.378-.545-3.612-.421C2.154 2.06 1.885 2.458 1 2.828zM1.01 4.14c.882-.37 2.154-.769 3.388-.894 1.234-.124 2.502.124 3.612.421.114.03.114.17 0 .2L8 4.21l-.008.004-.002.001-.002.001-.003.001h-.001a.009.009 0 0 1-.001 0l-.002-.001-.003-.001-.002-.001-.008-.004c-1.11-.297-2.378-.545-3.612-.421C2.154 3.37 1.885 3.77 1.01 4.14zM16 8c0 1.105-1.12 2-2.5 2S11 9.105 11 8s1.12-2 2.5-2 2.5.895 2.5 2zM15 8a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
    <path d="M4 2.5c0-.164.167-.25.277-.161L6.11 3.993c.09.07.09.21 0 .28L4.277 5.66c-.11.09-.277 0-.277-.161V2.5zM3.99 7.09c.882-.37 2.154-.769 3.388-.893 1.234-.124 2.502.124 3.612.421.114.03.114.17 0 .2L8 7.21l-.008.004-.002.001-.002.001-.003.001h-.001a.009.009 0 0 1-.001 0l-.002-.001-.003-.001-.002-.001-.008-.004c-1.11-.297-2.378-.545-3.612-.421C2.154 6.33 1.885 6.73 1.01 7.09zM1.01 9.39c.882-.37 2.154-.769 3.388-.893 1.234-.124 2.502.124 3.612.421.114.03.114.17 0 .2L8 9.51l-.008.004-.002.001-.002.001-.003.001h-.001a.009.009 0 0 1-.001 0l-.002-.001-.003-.001-.002-.001-.008-.004c-1.11-.297-2.378-.545-3.612-.421C2.154 8.63 1.885 9.03 1.01 9.39zM1.01 11.69c.882-.37 2.154-.769 3.388-.893 1.234-.124 2.502.124 3.612.421.114.03.114.17 0 .2L8 11.81l-.008.004-.002.001-.002.001-.003.001h-.001a.009.009 0 0 1-.001 0l-.002-.001-.003-.001-.002-.001-.008-.004c-1.11-.297-2.378-.545-3.612-.421C2.154 10.93 1.885 11.33 1.01 11.69zM1.01 13.99c.882-.37 2.154-.769 3.388-.893 1.234-.124 2.502.124 3.612.421.114.03.114.17 0 .2L8 14.11l-.008.004-.002.001-.002.001-.003.001h-.001a.009.009 0 0 1-.001 0l-.002-.001-.003-.001-.002-.001-.008-.004c-1.11-.297-2.378-.545-3.612-.421C2.154 13.23 1.885 13.63 1.01 13.99zM14 14c0 1.105-1.12 2-2.5 2S9 15.105 9 14s1.12-2 2.5-2 2.5.895 2.5 2zM12.5 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
  </svg>
);

// Simple SVG Icon for AI/Sparkles
const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 0a1 1 0 0 1 1 1v2.069a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1zM4.64 1.64a1 1 0 0 1 1.414 0l1.06 1.06a1 1 0 0 1-1.413 1.414L4.64 3.053a1 1 0 0 1 0-1.414zM1.64 4.64a1 1 0 0 1 0 1.414l1.06 1.06a1 1 0 0 1 1.414-1.413L3.053 4.64a1 1 0 0 1-1.414 0zM0 8a1 1 0 0 1 1-1h2.069a1 1 0 0 1 0 2H1a1 1 0 0 1-1-1zm1.64 3.36a1 1 0 0 1 0-1.414l1.06-1.06a1 1 0 0 1 1.413 1.414L3.053 11.36a1 1 0 0 1-1.414 0zM4.64 14.36a1 1 0 0 1 1.414 0l1.06-1.06a1 1 0 0 1-1.413-1.414L4.64 12.947a1 1 0 0 1 0 1.414zM8 12a1 1 0 0 1 1 1v2.069a1 1 0 0 1-2 0V13a1 1 0 0 1 1-1zm3.36-1.64a1 1 0 0 1 1.414 0l1.06 1.06a1 1 0 0 1-1.414 1.413l-1.06-1.06a1 1 0 0 1 0-1.414zm3-3a1 1 0 0 1 0 1.414l-1.06 1.06a1 1 0 0 1-1.414-1.413l1.06-1.06a1 1 0 0 1 1.414 0zM14.36 4.64a1 1 0 0 1 0-1.414l-1.06-1.06a1 1 0 0 1-1.414 1.414l1.06 1.06a1 1 0 0 1 1.414 0z"/>
  </svg>
);

const DataView = () => {
  const { loading, error } = useMgnregaData();
  const { language, toggleLanguage, t } = useLanguage();
  const [isSarathiOpen, setIsSarathiOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  return (
    <div className="pt-52 sm:pt-32 px-6 sm:px-10 pb-16 bg-beige min-h-screen animate-fadeIn">
        <h2 className="text-3xl text-center m-4 font-lobster sm:text-7xl font-bold text-red-950">
            Explore The Data
          </h2>
      <div className="max-w-7xl mx-auto">
        <FilterControls />

        {/* --- NEW CONTROLS: Language, Glossary, Sarathi --- */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 animate-fadeIn">
          {/* Left-aligned controls (Glossary) */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsGlossaryOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-beige text-black font-bold rounded-lg border-2 border-black/20 shadow hover:bg-black/10 transition-colors"
            >
              <BookIcon />
              {t('wordMeanings')}
            </button>
          </div>

          {/* Right-aligned controls (Language, Sarathi) */}
          <div className="flex gap-2">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-beige text-black font-bold rounded-lg border-2 border-black/20 shadow hover:bg-black/10 transition-colors"
            >
              {language === 'en' ? 'मराठी' : 'English'}
            </button>
            <button
              onClick={() => setIsSarathiOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-beige font-bold rounded-lg shadow-lg hover:bg-black/80 transition-transform hover:scale-105"
            >
              <SparkleIcon />
              {t('askSarathi')}
            </button>
          </div>
        </div>
        {/* --- END NEW CONTROLS --- */}


        {loading && <LoadingOverlay message="Fetching MGNREGA data..." />}
        {error && <p className="text-red-600 mt-6 font-bold">{error}</p>}
        {!loading && !error && (
          <div className="animate-fadeIn">
            <KPICards />
            <ColorLegend /> {/* <-- PLACED THE LEGEND HERE, RIGHT BELOW THE CARDS */}
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

      {/* Render the modal components */}
      <SarathiInsights
        isOpen={isSarathiOpen}
        onClose={() => setIsSarathiOpen(false)}
      />
      <Glossary
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
};

export default DataView;

