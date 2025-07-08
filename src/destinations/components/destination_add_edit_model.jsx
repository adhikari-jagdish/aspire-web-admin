import { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Textarea,
  Title,
} from "@mantine/core";
import ImagePicker from "../../common/common_view_components/image_picker";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const DestinationAddEditModel = ({
  opened,
  onClose,
  isEditDestination,
  handleSubmit,
  handleImageSelect,
  destination,
  imagePreview
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    if (isEditDestination && opened) {
      setFormData({
        title: destination.title || "",
        description: destination.description || "",
      });
    } else {
      // Clear form for new destination
      setFormData({
        title: "",
        description: "",
      });
    }
  }, [isEditDestination, opened]);

 const descriptionEditor = useEditor({
    extensions: [StarterKit, Underline],
    content: formData.description || "",
    onUpdate({ editor }) {
      const html = editor.getHTML();

      setFormData(prev =>({...prev, description: html}))
    },
  });
  useEffect(() => {
    if(descriptionEditor && formData.description !== descriptionEditor.getHTML()){
      descriptionEditor.commands.setContent(formData.description || "", false)
    }
  },[descriptionEditor, formData])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditDestination ? "Edit Destination" : "Add Destination"}
      centered
      size="xl"
      styles={{
         title: {
          fontSize: "34px",
          color: "#0890cf",
          fontWeight: 700
        },
        content: {
          scrollbarWidth: "none",
        }
      }}
    >
      <TextInput
        label="Title"
        placeholder="Enter destination"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <Title
        order={4}
        mt={20}
        mb={10}
        ta="left"
        c="dark"
        className="flex flex-col"
      >
        Description
      </Title>

      <RichTextEditor
        editor={descriptionEditor}
        className="border border-gray-500 rounded"
      >
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
           <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        </RichTextEditor.Toolbar>
        <RichTextEditor.Content className="h-[250px] [&_ul]:list-disc [&_ol]:list-decimal" />
      </RichTextEditor>

      <ImagePicker
        onImageSelect={handleImageSelect}
        defaultImage={isEditDestination && (destination?.image || imagePreview)}
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

export default DestinationAddEditModel;
