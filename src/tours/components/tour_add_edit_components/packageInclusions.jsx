import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor } from "@mantine/tiptap";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import { Title } from "@mantine/core";
import {
  IconEdit,
  IconPencil,
  IconPlus,
  IconSignRight,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

const PackageInclusions = ({name, value, onChange}) => {
  //Inclusion editor
  //  const inclusionEditor = useEditor({
  //         extensions: [StarterKit, Underline, Strike],
  //         content: "",
  //       });

  const [packageInclusion, setPackageInclusion] = useState("");
  const [packageInclusions, setPackageInclusions] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [idxToUpdate, setIdxToUpdate] = useState(null);

  const handleAddPackageInclusions = () => {
    if (packageInclusion.trim().length === 0) return;
    if (isEdit) {
      setPackageInclusions((prev) => {
        let updated = [...prev];

        updated[idxToUpdate] = packageInclusion;

          onChange({target: {name, value: updated}})
        return updated;
      });
      setIsEdit(false);
    } else {
      setPackageInclusions((prev) => {
        const updated = [...prev, packageInclusion];

        onChange({target: {name, value: updated}});

        return updated;
      });
    }
    setPackageInclusion("");
  };

  const handleEdit = (item, idx) => {
    setIsEdit(true);
    setIdxToUpdate(idx);
    setPackageInclusion(item);
  };

  const handleDelete = (idx) => {
    setPackageInclusions((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="pl-2 w-[1030px] space-y-4">
      <Title
        order={4}
        mt={20}
        mb={10}
        ta="left"
        c="dark"
        className="flex flex-col"
      >
        Package Inclusions
        <span className=" border border-b-1 w-[162px]"></span>
      </Title>

      {/* <RichTextEditor
                  editor={inclusionEditor}
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
                </RichTextEditor> */}

      <div className="border border-gray-400 w-[900px] flex items-center justify-center space-x-2 rounded  ">
        <input
          type="text"
          value={packageInclusion}
          onChange={(e) => setPackageInclusion(e.target.value)}
          className=" outline-0 p-2 w-[90%] rounded"
          placeholder="Eg: 3 meals a day (breakfast, lunch, dinner)"
        />
        {isEdit ? (
          <button
            onClick={handleAddPackageInclusions}
            className="flex w-[82px] cursor-pointer hover:bg-blue-600 items-center justify-center bg-blue-500 p-2 text-white rounded-r"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleAddPackageInclusions}
            className="flex w-[82px] cursor-pointer hover:bg-blue-600 items-center justify-center bg-blue-500 p-2 text-white rounded-r"
          >
            <IconPlus size={20} />
            Add
          </button>
        )}
      </div>

      <ul className="pl-5 pt-2 pb-2 w-[900px] rounded space-y-2 border border-gray-400">
        {packageInclusions.length > 0 ? packageInclusions?.map((item, idx) => (
          <>
            <li className="flex items-center justify-between pr-2">
              ✅{item}
              <div className="space-x-6">
                <button
                  className="text-blue-400 hover:text-blue-500 cursor-pointer"
                  onClick={() => handleEdit(item, idx)}
                >
                  <IconPencil size={18} />
                </button>
                <button
                  className="text-red-400 hover:text-red-500 cursor-pointer"
                  onClick={() => handleDelete(idx)}
                >
                  <IconTrash size={18} />
                </button>
              </div>
            </li>
            <hr className="text-gray-400 w-[95%] " />
          </>
        )) : <span>No Package Inclusions yet.</span>}
      </ul>
    </div>
  );
};

export default PackageInclusions;
