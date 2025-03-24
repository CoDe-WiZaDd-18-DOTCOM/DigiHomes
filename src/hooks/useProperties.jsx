import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { PropertyRoute } from "../services/apis_routes";
import { property } from "lodash";

const useProperties = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const {getAccessTokenSilently} = useAuth0();

  const fetchProperties = async () => {
      try{
        const token = await getAccessTokenSilently();
        const response = await axios.get(
            PropertyRoute,
            {
              headers:{
                Authorization:`Bearer ${token}`,
              },
            },
          );
          console.log("Properties Fetched:", response.data);
          if (response.status === 200) {
            setData(response.data);
          } else {
            console.warn("Unexpected response:", response.status, response.data);
          }
      } catch (error) {
        console.error("Error fetching property:", error);
      }

    
    setIsLoading(false);
  };

  const refetch = () => {
    setIsLoading(true);
    fetchProperties().catch(() => setIsError(true));
  };

  useEffect(() => {
    fetchProperties();
  }, [getAccessTokenSilently]);

  return { data, isError, isLoading, refetch };
};

export default useProperties;
