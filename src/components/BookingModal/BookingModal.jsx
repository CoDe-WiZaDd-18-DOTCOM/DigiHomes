import React, { useContext, useState } from "react";
import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import UserDetailContext from "../../context/UserDetailContext.js";
import { bookVisit } from "../../utils/api.js"; // API function for booking visits
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);

  // Extracting user token and bookings from context
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  // Handle successful booking: Show toast and update state
  const handleBookingSuccess = () => {
    toast.success("You have booked your visit", {
      position: "bottom-right",
    });

    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"), // Format date before storing
        },
      ],
    }));
  };

  // Mutation to handle visit booking
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      // TODO: Replace with actual Spring Boot backend API call
      /*
       Example API call using fetch or Axios:
       await axios.post("http://localhost:8080/api/bookings", {
          date: dayjs(value).format("YYYY-MM-DD"),
          propertyId,
          userEmail: email
       }, {
          headers: { Authorization: `Bearer ${token}` }
       });
      */
      return bookVisit(value, propertyId, email, token);
    },
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select your date of visit"
      centered
    >
      <div className="flexColCenter" style={{ gap: "1rem" }}>
        {/* Date Picker for selecting visit date */}
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />

        {/* Button to trigger booking mutation */}
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Book visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
