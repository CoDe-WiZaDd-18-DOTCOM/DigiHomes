import React from "react";
import './PropertyCard.css';
import { AiFillHeart } from 'react-icons/ai';
import { truncate } from 'lodash';
import { useNavigate } from "react-router-dom";
import Heart from "../Heart/Heart";

const PropertyCard = ({ card }) => {
  const navigate = useNavigate();

  // Dummy property data (Replace with API response)
  const dummyCard = {
    id: 1,
    image: "https://via.placeholder.com/300", // Example property image
    price: 250000,
    title: "Modern Apartment",
    description: "A beautiful modern apartment in a prime location.",
  };

  return (
    <div className="flexColStart r-card"
      onClick={() => navigate(`../properties/${card?.id || dummyCard.id}`)}
    >
      <Heart id={card?.id || dummyCard.id} />
      <img src={card?.image || dummyCard.image} alt="home" />
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <span>{card?.price || dummyCard.price}</span>
      </span>
      <span className="primaryText">{truncate(card?.title || dummyCard.title, { length: 15 })}</span>
      <span className="secondaryText">{truncate(card?.description || dummyCard.description, { length: 80 })}</span>
    </div>
  );
};

export default PropertyCard;
