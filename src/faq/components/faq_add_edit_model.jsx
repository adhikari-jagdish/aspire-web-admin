import { useState, useEffect } from "react";
import { Modal, TextInput, Textarea, Button, Group } from "@mantine/core";

const FaqAddEditModel = ({
  opened,
  onClose,
  isEditFaq,
  handleSubmit,
  faqTitle,
  faqData,
}) => {
  const [formData, setFormData] = useState({
    subtitle: "",
    description: "",
  });

  useEffect(() => {
    if (isEditFaq && opened) {
      setFormData({
        subtitle: faqData.subtitle || "",
        description: faqData.description || "",
      });
    } else {
      // Clear form for new FAQ
      setFormData({
        subtitle: "",
        description: "",
      });
    }
  }, [isEditFaq, opened, faqData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditFaq ? "Edit FAQ" : "Add FAQ"}
      centered
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
        label="Sub Title"
        placeholder="Enter subtitle"
        name="subtitle"
        value={formData.subtitle}
        onChange={handleChange}
        required
      />
      <Textarea
        label="Description"
        placeholder="Enter FAQ description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        minRows={3}
      />

      <Group position="right" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => handleSubmit({ ...formData, faqTitle })}>
          Submit
        </Button>
      </Group>
    </Modal>
  );
};

export default FaqAddEditModel;
