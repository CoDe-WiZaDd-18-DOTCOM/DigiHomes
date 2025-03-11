import React from "react";
import Header from "./components/Head/Head";
import Hero from "./components/Hero/Hero";
import Companies from "./components/Companies/Companies";
import Residencies from "./components/Residencies/Residencies";
function App() {
  return (
    <span>
      <div className="main-wrapper">
        <div className="white-gra"></div>
        <Header/>
        <Hero />
      </div>
      <Companies />
      <Residencies />
    </span>
  );
}

export default App;
