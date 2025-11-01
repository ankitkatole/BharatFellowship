import React, { createContext, useContext, useState } from 'react';

// 1. Define all our simple, bilingual text here
const translations = {
  en: {
    language: "English",
    // Filters
    state: "State",
    financialYear: "Financial Year",
    district: "District (optional)",
    rowsPerPage: "Rows per page",
    prev: "Prev",
    next: "Next",
    showing: "Showing",
    of: "of",
    // Sarathi
    askSarathi: "Ask Sarathi",
    insightsFromSarathi: "Insights from Sarathi",
    selectLanguage: "Select Language",
    generateInsights: "Generate Insights",
    analyzing: "Analyzing...",
    sarathiThinking: "Sarathi is thinking...",
    sarathiPrompt: "Please select a language and click 'Generate Insights' to get an AI-powered summary from Sarathi.",
    // Glossary
    wordMeanings: "Word Meanings",
    glossaryTitle: "Word Meanings (Glossary)",
    // NEW: Color Legend
    colorLegendTitle: "Color Meanings",
    colorGreen: "Green: Good performance",
    colorYellow: "Yellow: Average performance",
    colorRed: "Red: Poor performance",
    // KPI Cards
    worksCompleted: "Works Completed",
    familiesGotWork: "Families Who Got Work",
    totalMoneySpent: "Total Money Spent",
    workdaysForWomen: "Total Workdays for Women",
    // Table Headers
    districtHeader: "District",
    salariesOnTime: "Salaries Paid on Time (%)",
    // Glossary Definitions
    def_worksCompleted: "Total number of MGNREGA projects finished in this area.",
    def_familiesGotWork: "Total number of families (households) that received work under the scheme.",
    def_totalMoneySpent: "Total amount (in Lakhs) spent on all works and wages.",
    def_workdaysForWomen: "Total number of days worked by women.",
    def_salariesOnTime: "Percentage of salary payments made within 15 days of work."
  },
  mr: {
    language: "मराठी",
    // Filters
    state: "राज्य",
    financialYear: "आर्थिक वर्ष",
    district: "जिल्हा (ऐच्छिक)",
    rowsPerPage: "प्रति पृष्ठ पंक्ती",
    prev: "मागे",
    next: "पुढे",
    showing: "दाखवत आहे",
    of: "पैकी",
    // Sarathi
    askSarathi: "सारथीला विचारा",
    insightsFromSarathi: "सारथीकडून अंतर्दृष्टी",
    selectLanguage: "भाषा निवडा",
    generateInsights: "अंतर्दृष्टी मिळवा",
    analyzing: "विश्लेषण करत आहे...",
    sarathiThinking: "सारथी विचार करत आहे...",
    sarathiPrompt: "कृपया भाषा निवडा आणि सारथीकडून AI-शक्तीवर आधारित सारांश मिळवण्यासाठी 'अंतर्दृष्टी मिळवा' वर क्लिक करा.",
    // Glossary
    wordMeanings: "शब्दांचे अर्थ",
    glossaryTitle: "शब्दांचे अर्थ (शब्दकोष)",
    // NEW: Color Legend
    colorLegendTitle: "रंगांचे अर्थ",
    colorGreen: "हिरवा: चांगली कामगिरी",
    colorYellow: "पिवळा: सरासरी कामगिरी",
    colorRed: "लाल: खराब कामगिरी",
    // KPI Cards
    worksCompleted: "पूर्ण झालेली कामे",
    familiesGotWork: "काम मिळालेली कुटुंबे",
    totalMoneySpent: "एकूण खर्च झालेला पैसा",
    workdaysForWomen: "महिलांचे एकूण कामाचे दिवस",
    // Table Headers
    districtHeader: "जिल्हा",
    salariesOnTime: "वेळेवर दिलेला पगार (%)",
    // Glossary Definitions
    def_worksCompleted: "या भागात पूर्ण झालेल्या MGNREGA प्रकल्पांची एकूण संख्या.",
    def_familiesGotWork: "योजनेअंतर्गत काम मिळालेल्या कुटुंबांची (घरांची) एकूण संख्या.",
    def_totalMoneySpent: "सर्व कामांवर आणि मजुरीवर खर्च केलेली एकूण रक्कम (लाखांमध्ये).",
    def_workdaysForWomen: "महिलांनी काम केलेल्या दिवसांची एकूण संख्या.",
    def_salariesOnTime: "काम केल्यापासून १५ दिवसांच्या आत दिलेल्या पगाराची टक्केवारी."
  }
};

// 2. Create the context
const LanguageContext = createContext();

// 3. Create the provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // 'en' or 'mr'

  const toggleLanguage = () => {
    setLanguage(lang => (lang === 'en' ? 'mr' : 'en'));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; // <-- Added missing closing brace

// 4. Create a custom hook to use the context
export const useLanguage = () => useContext(LanguageContext); // <-- Moved export outside

