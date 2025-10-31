import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutSection from './components/AboutSection';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/about" element={<AboutSection />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
