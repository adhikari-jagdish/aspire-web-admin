import { useRef, useState } from "react";
import { Button, Group, Stack, Text } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import { useEffect } from "react";

const ImagePicker = ({ onImageSelect, defaultImage }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const dropzoneRef = useRef(null);
  useEffect(() => {
    if(defaultImage){
      setPreview(defaultImage)
    } else {
      onImageSelect?.(null);
    }
  },[defaultImage]);
  
  const handleDrop = (files) => {
    const file = files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      const maxSizeInMb = 2;
      const maxSizeInBytes = maxSizeInMb * 1024 * 1024;
      
      if(file.size > maxSizeInBytes){
        setError(`Image must be smaller than ${maxSizeInMb} MB.`);
        return;
      }
      
      setError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        onImageSelect?.(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageSelect?.(null);
  }


  return (
    <div className="w-full max-w-md mx-auto p-4">

        <Dropzone
        openRef={ref => (dropzoneRef.current = ref)}
          onDrop={handleDrop}
          accept={["image/*"]}
          maxFiles={1}
          multiple={false}
          className={`border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer ${preview && "hidden"}`}
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
                Select an Image
              </Text>
            </div>
          </Group>
        </Dropzone>
       {preview && 
        <Stack spacing="xs">
          <img
            src={ preview}
            alt="Selected preview"
            className="w-full max-h-64 object-cover border-2 border-dashed border-gray-300 rounded-lg p-6"
          />

          <Group grow position="right">
            <Button size="xs" onClick={() => dropzoneRef.current?.()} w={110} variant="outline">Change Image</Button>
            <Button onClick={handleRemoveImage}  size="xs" w={110} color="red" variant="outline">
              Remove
            </Button>
          </Group>
          
        </Stack>
}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {/* {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Selected preview"
            className="w-full h-64 object-contain rounded-lg"
          />
        </div>
      )} */}
    </div>
  );
};

export default ImagePicker;
