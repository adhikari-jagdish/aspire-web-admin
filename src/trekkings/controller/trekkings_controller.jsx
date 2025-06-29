import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import { useNotification } from "../../common/hooks/useNotification";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import TourRepository from "../repository/trekking_repository";
import TrekkingsView from "../view/trekkings_view";
import TrekkingsAddEditForm from "../view/trekking_add_edit_form";
import TrekkingRepository from "../repository/trekking_repository";
const TrekkingsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [trekkingList, setTrekkingList] = useState([]);
  const [trekking, setTrekking] = useState({});
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditTrekking, setIsEditTrekking] = useState(false);
  const [isDeleteTrekking, setIsDeleteTrekking] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const trekkingRepository = new TrekkingRepository(getToken);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        showLoading();
        const trekkingResponse = await trekkingRepository.getTrekkingPackages();
        setTrekkingList(trekkingResponse.data || []);
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
      await trekkingRepository.deleteTrekking(idToDelete);
      notify({ type: "success", message: "Trekking deleted successfully." });
    } catch (err) {
      setTrekkingList(previousList);
      notify({
        type: "error",
        message: err.message ?? "Failed to delete trekking package.",
      });
    } finally {
      hideLoading();
      setIsDeleteTrekking(false);
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
      !formData.duration  ||
      !formData.overview ||
      !formData.packageInclusions  ||
      !formData.itinerary  ||
      !formData.inclusions  ||
      !formData.exclusions  ||
      !formData.hotels||
      !formData.packageRate||
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
    fD.append("discount", formData.discount );
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
                  packageRate: formData.packageRate ,
                  discount : formData.discount,
                  image: image || item.image,
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
      <TrekkingsView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditTrekking(false);
          setTour({});
          setImage(null);
        }}
        columns={columns}
        trekkings={trekkingList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
        // destinationList={destinationList}
      />
      {/* <TourViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        tour={tour}
        destinationList={destinationList}
      /> */}
      <TrekkingsAddEditForm 
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
        // destinationList={destinationList}
      />
      <CustomDialogModal
        opened={isDeleteTrekking}
        onClose={() => setIsDeleteTour(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default TrekkingsController;
