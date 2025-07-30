import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor } from "@mantine/tiptap";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import { Button, Title } from "@mantine/core";
import React, { useEffect } from "react";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { IconColorPicker } from "@tabler/icons-react";

const Exclusions = ({ name, value, onChange, isEditTour }) => {
  //const processedValue = Array.isArray(value) ? value.join("") : value || "";

  //Inclusion editor
  const exclusionEditor = useEditor({
    extensions: [StarterKit, Underline, Strike, TextStyle, Color, Image],
    content: value || "",
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange?.({
        target: { name, value: html },
      });
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
        console.log('Image base64:', reader.result);
      exclusionEditor?.chain().focus().setImage({src: reader.result, width: '30', height: '30'}).run();
    }
    reader.readAsDataURL(file);
  } 

  useEffect(() => {
    if (exclusionEditor &&  value !== exclusionEditor.getHTML()) {
      exclusionEditor.commands.setContent(value, false);
    }
  }, [exclusionEditor, value]);

  return (
    <div>
    
      <style>{`
        .ProseMirror img {
          max-width: 300px;
          max-height: 200px;
          width: auto;
          height: auto;
          display: block;
          margin: 10px 0;
        }
      `}</style>

      <Title
        order={4}
        mt={20}
        mb={10}
        ta="left"
        c="dark"
        className="flex flex-col"
      >
        Exclusions
      </Title>

      <RichTextEditor
        editor={exclusionEditor}
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

           <RichTextEditor.ColorPicker
              colors={[
                "#25262b",
                "#868e96",
                "#fa5252",
                "#e64980",
                "#be4bdb",
                "#7950f2",
                "#4c6ef5",
                "#228be6",
                "#15aabf",
                "#12b886",
                "#40c057",
                "#82c91e",
                "#fab005",
                "#fd7e14",
              ]}
            />
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Control interactive={false}>
                <IconColorPicker size={16} stroke={1.5} />
              </RichTextEditor.Control>
              <RichTextEditor.Color color="#F03E3E" />
              <RichTextEditor.Color color="#7048E8" />
              <RichTextEditor.Color color="#1098AD" />
              <RichTextEditor.Color color="#37B24D" />
              <RichTextEditor.Color color="#F59F00" />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.UnsetColor />
            <Button component="label" size="xs" variant="default">
            Upload Image
            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
            </Button>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content  className="h-[200px] [&_ul]:list-disc [&_ol]:list-decimal overflow-y-scroll" />
      </RichTextEditor>
    </div>
  );
};

export default Exclusions;
