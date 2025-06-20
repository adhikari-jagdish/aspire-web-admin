// import { useEffect, useState } from "react";
// import useAuth from "../../auth/components/use_auth";
// import { useNotification } from "../../common/hooks/useNotification";
// import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
// import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
// import TravelThemeRepository from "../repository/hotel_repository";
// import TravelThemesView from "../view/hotel_view";
// import TravelThemeViewModel from "../components/hotel_view_model";
// import TravelThemeAddEditModel from "../components/hotel_add_edit_model";

import { useEffect, useState } from "react";
import HotelRepository from "../repository/hotel_repository";
import useAuth from "../../auth/components/use_auth";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import { useNotification } from "../../common/hooks/useNotification";
import HotelsView from "../view/hotel_view";
import HotelViewModel from "../components/hotel_view_model";
import HotelAddEditModel from "../components/hotel_add_edit_model";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import DestinationRepository from "../../destinations/repository/destination_repository";

const HotelsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [hotelList, setHotelList] = useState([]);
  const [hotel, setHotel] = useState({});
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditHotel, setIsEditHotel] = useState(false);
  const [isDeleteHotel, setIsDeleteHotel] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const hotelRepository = new HotelRepository(getToken);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        showLoading();
        const hotelsResponse = await hotelRepository.getHotels();
        setHotelList(hotelsResponse.data || []);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Failed to fetch hotels.",
        });
      } finally {
        hideLoading();
      }
    };
    fetchHotels();
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

  const handleClick = () => {
    setModalOpen(true);
    setHotel({});
    setImage(null);
  };

  const handleEditButtonClick = (item) => {
    setIsEditHotel(true);
    setHotel(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
    setImage(null);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteHotel(true);
    setIdToDelete(item?._id);
  };

  const handleDeleteButtonClick = async () => {
    const previousList = hotelList;
    setHotelList((prev) => prev.filter((p) => p._id !== idToDelete));
    try {
      showLoading();
      await hotelRepository.deleteHotel(idToDelete);
      notify({ type: "success", message: "Hotel deleted successfully." });
    } catch (err) {
      setHotelList(previousList);
      notify({
        type: "error",
        message: err.message ?? "Failed to delete travel theme.",
      });
    } finally {
      hideLoading();
      setIsDeleteHotel(false);
      setIdToDelete(null);
    }
  };

  const handleImageSelect = (file) => {
    setImage(file);
  };

  const handleSubmit = async (formData) => {
    if (
      !formData.destinationId ||
      !formData.title ||
      !formData.city ||
      !formData.rating ||
      !formData.overview ||
      !formData.hotelCategory ||
      (!formData.rate && !isEditHotel)
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
    fD.append("title", formData.title);
    fD.append("city", formData.city);
    fD.append("rating", formData.rating);
    fD.append("overview", formData.overview);
    fD.append("hotelCategory", formData.hotelCategory);
    fD.append("rate", JSON.stringify(formData.rate));
    try {
      let responseMessage;
      let response;
      if (isEditHotel) {
        response = await hotelRepository.updateHotel(fD, idToUpdate);
        setHotelList((prev) =>
          prev.map((item) =>
            item._id === idToUpdate
              ? {
                  ...item,
                  destinationId: formData.destinationId,
                  title: formData.title,
                  city: formData.city,
                  rating: formData.rating,
                  overview: formData.overview,
                  hotelCategory: formData.hotelCategory,
                  rate: formData.rate || item.rate,
                  image: image || item.image,
                }
              : item
          )
        );
      } else {
        response = await hotelRepository.createHotel(fD);
        setHotelList((prev) => [...prev, response.data]);
      }
      responseMessage = response.message;
      setModalOpen(false);
      setImage(null);
      setIsEditHotel(false);
      setHotel({});
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
  // console.log(hotelList)

  const handleViewButtonClick = (item) => {
    setOpenedView(true);
    setHotel(item);
  };

  const columns = [
    { label: "Destination", accessor: "destinationId" },
    { label: "Title", accessor: "title" },
    { label: "City", accessor: "city" },
    { label: "Rating", accessor: "rating" },
    { label: "Overview", accessor: "overview" },
    { label: "HotelCategory", accessor: "hotelCategory" },
    { label: "Rate", accessor: "rate" },
    { label: "Image", accessor: "image" },
  ];

  return (
    <>
      <HotelsView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditHotel(false);
          setHotel({});
          setImage(null);
        }}
        columns={columns}
        hotels={hotelList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
        destinationList={destinationList}
      />
      <HotelViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        hotel={hotel}
        destinationList={destinationList}
      />
      <HotelAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditHotel(false);
          setModalOpen(false);
          setHotel({});
          setImage(null);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isEditHotel={isEditHotel}
        hotel={hotel}
        destinationList={destinationList}
      />
      <CustomDialogModal
        opened={isDeleteHotel}
        onClose={() => setIsDeleteHotel(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default HotelsController;
