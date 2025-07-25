import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import { useNotification } from "../../common/hooks/useNotification";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import TrekkingRepository from "../repository/trekking_repository";
import TrekkingsView from "../view/trekkings_view";
import DestinationRepository from "../../destinations/repository/destination_repository";
import TrekkingsViewModel from "../components/trekking_view_model";
import TrekkingsAddEditModel from "../components/trekking_add_edit_model";
import TravelThemeRepository from "../../travel_themes/repository/travelTheme_repository";
import TripHighlightRepository from "../../trip highlights/repository/tripHighlight_repository";

const TrekkingsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [trekkingList, setTrekkingList] = useState([]);
  const [trekking, setTrekking] = useState({});
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditTrekking, setIsEditTrekking] = useState(false);
  const [isDeleteTrekking, setIsDeleteTrekking] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const trekkingRepository = new TrekkingRepository(getToken);

  useEffect(() => {
    const fetchTrekkings = async () => {
      try {
        showLoading();
        const trekkingResponse = await trekkingRepository.getTrekkingPackages();
        setTrekkingList(trekkingResponse.data || []);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Failed to fetch Trekkings.",
        });
      } finally {
        hideLoading();
      }
    };
    fetchTrekkings();
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
    setTrekking({});
    setImage(null);
  };

  const handleEditButtonClick = (item) => {
    setIsEditTrekking(true);
    setTrekking(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
    setImage(null);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteTrekking(true);
    setIdToDelete(item?._id);
  };

  const handleDeleteButtonClick = async () => {
    const previousList = trekkingList;
    setTrekkingList((prev) => prev.filter((p) => p._id !== idToDelete));
    try {
      showLoading();
      await trekkingRepository.deleteTrekkingPackage(idToDelete);
      notify({ type: "success", message: "Trekking deleted successfully." });
    } catch (err) {
      setTrekkingList(previousList);
      notify({
        type: "error",
        message: err.message ?? "Failed to delete travel theme.",
      });
    } finally {
      hideLoading();
      setIsDeleteTrekking(false);
      setIdToDelete(null);
    }
  };

  const handleImageSelect = (image) => {

    if(image){
      const objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl);
      setImage(image);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  //avoids memory leaks when switching or removing pages
  useEffect(() => {
    if(imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  },[imagePreview])

  const handleSubmit = async (formData) => {
    console.log({formData})
    if (
      !formData.destinationIds ||
      !formData.travelThemeIds ||
      !formData.title ||
      !formData.duration ||
      !formData.overview ||
      !formData.tripHighlights ||
      !formData.itinerary ||
      !formData.inclusions ||
      !formData.exclusions ||
      !formData.hotels ||
      !formData.packageRate ||
      !formData.discountInPercentage 
    ) {
      notify({
        type: "error",
        message: "All fields are required.",
      });
      return;
    }
    if(!image && !formData.file){
      notify({
        type: "error",
        message: "Image is required"
      });
      return;
    }
    showLoading();
    const fD = new FormData();
    if (image) {
      fD.append("file", image);
    }

    // Normalize hotel data to array of _id strings
    const hotelIds = formData.hotels.map((hotel) =>
      typeof hotel === "object" && hotel !== null ? hotel._id : hotel
    );

    // // Normalize destinations data to array of _id strings
    const destinationIds = formData.destinationIds.map(d => d._id);

    //  // Normalize travel theme data to array of _id strings
    const travelThemeIds = formData.travelThemeIds.map(d => d._id);

    fD.append("destinationIds", JSON.stringify(destinationIds));
    fD.append("travelThemeIds", JSON.stringify(travelThemeIds));
    fD.append("title", formData.title);
    fD.append("duration", parseInt(formData.duration));
    fD.append("overview", formData.overview);
    fD.append("tripHighlights", JSON.stringify(formData.tripHighlights));
    fD.append("itinerary", JSON.stringify(formData.itinerary));
    fD.append("inclusions", formData.inclusions);
    fD.append("exclusions", formData.exclusions);
    fD.append("hotels", JSON.stringify(hotelIds));
    fD.append("packageRate", JSON.stringify(formData.packageRate));
    fD.append("discountInPercentage", parseInt(formData.discountInPercentage));

    try {
      let responseMessage;
      let response;
      if (isEditTrekking) {
        response = await trekkingRepository.updateTrekkingPackage(fD, idToUpdate);
        setTrekkingList((prev) =>
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
                  hotels: formData.hotels,
                  packageRate: formData.packageRate,
                  discountInPercentage: formData.discountInPercentage,
                  file: imagePreview || item.file,
                }
              : item
          )
        );
      } else {
        response = await trekkingRepository.createTrekkingPackage(fD);
        setTrekkingList((prev) => [...prev, response.data]);
      }

      responseMessage = response.message;
      setModalOpen(false);
      setImage(null);
      setIsEditTrekking(false);
      setTrekking({});
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

  const handleViewButtonClick = (item) => {
    setOpenedView(true);
    setTrekking(item);
  };

  const columns = [
    { label: "Destination", accessor: "destinationIds" },
    { label: "Title", accessor: "title" },
    { label: "Duration", accessor: "duration" },
    { label: "Discount", accessor: "discountInPercentage" },
    { label: "Image", accessor: "image" },
  ];
  return (
    <>
      <TrekkingsView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditTrekking(false);
          setTrekking({});
          setImage(null);
        }}
        columns={columns}
        trekkings={trekkingList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
        destinationList={destinationList}
        travelThemeList={travelThemeList}
      />
      <TrekkingsViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        trekking={trekking}
      />
      <TrekkingsAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditTrekking(false);
          setModalOpen(false);
          setTrekking({});
          setImage(null);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isEditTrekking={isEditTrekking}
        trekking={trekking}
        destinationList={destinationList}
        travelThemeList={travelThemeList}
        imagePreview={isEditTrekking ? trekking?.image : null}
        
      />
      <CustomDialogModal
        opened={isDeleteTrekking}
        onClose={() => setIsDeleteTrekking(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default TrekkingsController;
