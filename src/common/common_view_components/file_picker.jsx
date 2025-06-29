import { useState } from "react";
import { Group, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload, IconFileText, IconX } from "@tabler/icons-react";

const FilePicker = ({ onFileSelect }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState(null);

  const handleDrop = (files) => {
    const file = files[0];
    if (file?.type === "application/pdf") {
      setPdfFile(file);
      setError(null);
      onFileSelect?.(file);
    } else {
      setError("Only PDF files are allowed.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {!pdfFile ? (
        <Dropzone
          onDrop={handleDrop}
          accept={["application/pdf"]}
          maxFiles={1}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 cursor-pointer"
        >
          <Group justify="center" gap="xl" mih={60} style={{ pointerEvents: "none" }}>
            <Dropzone.Accept>
              <IconUpload size={52} color="var(--mantine-color-blue-6)" />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={52} color="var(--mantine-color-red-6)" />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconFileText size={52} color="var(--mantine-color-dimmed)" />
            </Dropzone.Idle>
            <Text size="xl">Select a PDF</Text>
          </Group>
        </Dropzone>
      ) : (
        <div className="mt-4 flex items-center gap-3 border border-dashed p-4 rounded-lg">
          <IconFileText size={40} className="text-gray-600" />
          <div>
            <p className="font-medium">{pdfFile.name}</p>
            <p className="text-xs text-gray-500">{(pdfFile.size / 1024).toFixed(1)} KB</p>
          </div>
        </div>
      )}
      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default FilePicker;
