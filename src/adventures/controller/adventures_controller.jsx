import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import { useNotification } from "../../common/hooks/useNotification";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import AdventureRepository from "../repository/adventure_repository";
import AdventuresView from "../view/adventures_view";
import AdventuresAddEditForm from "../view/adventure_add_edit_form";
const AdventuresController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [adventureList, setAdventureList] = useState([]);
  const [adventure, setAdventure] = useState({});
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditAdventure, setIsEditAdventure] = useState(false);
  const [isDeleteAdventure, setIsDeleteAdventure] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const adventureRepository = new AdventureRepository(getToken);

  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        showLoading();
        const adventureResponse =
          await adventureRepository.getAdventurePackages();
        setAdventureList(adventureResponse.data || []);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Failed to fetch Tours.",
        });
      } finally {
        hideLoading();
      }
    };
    fetchAdventures();
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
    setAdventure({});
    setImage(null);
  };

  const handleEditButtonClick = (item) => {
    setIsEditAdventure(true);
    setAdventure(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
    setImage(null);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteAdventure(true);
    setIdToDelete(item?._id);
  };

  const handleDeleteButtonClick = async () => {
    const previousList = adventureList;
    setAdventureList((prev) => prev.filter((p) => p._id !== idToDelete));
    try {
      showLoading();
      await AdventureRepository.deleteAdventurePackage(idToDelete);
      notify({ type: "success", message: "Adventure deleted successfully." });
    } catch (err) {
      setAdventureList(previousList);
      notify({
        type: "error",
        message: err.message ?? "Failed to delete Adventure package.",
      });
    } finally {
      hideLoading();
      setIsDeleteAdventure(false);
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
      if (isEditAdventure) {
        response = await AdventureRepository.updateAdventurePackage(
          fD,
          idToUpdate
        );
        setAdventureList((prev) =>
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
        response = await AdventureRepository.createAdventurePackage(fD);
        setAdventureList((prev) => [...prev, response.data]);
      }
      responseMessage = response.message;
      setModalOpen(false);
      setImage(null);
      setIsEditAdventure(false);
      setAdventure({});
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
    setAdventure(item);
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
      <AdventuresView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditAdventure(false);
          setAdventure({});
          // setImage(null);
        }}
        columns={columns}
        Adventures={AdventureList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
        // destinationList={destinationList}
      />
      {/* <AdventureViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        tour={tour}
        destinationList={destinationList}
      /> */}
      <AdventuresAddEditForm
        opened={modalOpen}
        onClose={() => {
          setIsEditAdventure(false);
          setModalOpen(false);
          setAdventure({});
          setImage(null);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isEditAdventure={isEditAdventure}
        adventure={adventure}
        // destinationList={destinationList}
      />
      <CustomDialogModal
        opened={isDeleteAdventure}
        onClose={() => setIsDeleteAdventure(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default AdventuresController;
