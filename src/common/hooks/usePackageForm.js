import useAuth from "../../auth/components/use_auth";
import PackageRepository from "../package/package_repository";
import { useNotification } from "./useNotification";
export function usePackageForm({
  isEditPackage,
  setIsEditPackage,
  idToUpdate,
  setPackageList,
  showLoading,
  hideLoading,
  imagePreview,
  FieldValidator,
  image,
  isMapImage,
  mapImage,
  mapImagePreview,
  setMapImage,
  packageType,
  setModalOpen,
  setImage
}) {
  const { getToken } = useAuth();
    const notify = useNotification();
  

  const packageRepository = new PackageRepository(getToken);

  const handleSubmit = async (formData) => {
    console.log({formData})
    const result = FieldValidator(formData, image, mapImage);

    if (!result.valid) {
      notify({
        type: "error",
        message: result.message,
      });
      return;
    }
    showLoading();
    const fD = new FormData();
    if (mapImage) {
      fD.append("mapFile", mapImage);
    }
    if (image) {
      fD.append("file", image);
    }

    // Normalize hotel data to array of _id strings
    const hotelIds = formData.hotels.map((hotel) =>
      typeof hotel === "object" && hotel !== null ? hotel._id : hotel
    );

    // Normalize destinations data to array of _id strings
    const destinationIds = formData.destinationIds.map((d) => d._id);
    // Normalize travel theme data to array of _id strings
    const travelThemeIds = formData.travelThemeIds.map((d) => d._id);

    fD.append(
      "destinationIds",
      JSON.stringify(isEditPackage ? destinationIds : formData.destinationIds)
    );
    fD.append(
      "travelThemeIds",
      JSON.stringify(isEditPackage ? travelThemeIds : formData.travelThemeIds)
    );
    fD.append("title", formData.title);
    fD.append("duration", parseInt(formData.duration));
    fD.append("overview", formData.overview);
    fD.append("tripHighlights", JSON.stringify(formData.tripHighlights));
    fD.append("itinerary", JSON.stringify(formData.itinerary));
    fD.append("inclusions", formData.inclusions);
    fD.append("exclusions", formData.exclusions);
    fD.append("packageRate", JSON.stringify(formData.packageRate));
    fD.append("discountInPercentage", parseInt(formData.discountInPercentage));
    fD.append("packageType", packageType)

    try {
      let responseMessage;
      let response;
      let mapImageUrl;
      if (isEditPackage) {
        const imageUrl =
          image instanceof Blob ? URL.createObjectURL(image) : null;
        if(isMapImage) {
          mapImageUrl =
          mapImage instanceof Blob ? URL.createObjectURL(mapImage) : null;
        }
        response = await packageRepository.updatePackage(
          fD,
          idToUpdate
        );
        setPackageList((prev) =>
          prev.map((item) =>
            item._id === idToUpdate
              ? {
                  ...item,
                  destinationIds: formData.destinationIds,
                  travelThemeIds: formData.travelThemeIds,
                  title: formData.title,
                  duration: formData.duration,
                  overview: formData.overview,
                  tripHighlights: formData.tripHighlights,
                  itinerary: formData.itinerary,
                  inclusions: formData.inclusions,
                  exclusions: formData.exclusions,
                  packageRate: formData.packageRate,
                  discountInPercentage: formData.discountInPercentage,
                  image: imageUrl || imagePreview || item.image,
                  mapImage: mapImageUrl || mapImagePreview || item.mapImage,
                  packageType
                }
              : item
          )
        );
      } else {
        response = await packageRepository.createPackage(fD);
        setPackageList((prev) => [...prev, response.data]);
      }

      responseMessage = response.message;
      setModalOpen(false);
      setImage(null);
      isMapImage && setMapImage(null);
      setIsEditPackage(false);
      notify({
        type: "success",
        message: responseMessage,
      });
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Something went wrong. Please try again.",
      });
    } finally {
      hideLoading();
    }
  };

  return { handleSubmit };
}
