import React, { useContext, useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { PuffLoader } from "react-spinners";
import "../Properties/Properties.css";
import UserDetailContext from "../../context/UserDetailContext";

const Favourites = () => {
  const [data, setData] = useState([]); // Store all properties
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [filter, setFilter] = useState("");

  const {
    userDetails: { favourites },
  } = useContext(UserDetailContext);

  // Placeholder function for fetching properties from Spring Boot backend
  const fetchProperties = async () => {
    try {
      // TODO: Replace with actual API call to fetch properties from Spring Boot
      // Example: const response = await fetch("/api/properties");
      // const data = await response.json();

      const dummyData = [
        { id: 1, title: "Luxury Apartment", city: "New York", country: "USA" },
        { id: 2, title: "Beach House", city: "Los Angeles", country: "USA" },
        { id: 3, title: "Mountain Cabin", city: "Denver", country: "USA" },
      ];

      setData(dummyData);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader color="#4066ff" aria-label="puff-loading" />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter properties">
          {data
            .filter((property) => favourites.includes(property.id))
            .filter(
              (property) =>
                property.title.toLowerCase().includes(filter.toLowerCase()) ||
                property.city.toLowerCase().includes(filter.toLowerCase()) ||
                property.country.toLowerCase().includes(filter.toLowerCase())
            )
            .map((card, i) => (
              <PropertyCard card={card} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
