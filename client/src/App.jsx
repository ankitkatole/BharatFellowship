import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutSection from "./components/AboutSection";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import DataView from "./components/DataView";
import { MgnregaDataProvider } from "./context/DataContext"; 

const App = () => {
  return (
    <MgnregaDataProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeView />} />
          {/* <Route path="/about" element={<AboutSection />} />   */}
          <Route path="/dashboard/*" element={<DataView />} />
        </Routes>
      </Router>
    </MgnregaDataProvider>
  );
};

export default App;
