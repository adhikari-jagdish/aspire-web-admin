import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import { useNotification } from "../../common/hooks/useNotification";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import TourRepository from "../repository/tour_repository";
import ToursAddEditForm from "../view/tour_add_edit_form";
import ToursView from "../view/tours_view";
import ExpeditionRepository from "../repository/expedition_repository";
import ExpeditionsView from "../view/expeditions_view";
import ExpeditionsAddEditForm from "../view/expedition_add_edit_form";
const ExpeditionsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [expeditionList, setExpeditionList] = useState([]);
  const [expedition, setExpedition] = useState({});
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditExpedition, setIsEditExpedition] = useState(false);
  const [isDeleteExpedition, setIsDeleteExpedition] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const expeditionRepository = new ExpeditionRepository(getToken);

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        showLoading();
        const expeditionResponse = await expeditionRepository.getExpeditionPackages();
        setExpeditionList(expeditionResponse.data || []);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Failed to fetch Tours.",
        });
      } finally {
        hideLoading();
      }
    };
    fetchExpeditions();
  }, []);

  // const [destinationList, setDestinationList] = useState([]);
  // const destinationRepository = new DestinationRepository(getToken);

  // useEffect(() => {
  //   const fetchDestinations = async () => {
  //     try {
  //       const destinationsResponse =
  //         await destinationRepository.getDestinations();
  //       setDestinationList(destinationsResponse.data);
  //     } catch (err) {
  //       notify({
  //         type: "error",
  //         message: err.message ?? "Something went wrong. Please try again.",
  //       });
  //     }
  //   };
  //   fetchDestinations();
  // }, []);

  const handleClick = () => {
    setModalOpen(true);
    setExpedition({});
    setImage(null);
  };

  const handleEditButtonClick = (item) => {
    setIsEditExpedition(true);
    setExpedition(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
    setImage(null);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteExpedition(true);
    setIdToDelete(item?._id);
  };

  const handleDeleteButtonClick = async () => {
    const previousList = expeditionList;
    setExpeditionList((prev) => prev.filter((p) => p._id !== idToDelete));
    try {
      showLoading();
      await expeditionRepository.deleteExpeditionPackage(idToDelete);
      notify({ type: "success", message: "Expedition deleted successfully." });
    } catch (err) {
      setExpeditionList(previousList);
      notify({
        type: "error",
        message: err.message ?? "Failed to delete Expedition package.",
      });
    } finally {
      hideLoading();
      setIsDeleteExpedition(false);
      setIdToDelete(null);
    }
  };

  const handleImageSelect = (file) => {
    setImage(file);
  };

  const handleSubmit = async (formData) => {
    if (
      !formData.destinationId ||
      !formData.travelThemeId ||
      !formData.title ||
      !formData.duration ||
      !formData.overview ||
      !formData.packageInclusions ||
      !formData.itinerary ||
      !formData.inclusions ||
      !formData.exclusions ||
      !formData.hotels ||
      !formData.packageRate ||
      (!formData.discount && !isEditTour)
    ) {
      notify({
        type: "error",
        message: "All fields are required.",
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
      if (isEditExpedition) {
        response = await expeditionRepository.updateExpeditionPackage(fD, idToUpdate);
        setExpeditionList((prev) =>
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
        response = await expeditionRepository.createExpeditionPackage(fD);
        setExpeditionList((prev) => [...prev, response.data]);
      }
      responseMessage = response.message;
      setModalOpen(false);
      setImage(null);
      setIsEditExpedition(false);
      setExpedition({});
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
    setExpedition(item);
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
      <ExpeditionsView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditExpedition(false);
          setExpedition({});
          // setImage(null);
        }}
        columns={columns}
        expeditions={expeditionList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
        // destinationList={destinationList}
      />
      {/* <ExpeditionViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        tour={tour}
        destinationList={destinationList}
      /> */}
      <ExpeditionsAddEditForm
        opened={modalOpen}
        onClose={() => {
          setIsEditExpedition(false);
          setModalOpen(false);
          setExpedition({});
          setImage(null);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isEditExpedition={isEditExpedition}
        expedition={expedition}
        // destinationList={destinationList}
      />
      <CustomDialogModal
        opened={isDeleteExpedition}
        onClose={() => setIsDeleteExpedition(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default ExpeditionsController;
