import CommonDiscountBatchComponent from "./common_discount_batch_component";

const CommonMapImageComponent = ({ expedition, trekking, peakClimbing }) => {
  const getMapImage = () => {
    return (
      expedition?.image?.trim() ||
      peakClimbing?.image?.trim() ||
      trekking?.image?.trim() ||
      ""
    );
  };
  const mapImage = getMapImage();
  const isValidMapImage = mapImage !== "";

  return (
    <div className="w-full relative h-[40vh] rounded-md overflow-hidden bg-gray-400">
      {isValidMapImage ? (
        <img src={mapImage} alt="Banner" className="w-full h-full object-cover" />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-3xl font-semibold">
          Map IMAGE HERE
        </div>
      )}
    </div>
  );
};

export default CommonMapImageComponent;
