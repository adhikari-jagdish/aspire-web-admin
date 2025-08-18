import { useState, useEffect } from "react";
import { Modal, TextInput, Button, Group } from "@mantine/core";

const FaqTitleAddEditModel = ({
  opened,
  onClose,
  isEditFaqTitle,
  handleSubmit,
  faqTitle,
}) => {
  const [formData, setFormData] = useState({
    title: "",
  });

  useEffect(() => {
    if (isEditFaqTitle && opened) {
      setFormData({
        title: faqTitle.title || "",
      });
    } else {
      // Clear form for new FAQ Title
      setFormData({
        title: "",
      });
    }
  }, [isEditFaqTitle, opened]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditFaqTitle ? "Edit FAQ Title" : "Add FAQ Title"}
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
        label="Title"
        placeholder="Enter FAQ Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
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

export default FaqTitleAddEditModel;
