import { useState, useEffect } from "react";
import { Modal, TextInput, Button, Group } from "@mantine/core";

const MenuAddEditModel = ({
  opened,
  onClose,
  isEditMenu,
  handleSubmit,
  menu,
  modalTitle,
  parentId
}) => {
  const [formData, setFormData] = useState("");

  useEffect(() => {
    if (opened) {
      setFormData("");
    }
    if(modalTitle == "Sub Menu Item") {
      setFormData(prev => ({...prev, type: "sub-menu", parent: parentId}))
    } 
    else if(modalTitle == "Link Item"){
      setFormData(prev => ({...prev, type: "link", parent: parentId}))
    }
  }, [opened]);

  const handleChange = e => {
    setFormData(prev=> ({...prev, [e.target.name] : e.target.value}))
  }
  console.log({formData})
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={"Add " + modalTitle ?? ""}
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
        type="text"
        name="title"
        value={formData?.title}
        onChange={handleChange}
        placeholder={`Enter Title Here....`}
      ></TextInput>
      <TextInput
        label="Order"
        type="number"
        name="order"
        value={formData?.duration}
        onChange={handleChange}
        placeholder={`Enter Order Here....`}
      ></TextInput>

      <Group position="right" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => handleSubmit(formData)}>Submit</Button>
      </Group>
    </Modal>
  );
};

export default MenuAddEditModel;
