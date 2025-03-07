import React, { useState, useEffect } from "react";

const useProperties = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Placeholder function for fetching properties from Spring Boot backend (to be implemented)
  const fetchProperties = async () => {
    // TODO: Replace with actual API call to fetch properties from Spring Boot backend
    // Example: Fetch data using Axios or Fetch API
    // const response = await fetch("/api/properties");
    // const data = await response.json();

    const dummyData = [
      { id: 1, name: "Luxury Apartment", location: "New York", price: "$500,000" },
      { id: 2, name: "Beach House", location: "California", price: "$750,000" },
      { id: 3, name: "Mountain Cabin", location: "Colorado", price: "$300,000" },
    ];

    setData(dummyData);
    setIsLoading(false);
  };

  const refetch = () => {
    setIsLoading(true);
    fetchProperties().catch(() => setIsError(true));
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return { data, isError, isLoading, refetch };
};

export default useProperties;
