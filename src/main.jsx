import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Auth0Provider } from "@auth0/auth0-react"; 
import "./index.css";
import App from "./App";
import { Domain , Client } from "./services/Helper";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={Domain} 
    clientId={Client} 
    authorizationParams={{
      redirect_uri: window.location.origin, 
      audience: "https://localhost:5000/user",
    }}
  >
    <MantineProvider>
      <App />
    </MantineProvider>
  </Auth0Provider>
);
