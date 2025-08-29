import { useEffect, useState } from "react";
import ImagePicker from "./image_picker";
import { Title } from "@mantine/core";

const ImageDiscount = ({
  imageName,
  mapImageName,
  discountName,
  discountValue,
  onChange,
  onImageChange,
  onMapImageChange,
  isEditTour,
  isEditTrekking,
  isEditPeakClimbing,
  isEditExpedition,
  defaultImage,
  isTrek,
  isExpedition,
  isPeakClimbing,
  defaultMapImage
}) => {
  const [image, setImage] = useState(null);
  const [mapImage, setMapImage] = useState(null);
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    if (
      isEditTour ||
      isEditTrekking ||
      isEditExpedition ||
      isEditPeakClimbing
    ) {
      setDiscount(discountValue);
    }
  }, [isEditTour, isEditTrekking, discountValue]);
  const handleImageSelect = (image) => {
    setImage(image);
    onChange({ target: { name: imageName, value: image } });
    onImageChange?.(image);
  };

   const handleMapImageSelect = (mapImage) => {
    setMapImage(mapImage);
    onChange({ target: { name: mapImageName, value: mapImage } });
    onMapImageChange?.(mapImage);
  };

  const handleDiscountChange = (value) => {
    setDiscount(value);
    onChange({ target: { name: discountName, value } });
  };
  return (
    <div className="flex gap-60 ">
      <div className="flex flex-col items-start  ">
        <Title order={4} ta="left" c="dark" className="flex flex-col">
          Image
        </Title>
        <div>
          <ImagePicker
            onImageSelect={handleImageSelect}
            onMapImageSelect={handleMapImageSelect}
            defaultImage={defaultImage}
            isTrek={isTrek}
            isExpedition={isExpedition}
            isPeakClimbing={isPeakClimbing}
            defaultMapImage={defaultMapImage}
          />
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
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,2}$/.test(value)) {
              handleDiscountChange(e.target.value);
            }
          }}
          className=" border border-gray-400 rounded p-2 h-[50px] outline-0 w-[120px] no-spinner"
          min={1}
          onWheel={(e) => e.target.blur()}
        />
      </div>
     {/* {(isTrek || isExpedition || isPeakClimbing) &&  <div className="flex flex-col justify-center  ">
        <Title order={4} ta="" c="dark" className="flex flex-col">
          Map
        </Title>
        <div>
          <ImagePicker
            onMapImageSelect={handleMapImageSelect}
            defaultMapImage={defaultMapImage}
            isTrek={isTrek}
            isExpedition={isExpedition}
            isPeakClimbing={isPeakClimbing}
          />
        </div>
      </div>} */}
    </div>
  );
};

export default ImageDiscount;
