
const CommonImageBannerComponent = ({ image }) => {
    const isValidImage = image && image.trim() !== "";

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
        </div>
    );
};

export default CommonImageBannerComponent;
