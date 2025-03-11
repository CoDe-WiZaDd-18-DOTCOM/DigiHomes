import { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
// import { checkFavourites, updateFavourites } from "../../utils/common";
// import { toFav } from "../../utils/api";

const Heart = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { favourites, token },
    setUserDetails,
  } = useContext(UserDetailContext);

  useEffect(() => {
    // TODO: Replace this with a backend call to fetch user's favorite listings
    // Example: fetch(`http://localhost:8080/api/favourites/${user?.email}`)
    setHeartColor(favourites.includes(id) ? "#fa3e5f" : "white");
  }, [favourites]);

  const handleLike = async () => {
    if (validateLogin()) {
      try {
        // TODO: Replace this with a Spring Boot API call
        // Example:
        // await fetch(`http://localhost:8080/api/favourites`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        //   body: JSON.stringify({ userEmail: user?.email, propertyId: id }),
        // });

        setUserDetails((prev) => ({
          ...prev,
          favourites: prev.favourites.includes(id)
            ? prev.favourites.filter((favId) => favId !== id)
            : [...prev.favourites, id],
        }));
        setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    }
  };

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
};

export default Heart;
