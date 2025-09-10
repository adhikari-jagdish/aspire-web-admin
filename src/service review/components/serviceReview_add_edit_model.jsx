import { useState, useEffect } from "react";
import { Modal, TextInput, Button, Group, Textarea } from "@mantine/core";
import FilePicker from "../../common/common_view_components/file_picker";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { NumbersOnlyValidator } from "../../common/hooks/common_inputField_validator";

const initialFormState = {
  icon: null,
  review: "",
  details: "",
};
const ServiceReviewAddEditModel = ({
  opened,
  onClose,
  isEditServiceReview,
  handleSubmit,
  serviceReview,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  useEffect(() => {
    if (isEditServiceReview && opened) {
      setFormData({
        review: serviceReview.review || "",
        details: serviceReview.details || "",
        icon: serviceReview.icon || null,
      });
    } else {
      // Clear form for new ServiceReview
      setFormData(initialFormState);
    }
  }, [isEditServiceReview, opened]);

  const detailsEditor = useEditor({
    extensions: [StarterKit, Underline],
    content: formData.details || "",
    onUpdate({ editor }) {
      const html = editor.getHTML();
      setFormData((prev) => ({ ...prev, details: html }));
    },
  });

  useEffect(() => {
    if (detailsEditor && formData.details !== detailsEditor.getHTML()) {
      detailsEditor.commands.setContent(formData.details || "", false);
    }
  }, [detailsEditor, formData]);

  const handleChange = (e) => {
    NumbersOnlyValidator(e)
    const { name, value } = e.target;
    if (name === "review") {
      const isValid = /^\d{0,1}(\.\d{0,1})?$/.test(value);
      const num = Number(value);
      if (isValid && num <= 5) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFileSelect = (selectedFile) => {
    setFormData((prev) => ({
      ...prev,
      icon: selectedFile,
    }));
  };
  console.log({ formData });
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditServiceReview ? "Edit Service Review" : "Add Service Review"}
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
        label="Review"
        placeholder="Enter Review.."
        name="review"
        className="mb-3"
        inputMode="number"
        // type="number"
        value={formData.review}
        onChange={handleChange}
        required
      />
      <h2 className="font-semibold pb-1">Details</h2>
      <RichTextEditor
        editor={detailsEditor}
        className="border border-gray-500 rounded"
      >
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
          </RichTextEditor.ControlsGroup>

          {/* <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                </RichTextEditor.ControlsGroup>
      
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup> */}
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content className="h-[100px] [&_ul]:list-disc [&_ol]:list-decimal" />
      </RichTextEditor>

      <FilePicker
        icon={serviceReview.icon}
        onFileSelect={handleFileSelect}
        allowSVGOnly={true}
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

export default ServiceReviewAddEditModel;
