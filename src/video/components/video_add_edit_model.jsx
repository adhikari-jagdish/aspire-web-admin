import { useState, useEffect } from "react";
import { Modal, TextInput, Button, Group, Title } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import VideoPicker from "../../common/video_picker";

const VideoAddEditModel = ({
  opened,
  onClose,
  isEditVideo,
  handleSubmit,
  handleVideoSelect,
  video,
  videoPreview,
}) => {
  const [videoUrl, setVideoUrl] = useState("");
  useEffect(() => {
    if (isEditVideo && opened) {
      setVideoUrl(video.videoUrl || "")
    } else {
      // Clear form for new Video
      setVideoUrl("");
    }
  }, [isEditVideo, opened]);

console.log({videoUrl})
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditVideo ? "Edit Video" : "Add Video"}
      centered
      size={"100%"}
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
      <VideoPicker
        onVideoSelect={handleVideoSelect}
        defaultVideo={isEditVideo && (video?.videoUrl || videoPreview)}
      />

      <Group position="right" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => handleSubmit(videoUrl)}>Submit</Button>
      </Group>
    </Modal>
  );
};

export default VideoAddEditModel;
