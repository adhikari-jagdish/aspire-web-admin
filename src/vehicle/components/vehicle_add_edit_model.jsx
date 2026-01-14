import { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Group,
  Title,
} from "@mantine/core";
import ImagePicker from "../../common/common_view_components/image_picker";

const VehicleAddEditModal = ({
  opened,
  onClose,
  isEditVehicle,
  handleSubmit,
  handleImageSelect,
  vehicle,
  imagePreview,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceFrom: "",
  });

  useEffect(() => {
    if (isEditVehicle && opened) {
      setFormData({
        title: vehicle.title || "",
        description: vehicle.description || "",
        priceFrom: vehicle.priceFrom || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priceFrom: "",
      });
    }
  }, [isEditVehicle, opened]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "priceFrom" ? Number(value) : value,
    }));
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditVehicle ? "Edit Vehicle" : "Add Vehicle"}
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
      <TextInput
        label="Title"
        placeholder="Enter vehicle title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <TextInput
        label="Price From"
        placeholder="Enter starting price"
        name="priceFrom"
        value={formData.priceFrom}
        type="number"
        min={0}
        onChange={handleChange}
        required
        mt="md"
      />

      <Textarea
        label="Description"
        placeholder="Enter vehicle description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        autosize
        minRows={4}
        mt="md"
      />

      <ImagePicker
        onImageSelect={handleImageSelect}
        defaultImage={isEditVehicle && (vehicle?.image || imagePreview)}
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

export default VehicleAddEditModal;
