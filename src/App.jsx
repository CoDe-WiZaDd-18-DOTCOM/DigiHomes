import React from "react";
import Header from "./components/head/head";
import Hero from "./components/hero/hero";
import Companies from "./components/companies/companies";
import Residencies from "./components/residencies/residencies";
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
