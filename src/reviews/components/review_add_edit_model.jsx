import { useState, useEffect } from "react";
import { Modal, TextInput, Button, Group, Title } from "@mantine/core";
import ImagePicker from "../../common/common_view_components/image_picker";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const ReviewAddEditModel = ({
  opened,
  onClose,
  isEditReview,
  handleSubmit,
  handleImageSelect,
  review,
  imagePreview,
}) => {
  const [formData, setFormData] = useState({
    postedBy: "",
    postDate: null,
    description: "",
  });

  useEffect(() => {
    if (isEditReview && opened) {
      setFormData({
        postedBy: review.postedBy || "",
        postDate: review.postDate ? new Date(review.postDate) : null,
        description: review.description || "",
      });
    } else {
      setFormData({
        postedBy: "",
        postDate: null,
        description: "",
      });
    }
  }, [isEditReview, opened]);

  const descriptionEditor = useEditor({
    extensions: [StarterKit, Underline],
    content: formData.description || "",
    onUpdate({ editor }) {
      const html = editor.getHTML();
      setFormData((prev) => ({ ...prev, description: html }));
    },
  });

  useEffect(() => {
    if (
      descriptionEditor &&
      formData.description !== descriptionEditor.getHTML()
    ) {
      descriptionEditor.commands.setContent(formData.description || "", false);
    }
  }, [descriptionEditor, formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditReview ? "Edit Review" : "Add Review"}
      centered
      size="xl"
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
        label="Posted By"
        placeholder="Enter reviewer name"
        name="postedBy"
        value={formData.postedBy}
        onChange={handleChange}
        required
      />

      <Title order={4} mt={20} mb={10} size="sm" ta="left" c="dark">
        Post Date
      </Title>

      <input
        type="date"
        value={
          formData.postDate ? formData.postDate.toISOString().split("T")[0] : ""
        }
        onChange={(e) =>
          setFormData({ ...formData, postDate: new Date(e.target.value) })
        }
        required
        className="p-2 rounded w-full border border-gray-300 focus:border-gray-500"
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
        defaultImage={isEditReview && (review?.imageUrl || imagePreview)}
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

export default ReviewAddEditModel;
