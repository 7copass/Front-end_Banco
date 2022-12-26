import "./App.css";
import Inputs from "./components/Inputs";
import Table from "./components/Table";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import { useState, useEffect } from "react";

function App() {
 
  return (
    <div>
      <Navbar /> 
      <Inputs />     
      <Footer />
    </div>
  );
}

export default App;




