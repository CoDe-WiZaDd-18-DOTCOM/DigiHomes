import React, { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useAuth0 } from "@auth0/auth0-react";

const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  // Placeholder function for fetching favourites from Spring Boot backend (to be implemented)
  const fetchFavourites = async () => {
    // TODO: Replace with actual API call to fetch favourite items from Spring Boot backend
    // Example: Fetch data using Axios or Fetch API
    // const response = await fetch(`/api/favourites?email=${user?.email}`);
    // const data = await response.json();

    const dummyData = [
      { id: 1, name: "React Course", category: "Education" },
      { id: 2, name: "MacBook Pro", category: "Electronics" },
      { id: 3, name: "Nike Shoes", category: "Fashion" },
    ];

    return dummyData;
  };

  const refetch = async () => {
    if (user) {
      const favourites = await fetchFavourites();
      setUserDetails((prev) => ({ ...prev, favourites }));
    }
  };

  queryRef.current = refetch;

  useEffect(() => {
    // Trigger refetch when token changes (useful after implementing authentication in Spring Boot)
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);

  return { data: userDetails?.favourites, isLoading: false, isError: false, refetch };
};

export default useFavourites;
