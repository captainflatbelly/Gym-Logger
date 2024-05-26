import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Feature1 from "./components/Feature1";
import Feature2 from "./components/Feature2";
import Feature3 from "./components/Feature3";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Navbar />  
      <Hero />
      <Feature1 />
      <Feature2 />
      <Feature3 />
    </div>
  );
}

export default App;
