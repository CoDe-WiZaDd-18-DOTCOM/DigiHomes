import React, { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useAuth0 } from "@auth0/auth0-react";

const useBookings = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  // Placeholder function for fetching bookings from Spring Boot backend (to be implemented)
  const fetchBookings = async () => {
    // TODO: Replace with actual API call to fetch bookings from Spring Boot backend
    // Example: Fetch data using Axios or Fetch API
    // const response = await fetch(`/api/bookings?email=${user?.email}`);
    // const data = await response.json();
    
    const dummyData = [
      { id: 1, event: "Tech Conference 2025", date: "2025-04-15", status: "Confirmed" },
      { id: 2, event: "AI Workshop", date: "2025-05-20", status: "Pending" },
      { id: 3, event: "Spring Boot Seminar", date: "2025-06-10", status: "Cancelled" }
    ]; 
    
    return dummyData;
  };

  const refetch = async () => {
    if (user) {
      const bookings = await fetchBookings();
      setUserDetails((prev) => ({ ...prev, bookings }));
    }
  };

  queryRef.current = refetch;

  useEffect(() => {
    // Trigger refetch when token changes (useful after implementing authentication in Spring Boot)
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);

  return { data: userDetails?.bookings, isLoading: false, isError: false, refetch };
};

export default useBookings;
