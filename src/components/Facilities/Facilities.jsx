import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React from "react";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parkings: propertyDetails.facilities.parkings,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have at least one room" : null),
      bathrooms: (value) =>
        value < 1 ? "Must have at least one bathroom" : null,
    },
  });

  const { bedrooms, parkings, bathrooms } = form.values;
  const { user,isAuthenticated, getAccessTokenSilently } = useAuth0();

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      const updatedDetails = {
        ...propertyDetails,
        facilities: form.values,
      };
      
      setPropertyDetails(updatedDetails);

      if (!isAuthenticated) {
        console.error("User is not authenticated.");
        return;
      }
      console.log(propertyDetails);
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.post(
          `http://localhost:5001/properties/${user.sub}`,
          propertyDetails,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Property Created:", response.data);
        } else {
          console.warn("Unexpected response:", response.status, response.data);
        }
      } catch (error) {
        console.error("Error registering property:", error);
      }

      setOpened(false);
      setActiveStep(0);
    }
  };

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="No of Parkings"
          min={0}
          {...form.getInputProps("parkings")}
        />
        <NumberInput
          withAsterisk
          label="No of Bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green">
            Add Property
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
