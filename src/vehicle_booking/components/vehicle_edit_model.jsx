import { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Select,
  NumberInput,
  Button,
  Group,
  Title,
} from "@mantine/core";

const VehicleBookingEditModal = ({
  opened,
  onClose,
  isEditBooking,
  handleSubmit,
  booking,
  vehicles,
}) => {
  const [formData, setFormData] = useState({
    vehicle: "",
    tripType: "",
    startingLocation: "",
    endingLocation: "",
    duration: 1,
    durationType: "hour",
    pickupDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (isEditBooking && opened) {
      setFormData({
        vehicle: booking.vehicle._id || "",
        tripType: booking.tripType || "",
        startingLocation: booking.startingLocation || "",
        endingLocation: booking.endingLocation || "",
        duration: booking.duration || 1,
        durationType: booking.durationType || "hour",
        pickupDate: booking.pickupDate
          ? new Date(booking.pickupDate).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
    } else {
      setFormData({
        vehicle: "",
        tripType: "",
        startingLocation: "",
        endingLocation: "",
        duration: 1,
        durationType: "hour",
        pickupDate: new Date().toISOString().split("T")[0],
      });
    }
  }, [isEditBooking, opened, booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDurationChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      duration: value,
    }));
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditBooking ? "Edit Booking" : "View Booking"}
      centered
      size="xl"
      styles={{
        title: {
          fontSize: "34px",
          color: "#0890cf",
          fontWeight: 700,
        },
        content: {
          scrollbarWidth: "none",
        },
      }}
    >
      <Select
        label="Vehicle"
        placeholder="Select a vehicle"
        name="vehicle"
        value={formData.vehicle}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, vehicle: value }))
        }
        data={vehicles.map((vehicle) => ({
          value: vehicle._id,
          label: vehicle.title,
        }))}
        required
      />

      <Select
        label="Trip Type"
        placeholder="Select trip type"
        name="tripType"
        value={formData.tripType}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, tripType: value }))
        }
        data={[
          { value: "one-way", label: "One-way" },
          { value: "day-trip", label: "Day-trip" },
          { value: "round-trip", label: "Round-trip" },
        ]}
        required
        mt="md"
      />

      <TextInput
        label="Starting Location"
        placeholder="Enter starting location"
        name="startingLocation"
        value={formData.startingLocation}
        onChange={handleChange}
        required
        mt="md"
      />

      <TextInput
        label="Ending Location"
        placeholder="Enter ending location"
        name="endingLocation"
        value={formData.endingLocation}
        onChange={handleChange}
        required
        mt="md"
      />

      <NumberInput
        label="Duration"
        value={formData.duration}
        onChange={handleDurationChange}
        min={1}
        required
        mt="md"
      />

      <Select
        label="Duration Type"
        placeholder="Select duration type"
        name="durationType"
        value={formData.durationType}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, durationType: value }))
        }
        data={[
          { value: "hour", label: "Hour" },
          { value: "day", label: "Day" },
        ]}
        required
        mt="md"
      />

      <TextInput
        label="Pickup Date"
        type="date"
        name="pickupDate"
        value={formData.pickupDate}
        onChange={handleChange}
        required
        mt="md"
      />

      <Group position="right" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => handleSubmit(formData)}>Submit</Button>
      </Group>
    </Modal>
  );
};

export default VehicleBookingEditModal;
