import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
// TODO: Remove Node.js-specific hooks and replace with Spring Boot API calls
// import { useMutation } from "react-query";
// import { createUser } from "../../utils/api";
import useFavourites from "../../hooks/useFavourites";
import useBookings from "../../hooks/useBookings";

const Layout = () => {
  // TODO: Implement these functionalities using Spring Boot APIs
  useFavourites();
  useBookings();

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        const res = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "http://localhost:8080", // TODO: Update with Spring Boot backend URL
            scope: "openid profile email",
          },
        });

        localStorage.setItem("access_token", res);
        setUserDetails((prev) => ({ ...prev, token: res }));

        // TODO: Replace this with a Spring Boot API call
        // Example:
        // await fetch("http://localhost:8080/api/users", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json", Authorization: `Bearer ${res}` },
        //   body: JSON.stringify({ email: user?.email }),
        // });
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    if (isAuthenticated) {
      getTokenAndRegister();
    }
  }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
