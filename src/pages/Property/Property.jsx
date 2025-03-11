import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { AiTwotoneCar } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import BookingModal from "../../components/BookingModal/BookingModal";
import Map from "../../components/Map/Map";
import Heart from "../../components/Heart/Heart";
import "./Property.css";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  // Placeholder function to fetch property details from Spring Boot
  const fetchPropertyDetails = async () => {
    try {
      // TODO: Replace with actual API call to Spring Boot backend
      // Example: const response = await fetch(`/api/properties/${id}`);
      // const data = await response.json();

      const dummyProperty = {
        id,
        title: "Luxury Apartment",
        price: 2500,
        facilities: { bathrooms: 2, parkings: 1, bedrooms: 3 },
        description: "A spacious luxury apartment with a great view.",
        address: "123 Main Street",
        city: "New York",
        country: "USA",
        image: "https://via.placeholder.com/600", // Placeholder image
      };

      setData(dummyProperty);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader color="#4066ff" aria-label="puff-loading" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* Like button */}
        <div className="like">
          <Heart id={id} />
        </div>

        {/* Property image */}
        <img src={data.image} alt="Property" />

        <div className="flexCenter property-details">
          {/* Left side */}
          <div className="flexColStart left">
            <div className="flexStart head">
              <span className="primaryText">{data.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data.price}
              </span>
            </div>

            {/* Facilities */}
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data.facilities.bathrooms} Bathrooms</span>
              </div>

              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data.facilities.parkings} Parking</span>
              </div>

              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data.facilities.bedrooms} Room/s</span>
              </div>
            </div>

            {/* Description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data.description}
            </span>

            {/* Address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data.address}, {data.city}, {data.country}
              </span>
            </div>

            {/* Booking button */}
            <button className="button" onClick={() => setModalOpened(true)}>
              Book your visit
            </button>

            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email="user@example.com" // Placeholder email
            />
          </div>

          {/* Right side (Map) */}
          <div className="map">
            <Map address={data.address} city={data.city} country={data.country} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
