import CommonDiscountBatchComponent from "./common_discount_batch_component";

const CommonImageBannerComponent = ({  tour, expedition, trekking }) => {
    const isValidImage = tour?.image || expedition?.image && tour?.image.trim() !== "" || expedition?.image.trim() !== "" ;
    return (
        <div className="w-full relative h-[40vh] rounded-md overflow-hidden bg-gray-400">
            {isValidImage ? (
                <img
                    src={(tour || trekking ||  expedition).image}
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
                discountInPercentage={(tour || expedition || trekking).discountInPercentage }
              />
        </div>
    );
};

export default CommonImageBannerComponent;
