import { useState } from "react";
import { Group, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload, IconFileText, IconX } from "@tabler/icons-react";

const FilePicker = ({ onFileSelect, allowSVGOnly = false }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [svgContent, setSvgContent] = useState(null);

  const allowedTypes = allowSVGOnly ? ["image/svg+xml"]: ["application/pdf"];

  const handleDrop = (files) => {
    const file = files[0];
    if (file && allowedTypes.includes(file.type)) {
      setFile(file);
      setError(null);
      onFileSelect?.(file);

      if(allowSVGOnly){
        const reader = new FileReader();
        reader.onload= () => {
          setSvgContent(reader.result);
        };
        reader.readAsText(file);
      } else {
        setSvgContent(null);
      }
    } else {
      setError(`Only ${allowSVGOnly ? "SVG" : "PDF"}  files are allowed.`);
    }
  };
  return (
    <div className="w-full max-w-md mx-auto p-4">
      {!file ? (
        <Dropzone
          onDrop={handleDrop}
          accept={allowedTypes}
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
            <Text size="xl">Select a {allowSVGOnly ? "SVG(Icon)" : "PDF"} file</Text>
          </Group>
        </Dropzone>
      ) : (
        <div className="mt-4 flex items-center gap-3 border border-dashed p-4 rounded-lg">
        {allowSVGOnly && svgContent ? (
          <div dangerouslySetInnerHTML={{__html: svgContent}}
          className="w-16 h-16 mx-auto overflow-hidden [&>svg]:w-full [&>svg]:h-full" />
        ): 
          <div className="flex items-center gap-3">
            <IconFileText size={40} className="text-gray-600" />
          <div>
          
            <p className="font-medium">{file.name}</p>
            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
          </div>
          }
        </div>
      )}
      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default FilePicker;
