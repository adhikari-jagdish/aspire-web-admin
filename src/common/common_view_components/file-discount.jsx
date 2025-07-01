import { useState } from "react";
import FilePicker from "./file_picker";

const FileDiscount = ({fileName, discountName, discountValue, onChange, onFileChange}) => {
     const [file, setFile] = useState(null);

  const handleFileSelect = (file) => {
    setFile(file);
    onChange({target: {name: fileName, value: file}});
    onFileChange?.(file);
  };

  const handleDiscountChange = (value) => {
    onChange({target: {name: discountName, value  }})
      
  }
  return (
    <div className="flex gap-20 w-[100%]">
            <div className="flex flex-col items-start ">
              <label htmlFor={fileName} className="text-xl font-bold">
                File
              </label>
              <div>
                <FilePicker
                  onFileSelect={handleFileSelect}
                  defaultFile={null}
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 ">
              <label className="text-xl font-bold">
                Discount(%)
              </label>
              <input
                type="number"
                name={discountName}
                placeholder="In Percentage"
                value={discountValue || ''}
                onChange={e => handleDiscountChange(e.target.value)}
                className=" border border-gray-400 rounded p-2 h-[50px] outline-0 w-[120px]"
                min={1}
              />
            </div>
          </div>
  )
}

export default FileDiscount;