import React from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import { Button, Group, Select, TextInput } from "@mantine/core";
import useCountries from "../../hooks/useCountries";
import Map from "../Map/Map";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();

  const form = useForm({
    initialValues: {
      country: propertyDetails?.country || "United States", // TODO: Replace with actual country data from the backend
      city: propertyDetails?.city || "New York", // TODO: Replace with city data from the backend
      address: propertyDetails?.address || "123 Main St", // TODO: Replace with address data from the backend
    },

    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });

  const { country, city, address } = form.values;

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      // TODO: Send `country`, `city`, and `address` to the Spring Boot backend
      // Example: Use `fetch` or `axios` to send a POST request to the backend API
      console.log("Saving property location:", { country, city, address });

      // Assuming the backend saves the data successfully, move to the next step
      setPropertyDetails((prev) => ({ ...prev, city, address, country }));
      nextStep();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div
        className="flexCenter"
        style={{
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: "3rem",
          flexDirection: "row",
        }}
      >
        {/* Left side - Form Inputs */}
        <div className="flexColStart" style={{ flex: 1, gap: "1rem" }}>
          {/* TODO: Fetch country list from the Spring Boot backend and replace `getAll()` */}
          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()} // Replace this with actual data from the backend
            {...form.getInputProps("country", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="City"
            {...form.getInputProps("city", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="Address"
            {...form.getInputProps("address", { type: "input" })}
          />
        </div>

        {/* Right side - Map Section */}
        <div style={{ flex: 1 }}>
          {/* TODO: Integrate backend to get latitude & longitude based on city/address */}
          <Map address={address} city={city} country={country} />
        </div>
      </div>

      <Group position="center" mt={"xl"}>
        <Button type="submit">Next Step</Button>
      </Group>
    </form>
  );
};

export default AddLocation;
