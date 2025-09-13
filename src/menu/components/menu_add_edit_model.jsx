import { useState, useEffect } from "react";
import { Modal, TextInput, Button, Group, Select } from "@mantine/core";
import { NumbersOnlyValidator } from "../../common/hooks/common_inputField_validator";

const MenuAddEditModel = ({
  opened,
  onClose,
  isEditMenu,
  handleSubmit,
  menu,
  modalTitle,
  parentId,
  menuRoutesList
}) => {
  const [formData, setFormData] = useState("");
  const [isDropDown, setIsDropDown] = useState(true);


  useEffect(() => {
    if (opened) {
      setFormData("");
    }
    if (modalTitle == "Sub Menu Item") {
      setFormData((prev) => ({ ...prev, type: "sub-menu", parent: parentId }));
    } else if (modalTitle == "Link Item") {
      setFormData((prev) => ({ ...prev, type: "link", parent: parentId }));
    }


  }, [opened]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={"Add " + modalTitle}
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
      <div className="flex items-center justify-between">
       {isDropDown ?  <Select
          label="Title"
          placeholder="Select Title"
          data={menuRoutesList}
          value={formData.title}
          onChange={(val) => handleChange({target: {name: "title", value: val}})}
          searchable
          className="w-[75%]"
          name="title"
        /> : 
         <TextInput
        label="Title"
        type="text"
        name="title"
        value={formData?.title}
        onChange={handleChange}
        placeholder={`Enter Title Here....`}
          className="w-[75%]"
      />}
       
      <button className="w-23 rounded mt-5 hover:bg-blue-500 cursor-pointer bg-blue-400 text-white px-2 py-1" onClick={() => setIsDropDown(!isDropDown)}>{isDropDown ? "Text" : "Dropdown"}</button>
      </div>
      <TextInput
        label="Order"
        type="number"
        onKeyDown={NumbersOnlyValidator}
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
