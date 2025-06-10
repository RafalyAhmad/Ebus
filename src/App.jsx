import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navbar from "./components/Fragments/Navbar";
import Footer from "./components/Fragments/Footer";
import { SearchProvider } from "./contexts/SearchProvider";

const App = () => {
  return (
    <div>
      <SearchProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </SearchProvider>
    </div>
  );
};

export default App;
