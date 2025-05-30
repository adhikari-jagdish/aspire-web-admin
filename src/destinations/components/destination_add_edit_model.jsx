import { useState, useEffect } from "react";
import { Modal, TextInput, Button, Group, Textarea } from "@mantine/core";
import ImagePicker from "../../common/common_view_components/image_picker";

const DestinationAddEditModel = ({
  opened,
  onClose,
  isEditDestination,
  handleSubmit,
  handleImageSelect,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (isEditDestination && opened) {
      setFormData({
        title: isEditDestination.title || "",
        description: isEditDestination.description || "",
      });
    }
  }, [isEditDestination, opened]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditDestination ? "Edit Destination" : "Add Destination"}
      centered
    >
      <TextInput
        label="Title"
        placeholder="Enter destination"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <Textarea
        rows={8}
        label="Description"
        placeholder="Enter Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        mt="md"
      />

      <ImagePicker onImageSelect={handleImageSelect} />

      <Group position="right" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => handleSubmit(formData)}>Submit</Button>
      </Group>
    </Modal>
  );
};

export default DestinationAddEditModel;
