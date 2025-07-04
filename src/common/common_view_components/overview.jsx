import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor } from "@mantine/tiptap";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import { Title } from "@mantine/core";
import { useEffect } from "react";

const Overview = ({parent, name, value, onChange }) => {
  //Overview editor
  const overviewEditor = useEditor({
    extensions: [StarterKit, Underline, Strike],
    content: value || "",
    onUpdate({ editor }) {
      const html = editor.getHTML();
      if(onChange && name){
        onChange({
          target: {
            name, value: html
          }
        })
      }
    },
  });

  // Update editor content when `value` changes from outside
  useEffect(()=> {
    if(overviewEditor && value !== overviewEditor.getHTML()) {
      overviewEditor.commands.setContent(value || "", false);
    }
  },[value, overviewEditor])

  return (
    <div >
      {(parent !== 'about' || parent !== 'contact') && <Title
        order={4}
        mt={20}
        mb={10}
        ta="left"
        c="dark"
        className="flex flex-col"
      >
        Overview
      </Title>}

      <RichTextEditor
        editor={overviewEditor}
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

        <RichTextEditor.Content className="h-[200px] [&_ul]:list-disc [&_ol]:list-decimal" />
      </RichTextEditor>
    </div>
  );
};

export default Overview;
