import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Feature1 from "./components/Feature1";
import Feature2 from "./components/Feature2";
import Feature3 from "./components/Feature3";
import Cards from "./components/Cards";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Feature1 />
      <Feature2 />
      <Feature3 />
      <Cards />
      
    </div>
  );
}

export default App;
