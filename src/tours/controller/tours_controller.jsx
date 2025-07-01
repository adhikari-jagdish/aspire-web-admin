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
import TravelThemeRepository from "../../Travel Themes/repository/travelTheme_repository";

const ToursController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [tourList, setTourList] = useState([]);
  const [tour, setTour] = useState({});
  const { getToken } = useAuth();
  const [file, setFile] = useState(null);
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
  const handleClick = () => {
    setModalOpen(true);
    setTour({});
    setFile(null);
  };

  const handleEditButtonClick = (item) => {
    setIsEditTour(true);
    setTour(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
    setFile(null);
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

  const handleFileSelect = (file) => {
    setFile(file);
  };

  const handleSubmit = async (formData) => {
    if (
      !formData.destinationIds ||
      !formData.travelThemeIds ||
      !formData.title ||
      !formData.duration ||
      !formData.overview ||
      !formData.packageInclusions ||
      !formData.itinerary ||
      !formData.inclusions ||
      !formData.exclusions ||
      !formData.hotels ||
      !formData.packageRate ||
      (!formData.discountInPercentage && !isEditTour)
    ) {
      notify({
        type: "error",
        message: "All fields are required.",
      });
      return;
    }
    showLoading();
    const fD = new FormData();
    if (file) {
      fD.append("file", file);
    }
    fD.append("destinationIds", JSON.stringify(formData.destinationIds));
    fD.append("travelThemeIds", JSON.stringify(formData.travelThemeIds));
    fD.append("title", formData.title);
    fD.append("duration", parseInt(formData.duration));
    fD.append("overview", formData.overview);
    fD.append("packageInclusions", JSON.stringify(formData.packageInclusions));
    fD.append("itinerary", JSON.stringify(formData.itinerary));
    fD.append("inclusions", JSON.stringify([formData.inclusions]));
    fD.append("exclusions", JSON.stringify([formData.exclusions]));
    fD.append("hotels", JSON.stringify(formData.hotels));
    fD.append("packageRate", JSON.stringify(formData.packageRate));
    fD.append("discountInPercentage", parseInt(formData.discountInPercentage));
    
    try {
      let responseMessage;
      let response;
      if (isEditTour) {
        response = await tourRepository.updateHotel(fD, idToUpdate);
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
                  packageInclusions: formData.packageInclusions,
                  itinerary: formData.itinerary,
                  inclusions: formData.inclusions,
                  exclusions: formData.exclusions,
                  hotels: formData.hotels,
                  packageRate: formData.packageRate,
                  discountInPercentage: formData.discountInPercentage,
                  file: file || item.file,
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
      setFile(null);
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
    // { label: "Travel Theme", accessor: "travelThemeIds" },
    { label: "Title", accessor: "title" },
    { label: "Duration", accessor: "duration" },
    // { label: "Overview", accessor: "overview" },
    // { label: "Package Inclusions", accessor: "packageInclusions" },
    // { label: "Itinerary", accessor: "itinerary" },
    // { label: "Inclusions", accessor: "inclusions" },
    // { label: "exclusions", accessor: "exclusions" },
    // { label: "Hotels", accessor: "hotels" },
    // { label: "Package Rate", accessor: "packageRate" },
    { label: "Discount", accessor: "discountInPercentage" },
    { label: "File", accessor: "file" },
  ];
  return (
    <>
      <ToursView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditTour(false);
          setTour({});
          setFile(null);
        }}
        columns={columns}
        tours={tourList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
        destinationList={destinationList}
        travelThemeList = {travelThemeList}
      />
      <ToursViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        tour={tour}
        destinationList={destinationList}
        travelThemeList={travelThemeList}
      />
      <ToursAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditTour(false);
          setModalOpen(false);
          setTour({});
          setFile(null);
        }}
        handleSubmit={handleSubmit}
        handleFileSelect={handleFileSelect}
        isEditTour={isEditTour}
        tour={tour}
        destinationList={destinationList}
        travelThemeList={travelThemeList}
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
