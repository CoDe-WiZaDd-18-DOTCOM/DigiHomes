import React, { useEffect } from "react";
import { Avatar, Menu } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { SignUpRoute } from "../../services/apis_routes";

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0(); // Removed user2

  useEffect(() => {
    const registerUser = async () => {
      if (user && isAuthenticated) {
        const token = await getAccessTokenSilently();
        if (localStorage.getItem("userRegistered")) return;
        
        try {
          const response = await axios.post(
            SignUpRoute,
            {
              email: user.email,
              AuthOid: user.sub,
              name: user.name,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 300) {
            console.log("User is null (MULTIPLE_CHOICES)");
          } else if (response.status === 201) {
            console.log("User Created:", response.data);
            localStorage.setItem("userRegistered", "true");
          }
        } catch (error) {
          console.error("Error registering user:", error);
        }
      }
    };

    registerUser();
  }, [isAuthenticated, user, getAccessTokenSilently]); 

  return (
    <Menu>
      <Menu.Target>
        <Avatar
          src={user?.picture}
          alt="User Image"
          size={40}
          style={{
            borderRadius: "50%",
            cursor: "pointer",
            width: "40px",
            height: "40px",
            overflow: "hidden",
          }}
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate("/favourites", { replace: true })}>
          Favourites
        </Menu.Item>

        <Menu.Item onClick={() => navigate("/bookings", { replace: true })}>
          Bookings
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
