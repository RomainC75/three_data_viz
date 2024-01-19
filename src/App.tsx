import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/Home.page";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FormularPage from "./pages/Formular.page";
import CryptoPage from "./pages/Crypto.page";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/formular" element={<FormularPage />} />
          <Route path="/crypto" element={<CryptoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
