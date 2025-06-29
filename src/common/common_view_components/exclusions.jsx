import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor } from "@mantine/tiptap";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike"; 
import { Title } from "@mantine/core";
import { useEffect } from "react";

const Exclusions = ({name, value, onChange}) => {
    //Inclusion editor
       const exclusionEditor = useEditor({
              extensions: [StarterKit, Underline, Strike],
              content: value || "",
              onUpdate ({editor}) {
                const html = editor.getHTML();
                if(onChange){
                  onChange({
                  target: {name,
                  value: html}
                })
                }
              }
            });

            useEffect(() => {
              if(exclusionEditor && value !== exclusionEditor.getHTML()){
                exclusionEditor.commands.setContent(value || "", false);
              }
            },[exclusionEditor, value])
    
  return (
       <div className="max-w-[1030px]">
                <Title
                  order={4}
                  mt={20}
                  mb={10}
                  ta="left"
                  c="dark"
                  className="flex flex-col"
                >
                  Exclusions
                  <span className=" border border-b-1 w-[80px]"></span>
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
                      <RichTextEditor.Strikethrough />
                    </RichTextEditor.ControlsGroup>
    
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.H1 />
                      <RichTextEditor.H2 />
                      <RichTextEditor.H3 />
                      <RichTextEditor.BulletList />
                      <RichTextEditor.OrderedList />
                    </RichTextEditor.ControlsGroup>
                  </RichTextEditor.Toolbar>
    
                  <RichTextEditor.Content className="h-[200px] [&_ul]:list-disc [&_ol]:list-decimal" />
                </RichTextEditor>
              </div>
  )
}

export default Exclusions;