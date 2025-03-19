import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Group } from "@mantine/core";
import { cloudinary_name, cloudinary_uploadPresent } from "../../services/Helper";

const UploadImage = ({ propertyDetails, setPropertyDetails, nextStep, prevStep }) => {
  // Dummy image URL (Replace with actual uploaded image URL)
  const [imageURL, setImageURL] = useState(propertyDetails.image || "https://via.placeholder.com/300");

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  // Function to handle the Next button click
  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };

  useEffect(() => {
    if (!window.cloudinary) {
      console.error("Cloudinary script not loaded");
      return;
    }
  
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: cloudinary_name, 
        uploadPreset: cloudinary_uploadPresent,
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURL(result.info.secure_url); // Store the uploaded image URL
        }
      }
    );
  }, []);
  

  return (
    <div className="flexColCenter uploadWrapper">
      {!imageURL || imageURL === "https://via.placeholder.com/300" ? (
        <div className="flexColCenter uploadZone" onClick={() => widgetRef.current?.open()}>
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div className="uploadedImage" onClick={() => widgetRef.current?.open()}>
          <img src={imageURL} alt="Uploaded" />
        </div>
      )}

      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!imageURL || imageURL === "https://via.placeholder.com/300"}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
