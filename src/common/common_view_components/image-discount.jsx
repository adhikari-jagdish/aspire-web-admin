import { useEffect, useState } from "react";
import ImagePicker from "./image_picker";
import { Title } from "@mantine/core";

const ImageDiscount = ({
  imageName,
  discountName,
  discountValue,
  onChange,
  onImageChange,
  isEditTour,
}) => {
  const [image, setImage] = useState(null);
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    if (isEditTour) {
      setDiscount(discountValue);
    }
  }, [isEditTour, discountValue]);
  const handleImageSelect = (image) => {
    setImage(image);
    onChange({ target: { name: imageName, value: image } });
    onImageChange?.(image);
  };

  const handleDiscountChange = (value) => {
    setDiscount(value);
    console.log(value);
    onChange({ target: { name: discountName, value } });
  };
  return (
    <div className="flex gap-30 ">
      <div className="flex flex-col items-start  ">
        <Title order={4} ta="left" c="dark" className="flex flex-col">
          Image
        </Title>
        <div>
          <ImagePicker onImageSelect={handleImageSelect} defaultimage={null} />
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 ">
        <Title order={4} ta="left" c="dark" className="flex flex-col">
          Discount(%)
        </Title>
        <input
          type="number"
          name={discountName}
          placeholder="10"
          value={discount || ""}
          onChange={(e) => handleDiscountChange(e.target.value)}
          className=" border border-gray-400 rounded p-2 h-[50px] outline-0 w-[120px] no-spinner"
          min={1}
          onWheel={e => e.target.blur()}
        />
      </div>
    </div>
  );
};

export default ImageDiscount;
