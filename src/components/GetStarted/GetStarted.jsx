import React from "react";
import "./GetStarted.css";

const GetStarted = () => {
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Get started with Homyz</span>
          <span className="secondaryText">
            Subscribe and find super attractive price quotes from us.
            <br />
            Find your residence soon.
          </span>
          {/* TODO: Replace mailto link with a dynamic backend call to handle subscriptions */}
          {/* Example: Send a POST request to your Spring Boot backend */}
          {/* fetch("http://localhost:8080/api/subscribe", { method: "POST", body: JSON.stringify({ email: "user@example.com" }) }) */}
          <button className="button">
            <a href="jaswanthm811@gmail.com">Get Started</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
