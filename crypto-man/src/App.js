import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import Header from "./components/Header";
import React from "react";
import Market from "./components/Market";
import CoinInfo from "./components/CoinInfo";
import Home from "./components/Home";
import Coins from "./components/Coins";
function App() {
  return (
    
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/coin/:id" element={<CoinInfo />} />
        <Route path="/coins" element={<Coins />} />
      </Routes>
    </Router>
    
  );
}


export default App;


