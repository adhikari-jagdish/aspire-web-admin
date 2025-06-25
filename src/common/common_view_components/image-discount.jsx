import { useState } from "react";
import ImagePicker from "./image_picker";

const ImageDiscount = ({imageName, discountName, discountValue, onChange}) => {
     const [image, setImage] = useState(null);

  const handleImageSelect = (file) => {
    const img =  file;

    setImage(img);
    onChange({target: {name: imageName, value: img}})
  };

  const handleDiscountChange = (value) => {
     
    onChange({target: {name: discountName, value  }})
      
  }
  return (
    <div className="flex gap-20">
            <div className="flex flex-col items-start ">
              <label htmlFor={imageName} className="text-xl font-bold">
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

export default ImageDiscount;