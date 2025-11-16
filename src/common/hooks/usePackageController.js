import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import { useNotification } from "../../common/hooks/useNotification";
import DestinationRepository from "../../destinations/repository/destination_repository";
import TripHighlightRepository from "../../trip highlights/repository/tripHighlight_repository";
import { FieldValidator } from "../../common/common_view_components/validations/common_tour_trek_validator";
import PackageRepository from "../../common/package/package_repository";
import { usePackageForm } from "../../common/hooks/usePackageForm";
import TravelThemeRepository from "../../travel_themes/repository/travelTheme_repository";

const usePackageController = ({ packageType, isMapImage, showLoading, hideLoading }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [packageList, setPackageList] = useState([]);
  const [packageItem, setPackageItem] = useState({});
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
   const [mapImage, setMapImage] = useState(null);
  const [mapImagePreview, setMapImagePreview] = useState(null);
  const notify = useNotification();

  const [isEditPackage, setIsEditPackage] = useState(false);
  const [isDeletePackage, setIsDeletePackage] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const packageRepository = new PackageRepository(getToken);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        showLoading();
        const packageResponse = await packageRepository.getPackagesByType(
          packageType
        );
        setPackageList(packageResponse.data || []);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Failed to fetch packages.",
        });
      } finally {
        hideLoading();
      }
    };
    fetchPackages();
  }, []);

  const [destinationList, setDestinationList] = useState([]);
  const destinationRepository = new DestinationRepository(getToken);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const destinationsResponse =
          await destinationRepository.getDestinations();
        setDestinationList(destinationsResponse.data);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Something went wrong. Please try again.",
        });
      }
    };
    fetchDestinations();
  }, []);

  const [travelThemeList, setTravelThemeList] = useState([]);
  const travelThemeRepository = new TravelThemeRepository(getToken);

  useEffect(() => {
    const fetchTravelThemes = async () => {
      try {
        const travelThemesResponse =
          await travelThemeRepository.getTravelThemes();
        setTravelThemeList(travelThemesResponse.data);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Something went wrong. Please try again.",
        });
      }
    };
    fetchTravelThemes();
  }, []);

  //get all trip highlights
  const [tripHighlightList, setTripHighlightList] = useState([]);
  const tripHighlightRepository = new TripHighlightRepository(getToken);

  useEffect(() => {
    const fetchTripHighlights = async () => {
      try {
        const tripHighlightResponse =
          await tripHighlightRepository.getTripHighlights();
        setTripHighlightList(tripHighlightResponse.data);
      } catch (error) {
        notify({
          type: "error",
          message: error.message ?? "Something went wrong. Please try again",
        });
      }
    };
    fetchTripHighlights();
  }, []);
  const handleClick = () => {
    setModalOpen(true);
  };

  const handleEditButtonClick = (item) => {
    setIsEditPackage(true);
    setPackageItem(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeletePackage(true);
    setIdToDelete(item?._id);
  };

  const handleDeleteButtonClick = async () => {
    const previousList = packageList;
    setPackageList((prev) => prev.filter((p) => p._id !== idToDelete));
    try {
      showLoading();
      await packageRepository.deletePackage(idToDelete);
      notify({ type: "success", message: `${packageType} deleted successfully.` });
    } catch (err) {
      setTourList(previousList);
      notify({
        type: "error",
        message: err.message ?? "Failed to delete travel theme.",
      });
    } finally {
      hideLoading();
      setIsDeleteTour(false);
      setIdToDelete(null);
    }
  };

  const handleImageSelect = (file) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      setImage(file);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

   const handleMapImageSelect = (mapImage) => {
   if(isMapImage) {
     if (mapImage) {
      const objectUrl = URL.createObjectURL(mapImage);
      setMapImagePreview(objectUrl);
      setMapImage(mapImage);
    } else {
      setMapImage(null);
      setMapImagePreview(null);
    }
   }
  };

  //avoids memory leaks when switching or removing pages
   useEffect(() => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    if (mapImagePreview) {
      URL.revokeObjectURL(mapImagePreview);
    }
  }, [imagePreview, mapImagePreview]);

  const { handleSubmit } = usePackageForm({
    isEditPackage,
    setIsEditPackage,
    idToUpdate,
    setPackageList,
    showLoading,
    hideLoading,
    imagePreview,
    FieldValidator,
    image,
    setImage,
    packageType,
    setModalOpen,
    isMapImage,
    mapImage,
    setMapImage
  });
  const handleViewButtonClick = (item) => {
    setOpenedView(true);
    setPackageItem(item);
  };

  return {
    modalOpen,
    setModalOpen,
    packageList,
    handleClick,
    handleEditButtonClick,
    onDeleteButtonClick,
    handleViewButtonClick,
    destinationList,
    travelThemeList,
    openedView,
    setOpenedView,
    packageItem,
    setPackageItem,
    setIsEditPackage,
    handleSubmit,
    handleImageSelect,
    isEditPackage,
    isDeletePackage,
    setIsDeletePackage,
    handleDeleteButtonClick,
    imagePreview,
    setMapImage,
    handleMapImageSelect
  };
};

export default usePackageController;
