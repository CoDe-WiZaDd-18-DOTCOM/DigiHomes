import { Container, Modal, Stepper } from "@mantine/core";
import React, { useState } from "react";
import AddLocation from "../AddLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails/BasicDetails";
import Facilities from "../Facilities/Facilities";

const AddPropertyModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();

  // Property details state
  const [propertyDetails, setPropertyDetails] = useState({
    title: "", // Property title
    description: "", // Property description
    price: 0, // Price of the property
    country: "", // Country location
    city: "", // City location
    address: "", // Address details
    image: null, // Image file or URL
    facilities: {
      bedrooms: 0, // Number of bedrooms
      parkings: 0, // Parking spaces
      bathrooms: 0, // Number of bathrooms
    },
    userEmail: user?.email, // Storing the logged-in user's email
  });

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          allowNextStepsSelect={false}
        >
          {/* Step 1: Location Details */}
          <Stepper.Step label="Location" description="Address">
            {/* TODO: Integrate Spring Boot API to fetch and store location details */}
            <AddLocation
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>

          {/* Step 2: Upload Images */}
          <Stepper.Step label="Images" description="Upload">
            {/* TODO: Implement API in Spring Boot to handle image uploads */}
            <UploadImage
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>

          {/* Step 3: Basic Property Details */}
          <Stepper.Step label="Basics" description="Details">
            {/* TODO: Connect this step to Spring Boot API to save basic property details */}
            <BasicDetails
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>

          {/* Step 4: Facilities Information */}
          <Stepper.Step label="Facilities" description="Property Features">
            {/* TODO: Ensure facility data is stored in the backend */}
            <Facilities
              prevStep={prevStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              setOpened={setOpened}
              setActiveStep={setActive}
            />
          </Stepper.Step>

          {/* Final Step: Submission */}
          <Stepper.Completed>
            {/* TODO: Implement API call to Spring Boot to finalize and save property details */}
            Property submission completed! Click back to review or close this window.
          </Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
};

export default AddPropertyModal;
