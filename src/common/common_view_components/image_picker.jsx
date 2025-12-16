import { useRef, useState } from "react";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import { useEffect } from "react";

const ImagePicker = ({
  onImageSelect,
  onMapImageSelect,
  defaultImage,
  defaultMapImage,
  isTrek,
  isExpedition,
  isPeakClimbing,
}) => {
  const [preview, setPreview] = useState(null);
  const [mapPreview, setMapPreview] = useState(null);
  const [error, setError] = useState(null);

  const dropzoneRef = useRef(null);
  const mapDropzoneRef = useRef(null);

  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
    } else {
      onImageSelect?.(null);
    }

    if (defaultMapImage) {
      setMapPreview(defaultMapImage);
    } else {
      onMapImageSelect?.(null);
    }
  }, [defaultImage, defaultMapImage]);

  const handleDrop = (files) => {
    const file = files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      const maxSizeInMb = 2;
      const maxSizeInBytes = maxSizeInMb * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
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

  const handleDropMap = (files) => {
    const file = files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      const maxSizeInMb = 2;
      const maxSizeInBytes = maxSizeInMb * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        setError(`Map Image must be smaller than ${maxSizeInMb} MB.`);
        return;
      }

      setError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        setMapPreview(e.target.result);
        onMapImageSelect?.(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageSelect?.(null);
  };
  const handleRemoveMapImage = () => {
    setMapPreview(null);
    onMapImageSelect?.(null);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-10">
      {!preview ? (
        <Dropzone
          openRef={dropzoneRef}
          onDrop={handleDrop}
          accept={["image/*"]}
          maxFiles={1}
          loading
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
                Select an Image
              </Text>
            </div>
          </Group>
        </Dropzone>
      ) : (
        <Stack spacing="xs">
          <img
            src={preview}
            alt="Selected preview"
            className="w-full max-h-64 object-cover border-2 border-dashed border-gray-300 rounded-lg p-6"
          />

          <Group grow position="right">
            {/* <Button
              size="xs"
              onClick={() => dropzoneRef.current?.()}
              w={110}
              variant="outline"
            >
              Change Image
            </Button> */}
            <Button
              onClick={handleRemoveImage}
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

      {(isTrek || isExpedition || isPeakClimbing) && (
        <div className="w-full max-w-md mx-auto mt-10 ">
          <Title order={4} ta="left" c="dark" className="pb-5">
            Map
          </Title>
          {!mapPreview ? (
            <Dropzone
              openRef={(ref) => (mapDropzoneRef.current = ref)}
              onDrop={handleDropMap}
              accept={["image/*"]}
              maxFiles={1}
              multiple={false}
              className={`border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer`}
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
                  <Text>Select an Map Image</Text>
                </div>
              </Group>
            </Dropzone>
          ) : (
            <Stack spacing="xs">
              <img
                src={mapPreview}
                alt="Selected Map preview"
                className="w-full max-h-64 object-cover border-2 border-dashed border-gray-300 rounded-lg p-6"
              />

              <Group grow position="right">
                {/* <Button
                  size="xs"
                  onClick={() => mapDropzoneRef.current?.()}
                  w={110}
                  variant="outline"
                >
                  Change Map
                </Button> */}
                <Button
                  onClick={handleRemoveMapImage}
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
        </div>
      )}

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
