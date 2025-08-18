import { useState, useEffect } from "react";
import { Modal, TextInput, Button, Group, Textarea } from "@mantine/core";
import FilePicker from "../../common/common_view_components/file_picker";

const initialFormState = {
    title: "",
    icon: null
}
const FaqTitleAddEditModel = ({
  opened,
  onClose,
  isEditFaqTitle,
  handleSubmit,
  faqTitle,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  useEffect(() => {
    if (isEditFaqTitle && opened) {
      setFormData({
        title: faqTitle.title || "",
        icon: faqTitle.icon || null,
    });
    } else {
      // Clear form for new FaqTitle
      setFormData(initialFormState);
    }
  }, [isEditFaqTitle, opened]);

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
      title={isEditFaqTitle ? "Edit FAQ Title" : "Add FAQ Title"}
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
