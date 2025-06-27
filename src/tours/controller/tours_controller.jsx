import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import { useNotification } from "../../common/hooks/useNotification";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import TourRepository from "../repository/tour_repository";
import ToursAddEditForm from "../view/tour_add_edit_form";
import ToursView from "../view/tours_view";

const ToursController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [tourList, setTourList] = useState([]);
  const [tour, setTour] = useState({});
  const { getToken } = useAuth();
  //const [image, setImage] = useState(null);
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

  const handleClick = () => {
    console.log("Button Clicked");
    setModalOpen(true);
    setTour({});
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
      await tourRepository.deleteTour(idToDelete);
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

  const handleImageSelect = (file) => {
    setImage(file);
  };

  const handleSubmit = async (formData, image, isEditTour, idToUpdate) => {
    const requiredFields = [
      "destinationId",
      "travelThemeId",
      "title",
      "duration",
      "overview",
      "packageInclusions",
      "itinerary",
      "inclusions",
      "exclusions",
      "hotels",
      "packageRate",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (
      missingFields.length > 0 ||
      (!isEditTour && formData.discount == null)
    ) {
      notify({
        type: "error",
        message: `Missing required fields: ${missingFields.join(", ")}${
          !isEditTour && formData.discount == null ? ", discount" : ""
        }`,
      });
      return;
    }

    showLoading();
    const fD = new FormData();
    if (image) {
      fD.append("file", image);
    }
    fD.append("destinationId", formData.destinationId);
    fD.append("travelThemeId", formData.travelThemeId);
    fD.append("title", formData.title);
    fD.append("duration", formData.duration);
    fD.append("overview", formData.overview);
    fD.append("packageInclusions", formData.packageInclusions);
    fD.append("itinerary", formData.itinerary);
    fD.append("inclusions", formData.inclusions);
    fD.append("exclusions", formData.exclusions);
    fD.append("hotels", formData.hotels);
    fD.append("packageRate", formData.packageRate);
    fD.append("discount", formData.discount);
    try {
      let responseMessage;
      let response;
      if (isEditTour) {
        // Verify tour exists in tourList
        if (!idToUpdate) {
          throw new Error("Invalid tour ID for update.");
        }
        response = await tourRepository.updateHotel(fD, idToUpdate);
        setTourList((prev) =>
          prev.map((item) =>
            item._id === idToUpdate
              ? {
                  ...item,
                  destinationId: formData.destinationId,
                  travelThemeId: formData.travelThemeId,
                  title: formData.title,
                  duration: formData.duration,
                  overview: formData.overview,
                  packageInclusions: formData.packageInclusions,
                  itinerary: formData.itinerary,
                  inclusions: formData.inclusions,
                  exclusions: formData.exclusions,
                  hotels: formData.hotels,
                  packageRate: formData.packageRate,
                  discount: formData.discount,
                  image: image || item.image,
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
    { label: "Destination", accessor: "destinationId" },
    { label: "Travel Theme", accessor: "travelThemeId" },
    { label: "Title", accessor: "title" },
    { label: "Duration", accessor: "duration" },
    { label: "Overview", accessor: "overview" },
    { label: "Package Inclusions", accessor: "packageInclusions" },
    { label: "Itinerary", accessor: "itinerary" },
    { label: "Inclusions", accessor: "inclusions" },
    { label: "exclusions", accessor: "exclusions" },
    { label: "Hotels", accessor: "hotels" },
    { label: "Package Rate", accessor: "packageRate" },
    { label: "Discount", accessor: "discount" },
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
        }}
        columns={columns}
        tours={tourList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />

      <ToursAddEditForm
        onOpen={modalOpen}
        onClose={() => {
          setIsEditTour(false);
          setModalOpen(false);
          setTour({});
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isEditTour={isEditTour}
        tour={tour}
        // destinationList={destinationList}
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
