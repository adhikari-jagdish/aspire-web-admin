import { useState } from "react";
import ImagePicker from "../../../common/common_view_components/image_picker";

const ImageDiscount = () => {
     const [image, setImage] = useState(null);

  const handleImageSelect = (file) => {
    setImage(file);
  };
  return (
    <div className="pl-2 flex gap-20">
            <div className="flex flex-col items-start ">
              <label htmlFor="title" className="text-xl font-bold">
                Image
              </label>
              <div>
                <ImagePicker
                  onImageSelect={handleImageSelect}
                  defaultImage={null}
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 ">
              <label htmlFor="title" className="text-xl font-bold">
                Discount(%)
              </label>
              <input
                type="text"
                className=" border border-gray-400 rounded p-2 h-[50px] outline-0 w-[120px]"
              />
            </div>
          </div>
  )
}

export default ImageDiscount;