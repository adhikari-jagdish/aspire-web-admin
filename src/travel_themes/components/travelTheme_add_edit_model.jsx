import { useState, useEffect } from "react";
import { Modal, TextInput, Button, Group, Textarea } from "@mantine/core";
import ImagePicker from "../../common/common_view_components/image_picker";

const TravelThemeAddEditModel = ({
  opened,
  onClose,
  isEditTravelTheme,
  handleSubmit,
  handleImageSelect,
  travelTheme,
}) => {
  const [formData, setFormData] = useState({
    title: "",
  });
  useEffect(() => {
    if (isEditTravelTheme && opened) {
      setFormData({
        title: travelTheme.title || "",
      });
    } else {
      // Clear form for new travel theme
      setFormData({
        title: "",
      });
    }
  }, [isEditTravelTheme, opened]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditTravelTheme ? "Edit Travel Theme" : "Add Travel Theme"}
      centered
       styles={{
        title: {
          fontSize: "34px",
          color: "#0890cf",
          fontWeight: 700
        },
        content: {
          scrollbarWidth: "none", 
        },
      }}
    >
      <TextInput
        label="Title"
        placeholder="Enter Travel Theme"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <ImagePicker
        onImageSelect={handleImageSelect}
        defaultImage={travelTheme.image}
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

export default TravelThemeAddEditModel;
