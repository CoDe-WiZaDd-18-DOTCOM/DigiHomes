import React from "react";
import Header from "./components/head/head";
import Hero from "./components/hero/hero";
import Companies from "./components/companies/companies";
function App() {
  return (
    <span>
      <div className="main-wrapper">
        <div className="white-gra"></div>
        <Header/>
        <Hero />
      </div>
      <Companies />
    </span>
  );
}

export default App;
