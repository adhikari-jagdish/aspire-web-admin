import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import { useNotification } from "../../common/hooks/useNotification";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import PeakClimbingRepository from "../repository/peakClimbing_repository";
import PeakClimbingsView from "../view/peakClimbings_view";
import PeakClimbingsAddEditForm from "../view/peakClimbing_add_edit_form";
const PeakClimbingsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [peakClimbingList, setPeakClimbingList] = useState([]);
  const [peakClimbing, setPeakClimbing] = useState({});
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditPeakClimbing, setIsEditPeakClimbing] = useState(false);
  const [isDeletePeakClimbing, setIsDeletePeakClimbing] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const peakClimbingRepository = new PeakClimbingRepository(getToken);

  useEffect(() => {
    const fetchPeakClimbings = async () => {
      try {
        showLoading();
        const peakClimbingResponse = await peakClimbingRepository.getPeakClimbingPackages();
        setPeakClimbingList(peakClimbingResponse.data || []);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Failed to fetch Tours.",
        });
      } finally {
        hideLoading();
      }
    };
    fetchPeakClimbings();
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
    setPeakClimbing({});
    setImage(null);
  };

  const handleEditButtonClick = (item) => {
    setIsEditPeakClimbing(true);
    setPeakClimbing(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
    setImage(null);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeletePeakClimbing(true);
    setIdToDelete(item?._id);
  };

  const handleDeleteButtonClick = async () => {
    const previousList = peakClimbingList;
    setPeakClimbingList((prev) => prev.filter((p) => p._id !== idToDelete));
    try {
      showLoading();
      await PeakClimbingRepository.deletePeakClimbingPackage(idToDelete);
      notify({ type: "success", message: "Peak Climbing deleted successfully." });
    } catch (err) {
      setPeakClimbingList(previousList);
      notify({
        type: "error",
        message: err.message ?? "Failed to delete Peak Climbing package.",
      });
    } finally {
      hideLoading();
      setIsDeletePeakClimbing(false);
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
      if (isEditPeakClimbing) {
        response = await PeakClimbingRepository.updatePeakClimbingPackage(fD, idToUpdate);
        setPeakClimbingList((prev) =>
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
        response = await PeakClimbingRepository.createPeakClimbingPackage(fD);
        setPeakClimbingList((prev) => [...prev, response.data]);
      }
      responseMessage = response.message;
      setModalOpen(false);
      setImage(null);
      setIsEditPeakClimbing(false);
      setPeakClimbing({});
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
    setPeakClimbing(item);
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
      <PeakClimbingsView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditPeakClimbing(false);
          setPeakClimbing({});
          // setImage(null);
        }}
        columns={columns}
        peakClimbings={peakClimbingList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
        // destinationList={destinationList}
      />
      {/* <peakClimbingViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        tour={tour}
        destinationList={destinationList}
      /> */}
      <PeakClimbingsAddEditForm
        opened={modalOpen}
        onClose={() => {
          setIsEditPeakClimbing(false);
          setModalOpen(false);
          setPeakClimbing({});
          setImage(null);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isEditPeakClimbing={isEditPeakClimbing}
        peakClimbing={peakClimbing}
        // destinationList={destinationList}
      />
      <CustomDialogModal
        opened={isDeletePeakClimbing}
        onClose={() => setIsDeletePeakClimbing(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default PeakClimbingsController;
