import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import { useNotification } from "../../common/hooks/useNotification";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import TourRepository from "../repository/tour_repository";
import ToursView from "../view/tours_view";
import DestinationRepository from "../../destinations/repository/destination_repository";
import ToursViewModel from "../components/tours_view_model";
import ToursAddEditModel from "../components/tour_add_edit_model";
import TravelThemeRepository from "../../travel_themes/repository/travelTheme_repository";
import TripHighlightRepository from "../../trip highlights/repository/tripHighlight_repository";
import { object } from "framer-motion/client";

const ToursController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [tourList, setTourList] = useState([]);
  const [tour, setTour] = useState({});
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditTour, setIsEditTour] = useState(false);
  const [isDeleteTour, setIsDeleteTour] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const tourRepository = new TourRepository(getToken);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        showLoading();
        const tourResponse = await tourRepository.getTourPackages();
        setTourList(tourResponse.data || []);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Failed to fetch Tours.",
        });
      } finally {
        hideLoading();
      }
    };
    fetchTours();
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
    setTour({});
    setImage(null);
  };

  const handleEditButtonClick = (item) => {
    setIsEditTour(true);
    setTour(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
    setImage(null);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteTour(true);
    setIdToDelete(item?._id);
  };

  const handleDeleteButtonClick = async () => {
    const previousList = tourList;
    setTourList((prev) => prev.filter((p) => p._id !== idToDelete));
    try {
      showLoading();
      await tourRepository.deleteTourPackage(idToDelete);
      notify({ type: "success", message: "Tour deleted successfully." });
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
    if(!image){
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
    fD.append("destinationIds", JSON.stringify(formData.destinationIds));
    fD.append("travelThemeIds", JSON.stringify(formData.travelThemeIds));
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
      if (isEditTour) {
        response = await tourRepository.updateTourPackage(fD, idToUpdate);
        setTourList((prev) =>
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
        response = await tourRepository.createTourPackage(fD);
        setTourList((prev) => [...prev, response.data]);
      }

      responseMessage = response.message;
      setModalOpen(false);
      setImage(null);
      setIsEditTour(false);
      setTour({});
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
    setTour(item);
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
      <ToursView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditTour(false);
          setTour({});
          setImage(null);
        }}
        columns={columns}
        tours={tourList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
        destinationList={destinationList}
        travelThemeList={travelThemeList}
      />
      <ToursViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        tour={tour}
      />
      <ToursAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditTour(false);
          setModalOpen(false);
          setTour({});
          setImage(null);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isEditTour={isEditTour}
        tour={tour}
        destinationList={destinationList}
        travelThemeList={travelThemeList}
        imagePreview={isEditTour ? tour?.image : null}
        
      />
      <CustomDialogModal
        opened={isDeleteTour}
        onClose={() => setIsDeleteTour(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default ToursController;
