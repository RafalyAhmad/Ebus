import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";
import { SearchProvider } from "../contexts/SearchProvider";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SearchProvider>
        <Navbar />
        <main className="flex-grow pt-4 pb-20">
          <Outlet /> {/* This is where the child routes will render */}
        </main>
        <Footer />
      </SearchProvider>
    </div>
  );
};

export default MainLayout;
