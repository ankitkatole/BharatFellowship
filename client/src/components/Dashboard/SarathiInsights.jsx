import React, { useState, useCallback } from 'react';
import { useMgnregaData } from '../../context/DataContext';

async function fetchWithBackoff(url, options, retries = 3, delay = 1000) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        await new Promise(res => setTimeout(res, delay));
        return fetchWithBackoff(url, options, retries - 1, delay * 2);
      }
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    if (retries > 0) {
      await new Promise(res => setTimeout(res, delay));
      return fetchWithBackoff(url, options, retries - 1, delay * 2);
    }
    console.error("Fetch failed after multiple retries:", error);
    throw error;
  }
}

const SarathiInsights = ({ isOpen, onClose }) => {
  const { data, filters, total } = useMgnregaData();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [insights, setInsights] = useState("");
  const [language, setLanguage] = useState('English');

  const generateInsights = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setInsights("");

    const systemPrompt = `
      You are an expert data analyst named "Sarathi," specializing in Indian government schemes.
      Your task is to analyze a JSON dataset from the MGNREGA scheme and provide a brief, insightful summary.
      Focus on key findings, top performers, and potential areas of concern.
      Be concise (3-5 bullet points) and use simple, clear language.
      All monetary values are in Lakhs.

      IMPORTANT: You MUST generate the entire response in the following language: ${language}
      Make bullets pretty unicode bullets like "•".
      NO markdown stars.
      Use language: ${language}
    `;

    const dataSummary = data.map(d => ({
      district: d.district_name,
      completed_works: d.Number_of_Completed_Works,
      total_expenditure_lakhs: d.Total_Exp,
      households_worked: d.Total_Households_Worked,
      payment_within_15d_percent: d.percentage_payments_gererated_within_15_days,
    }));

    const userQuery = `
      State: ${filters.state}
      Year: ${filters.year}
      District: ${filters.district || "multiple"}
      Summary JSON:
      ${JSON.stringify(dataSummary)}
    `;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
    };

    try {
      const result = await fetchWithBackoff(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const candidate = result.candidates?.[0];
      if (candidate && candidate.content?.parts?.[0]?.text) {
        setInsights(candidate.content.parts[0].text);
      } else {
        setError("Could not parse AI response.");
      }
    } catch {
      setError("Failed to generate insights.");
    } finally {
      setIsLoading(false);
    }

  }, [data, filters, total, language]);

  if (!isOpen) return null;

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'हिन्दी' },
    { value: 'Marathi', label: 'मराठी' }
  ];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="relative bg-beige w-full max-w-2xl p-6 rounded-2xl shadow-lg border-2 border-black/20 m-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-black hover:text-black/70 text-2xl font-bold">
          &times;
        </button>

        <h2 className="text-3xl font-momo text-black mb-4">Insights from Sarathi</h2>

        <div className="mb-4">
          <h3 className="text-lg font-momo text-black mb-2">Select Language:</h3>
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            {languageOptions.map(lang => (
              <label 
                key={lang.value} 
                className={`flex-1 p-3 rounded-lg border-2 text-center cursor-pointer transition-colors ${language === lang.value ? 'bg-black text-beige border-black' : 'bg-white/50 border-black/20 hover:bg-white/80'}`}
              >
                <input type="radio" name="language" value={lang.value} checked={language === lang.value} onChange={(e) => setLanguage(e.target.value)} className="sr-only" />
                <span className="text-lg">{lang.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button onClick={generateInsights} disabled={isLoading} className="w-full px-6 py-3 rounded-lg bg-black text-beige border-2 border-black text-base font-bold hover:bg-black/80 transition-colors disabled:opacity-50 font-momo">
          {isLoading ? "Analyzing..." : "Generate Insights"}
        </button>

        <div className="mt-4 min-h-[200px] max-h-[50vh] overflow-y-auto p-4 bg-white/50 rounded-lg border-2 border-black/10">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-12 h-12 border-4 border-black/20 border-t-black rounded-full animate-spin" />
              <p className="text-black text-sm mt-2">Sarathi is thinking...</p>
            </div>
          )}
          {error && <div className="text-red-600 p-4">{error}</div>}
          {insights && !isLoading && (
            <pre className="text-black whitespace-pre-wrap">
              {insights}
            </pre>
          )}
          {!insights && !isLoading && !error && (
            <p className="text-black/60 text-center p-4">
              Please select a language and click "Generate Insights"
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SarathiInsights;
