import { useRef, useState } from "react";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import { useEffect } from "react";

const VideoPicker = ({
  onVideoSelect,
  defaultVideo,
}) => {
  const [videoPreview, setVideoPreview] = useState(null);
  const [error, setError] = useState(null);

  const dropzoneRef = useRef(null);

  useEffect(() => {
    if (defaultVideo) {
      setVideoPreview(defaultVideo);
    } else {
      onVideoSelect?.(null);
    }
  }, [defaultVideo]);

  console.log(defaultVideo)
  const handleDrop = (files) => {
    const file = files[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        setError("Please select an video file");
        return;
      }

      const maxSizeInMb = 40;
      const maxSizeInBytes = maxSizeInMb * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        setError(`Video must be smaller than ${maxSizeInMb} MB.`);
        return;
      }

      setError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideoPreview(e.target.result);
        onVideoSelect?.(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveVideo = () => {
    setVideoPreview(null);
    onVideoSelect?.(null);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-10">
      {!videoPreview ? (
        <Dropzone
          openRef={dropzoneRef}
          onDrop={handleDrop}
          accept={["video/*"]}
          maxFiles={1}
          // loading
          multiple={false}
          className={`border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer 
        }`}
        >
          <Group
            justify="center"
            gap="xl"
            mih={60}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                size={52}
                color="var(--mantine-color-blue-6)"
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={52}
                color="var(--mantine-color-red-6)"
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                size={52}
                color="var(--mantine-color-dimmed)"
                stroke={1.5}
              />
            </Dropzone.Idle>
            <div>
              <Text size="xl" inline>
                Select an Video
              </Text>
            </div>
          </Group>
        </Dropzone>
      ) : (
        <Stack spacing="xs">
          <video
            alt="Selected preview"
            className="w-full max-h-64 object-cover border-2 border-dashed border-gray-300 rounded-lg p-6"
            controls
          >
            <source src={videoPreview} />
          </video>

          <Group grow position="right">
            <Button
              onClick={handleRemoveVideo}
              size="xs"
              w={110}
              color="red"
              variant="outline"
            >
              Remove
            </Button>
          </Group>
        </Stack>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default VideoPicker;
