import React, { useState } from "react";
import { useMgnregaData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";
import { useTTS } from "../../hooks/useTTS";
import { formatLargeNumber, formatCurrencyLakh } from "../../utils/formatters";

const PlayIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const LoadingSpinner = () => (
  <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const ErrorIcon = () => (
  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const TrafficLight = ({ value, thresholds }) => {
  let color = 'bg-yellow-400'; 
  if (value > thresholds.green) {
    color = 'bg-green-500'; 
  } else if (value < thresholds.red) {
    color = 'bg-red-500'; 
  }
  return <span className={`inline-block w-3 h-3 rounded-full ${color} mr-2`}></span>;
};

const KPICards = () => {
  const { data } = useMgnregaData();
  const { t, language } = useLanguage();
  const { speak, isLoading: isTtsLoading } = useTTS();
  const [ttsErrorKey, setTtsErrorKey] = useState(null); 

  const totalWorks = data.reduce((acc, d) => acc + (parseInt(d.Number_of_Completed_Works) || 0), 0);
  const totalHHWorked = data.reduce((acc, d) => acc + (parseInt(d.Total_Households_Worked) || 0), 0);
  const totalExp = data.reduce((acc, d) => acc + (parseFloat(d.Total_Exp) || 0), 0);
  const totalWomenPersondays = data.reduce((acc, d) => acc + (parseInt(d.Women_Persondays) || 0), 0);

  const metrics = [
    { 
      key: 'worksCompleted', 
      label: t('worksCompleted'), 
      value: formatLargeNumber(totalWorks),
      rawValue: totalWorks,
      thresholds: { green: 10000, red: 1000 } 
    },
    { 
      key: 'familiesGotWork', 
      label: t('familiesGotWork'), 
      value: formatLargeNumber(totalHHWorked),
      rawValue: totalHHWorked,
      thresholds: { green: 50000, red: 5000 } 
    },
    { 
      key: 'totalMoneySpent', 
      label: t('totalMoneySpent'), 
      value: formatCurrencyLakh(totalExp),
      rawValue: totalExp,
      thresholds: { green: 100000, red: 10000 }
    },
    { 
      key: 'workdaysForWomen', 
      label: t('workdaysForWomen'), 
      value: formatLargeNumber(totalWomenPersondays),
      rawValue: totalWomenPersondays,
      thresholds: { green: 1000000, red: 100000 } 
    },
  ];

  const handleSpeak = async (metric) => {
    setTtsErrorKey(null); // Clear previous errors
    try {
      const textToSpeak = `${metric.label}: ${metric.value}`;
      // UPDATED: Use 'mr-IN' for Marathi
      const langCode = language === 'mr' ? 'mr-IN' : 'en-US'; 
      await speak(textToSpeak, langCode); 
    } catch (error) {
      console.error("TTS failed for card:", metric.key, error);
      setTtsErrorKey(metric.key); 
      setTimeout(() => setTtsErrorKey(null), 2000);
    }
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 text-black">
      {metrics.map((m, i) => (
        <div
          key={m.key}
          className="bg-beige rounded-2xl p-6 text-center shadow-lg border-2 border-black/20 animate-fadeIn"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="flex justify-between items-center mb-2">
            <TrafficLight value={m.rawValue} thresholds={m.thresholds} />
            <button 
              onClick={() => handleSpeak(m)} 
              className="text-black hover:text-black/70 disabled:opacity-50"
              title={`Speak this metric`}
              disabled={isTtsLoading} 
            >
             
              {ttsErrorKey === m.key ? (
                <ErrorIcon />
              ) : isTtsLoading ? (
                <LoadingSpinner />
              ) : (
                <PlayIcon />
              )}
            </button>
          </div>
          <h3 className="text-xl font-bold text-black h-12">{m.label}</h3>
          <p className="text-3xl font-bold mt-2 text-black">{m.value}</p>
        </div>
      ))}
    </div>
  );
};

export default KPICards;