import CommonDiscountBatchComponent from "./common_discount_batch_component";

const CommonImageBannerComponent = ({  tour }) => {
    const isValidImage = tour?.image && tour?.image.trim() !== "";

    return (
        <div className="w-full relative h-[40vh] rounded-md overflow-hidden bg-gray-400">
            {isValidImage ? (
                <img
                    src={tour?.image}
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
                discountInPercentage={tour.discountInPercentage}
              />
        </div>
    );
};

export default CommonImageBannerComponent;
