import CommonDiscountBatchComponent from "./common_discount_batch_component";

const CommonImageBannerComponent = ({
  tour,
  expedition,
  trekking,
  peakClimbing,
  topRatedPackage,
}) => {

    const getImage = () => {
        return (
    tour?.image?.trim() ||
      expedition?.image?.trim() ||
      peakClimbing?.image?.trim() ||
      trekking?.image?.trim()  ||
      topRatedPackage?.image?.trim() ||
      ""
        )
    }
const image = getImage();
const isValidImage = image !== "";

const primaryData = tour || expedition || trekking || peakClimbing || topRatedPackage;
  return (
    <div className="w-full relative h-[40vh] rounded-md overflow-hidden bg-gray-400">
      {isValidImage ? (
        <img
          src={image}
          alt="Banner"
          className="w-full h-full object-cover"

        />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-3xl font-semibold">
          BANNER IMAGE HERE
        </div>
      )}
      {/*Renders The Discount Batch Shown on the top right */}
      <CommonDiscountBatchComponent
        discountInPercentage={primaryData?.discountInPercentage}
      />
    </div>
  );
};

export default CommonImageBannerComponent;
