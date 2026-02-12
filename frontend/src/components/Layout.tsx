import React from "react";
import Navbar from "./Navbar";
import "./Layout.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
