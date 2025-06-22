import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import CarouselRepository from "../repository/carousel_repository";
import CarouselsView from "../view/carousels_view";
import CarouselViewModel from "../components/carousel_view_model";
import CarouselAddEditModel from "../components/carousel_add_edit_model";

const CarouselsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [carouselList, setCarouselList] = useState([]);
  const [carousel, setCarousel] = useState({});
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditCarousel, setIsEditCarousel] = useState(false);
  const [isDeleteCarousel, setIsDeleteCarousel] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const carouselRepository = new CarouselRepository(getToken);

  // const SCREEN_PLACE_TYPE = {
  //   HOME: 1,
  //   EVENTS: 2,
  //   DASHBOARD: 3,
  // };

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const carouselsResponse = await carouselRepository.getCarousels();
        setCarouselList(carouselsResponse.data);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Something went wrong. Please try again.",
        });
      }
    };
    fetchCarousels();
  }, []);

  const handleClick = (item) => {
    setModalOpen(true);
  };

  //Function to trigger when edit button is clicked
  const handleEditButtonClick = (item) => {
    setIsEditCarousel(true);
    setCarousel(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteCarousel(true);
    setIdToDelete(item?._id);
  };
  const handleDeleteButtonClick = async () => {
    try {
      showLoading();
      await carouselRepository.deleteCarousel(idToDelete);
      notify({ type: "success", message: "Carousel deleted successfully." });
      setCarouselList((prev) => prev.filter((p) => p._id !== idToDelete));
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Failed to delete carousel.",
      });
    } finally {
      hideLoading();
    }
  };

  ///This is called when user selects an image
  const handleImageSelect = (file) => {
    setImage(file);
  };
  const handleSubmit = async (formData) => {
    showLoading();
    const fD = new FormData();
    fD.append("file", image);
    fD.append("title", formData.title);
    fD.append("description", formData.description);
    fD.append("priority", formData.priority);
    fD.append("screenPlaceType", formData.screenPlaceType);
    try {
      let responseMessage;
      let response;
      if (isEditCarousel) {
        response = await carouselRepository.updateCarousel(fD, idToUpdate);
        setCarouselList((prev) =>
          prev.map((item) =>
            item._id === idToUpdate
              ? {
                  ...item,
                  title: formData.title,
                  description: formData.description,
                  image: image || item.image,
                  priority: formData.priority,
                  screenPlaceType: formData.screenPlaceType || item.screenPlaceType,
                }
              : item
          )
        );
      } else {
        response = await carouselRepository.addCarousel(fD);
        setCarouselList((prev) => [...prev, response.data]);
      }
      responseMessage = response.message;

      setModalOpen(false);
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
    setCarousel(item);
  };

  const columns = [
    { label: "Title", accessor: "title" },
    { label: "Description", accessor: "description" },
    { label: "Image", accessor: "image" },
    { label: "Priority", accessor: "priority" },
    { label: "ScreePlaceType", accessor: "screenPlaceType" },
  ];

  return (
    <>
      <CarouselsView
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        columns={columns}
        carousels={carouselList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />

      <CarouselViewModel
        openedView={openedView}
        onClose={() => {
          setOpenedView(false);
        }}
        carousel={carousel}
      />
      <CarouselAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditCarousel(false);
          setModalOpen(false);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isEditCarousel={isEditCarousel}
        carousel={carousel}
      />

      <CustomDialogModal
        opened={isDeleteCarousel}
        onClose={() => setIsDeleteCarousel(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />

      <LoadingOverlayComponent />
    </>
  );
};

export default CarouselsController;
