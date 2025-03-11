import React from "react";
import { TextInput, Box, Textarea, Group, Button, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";

const BasicDetails = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {
  const form = useForm({
    initialValues: {
      title: propertyDetails.title, // Property title
      description: propertyDetails.description, // Property description
      price: propertyDetails.price, // Price of the property
    },
    validate: {
      title: (value) => validateString(value), // Validate title input
      description: (value) => validateString(value), // Validate description input
      price: (value) => (value < 1000 ? "Must be greater than 999 dollars" : null), // Validate price
    },
  });

  const { title, description, price } = form.values;

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, title, description, price }));

      // TODO: Integrate Spring Boot API to save basic property details
      /*
       Example API call using fetch or Axios:
       await axios.post("http://localhost:8080/api/properties/details", {
          title, 
          description, 
          price
       });
      */

      nextStep();
    }
  };

  return (
    <Box maw="50%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Input for Property Title */}
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Property Name"
          {...form.getInputProps("title")}
        />

        {/* Input for Property Description */}
        <Textarea
          placeholder="Description"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />

        {/* Input for Property Price */}
        <NumberInput
          withAsterisk
          label="Price"
          placeholder="1000"
          min={0}
          {...form.getInputProps("price")}
        />

        {/* Navigation Buttons */}
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Next step</Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
