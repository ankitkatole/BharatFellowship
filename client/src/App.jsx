import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutSection from "./components/AboutSection";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import DataView from "./components/DataView";
import { MgnregaDataProvider } from "./context/DataContext"; 
import { LanguageProvider } from "./context/LanguageContext"; // Import LanguageProvider

const App = () => {
  return (
    
    <MgnregaDataProvider>
      <LanguageProvider> {/* Wrap the app in the LanguageProvider */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/dashboard/*" element={<DataView />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </MgnregaDataProvider>
  );
};

export default App;
