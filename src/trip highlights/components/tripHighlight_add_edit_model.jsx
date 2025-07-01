import { useState, useEffect } from "react";
import { Modal, TextInput, Button, Group, Textarea } from "@mantine/core";
import FilePicker from "../../common/common_view_components/file_picker";

const initialFormState = {
    title: "",
    icon: null
}
const TripHighlightAddEditModel = ({
  opened,
  onClose,
  isEditTripHighlight,
  handleSubmit,
  tripHighlight,
}) => {
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    if (isEditTripHighlight && opened) {
      setFormData({
        title: tripHighlight.title || "",
        icon: tripHighlight.icon || null,
    });
    } else {
      // Clear form for new TripHighlight
      setFormData(initialFormState);
    }
  }, [isEditTripHighlight, opened]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (selectedFile) => {
   setFormData(prev => ({
    ...prev,
    icon: selectedFile
   }))
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditTripHighlight ? "Edit Trip Highlight" : "Add Trip Highlight"}
      centered
    >
      <TextInput
        label="Title"
        placeholder="Enter TripHighlight Tag Name"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <FilePicker onFileSelect={handleFileSelect} allowSVGOnly={true} />

      <Group position="right" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => handleSubmit(formData)}>Submit</Button>
      </Group>
    </Modal>
  );
};

export default TripHighlightAddEditModel;
