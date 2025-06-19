import { useState, useEffect } from "react";
import { Modal, TextInput, Button, Group, Textarea } from "@mantine/core";
import ImagePicker from "../../common/common_view_components/image_picker";

const CarouselAddEditModel = ({
  opened,
  onClose,
  isEditCarousel,
  handleSubmit,
  handleImageSelect,
  carousel,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    if (isEditCarousel && opened) {
      setFormData({
        title: carousel.title || "",
        description: carousel.description || "",
        priority: carousel.priority || null,
        screenPlaceType: carousel.screenPlaceType || null,
      });
    } else {
      // Clear form for new destination
      setFormData({
        title: "",
        description: "",
        priority: null,
        screenPlaceType: null,
      });
    }
  }, [isEditCarousel, opened]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditCarousel ? "Edit Carousel" : "Add Carousel"}
      centered
    >
      <TextInput
        label="Title"
        placeholder="Enter Carousel"
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
      
      <TextInput
        label="Priority"
        placeholder="Enter Priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        required
      />

      <TextInput
        label="Screen Place Type"
        placeholder="Enter Screen Place Type"
        name="screenPlaceType"
        value={formData.screenPlaceType}
        onChange={handleChange}
        required
      />

      <ImagePicker
        onImageSelect={handleImageSelect}
        defaultImage={carousel.image}
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

export default CarouselAddEditModel;
