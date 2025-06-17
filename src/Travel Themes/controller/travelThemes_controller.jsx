import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import TravelThemeRepository from "../repository/travelTheme_repository";
import TravelThemesView from "../view/travelThemes_view";
import TravelThemeViewModel from "../components/travelTheme_view_model";
import TravelThemeAddEditModel from "../components/travelTheme_add_edit_model";

const TravelThemesController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [travelThemeList, setTravelThemeList] = useState([]);
  const [travelTheme, setTravelTheme] = useState({});
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } = useLoadingOverlay();
  const [isEditTravelTheme, setIsEditTravelTheme] = useState(false);
  const [isDeleteTravelTheme, setIsDeleteTravelTheme] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const travelThemeRepository = new TravelThemeRepository(getToken);

  useEffect(() => {
    const fetchTravelThemes = async () => {
      try {
        showLoading();
        const travelThemesResponse = await travelThemeRepository.getTravelThemes();
        setTravelThemeList(travelThemesResponse.data || []);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Failed to fetch travel themes.",
        });
      } finally {
        hideLoading();
      }
    };
    fetchTravelThemes();
  }, []);

  const handleClick = () => {
    setModalOpen(true);
    setTravelTheme({});
    setImage(null);
  };

  const handleEditButtonClick = (item) => {
    setIsEditTravelTheme(true);
    setTravelTheme(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
    setImage(null);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteTravelTheme(true);
    setIdToDelete(item?._id);
  };

  const handleDeleteButtonClick = async () => {
    const previousList = travelThemeList;
    setTravelThemeList((prev) => prev.filter((p) => p._id !== idToDelete));
    try {
      showLoading();
      await travelThemeRepository.deleteTravelTheme(idToDelete);
      notify({ type: "success", message: "Travel theme deleted successfully." });
    } catch (err) {
      setTravelThemeList(previousList);
      notify({
        type: "error",
        message: err.message ?? "Failed to delete travel theme.",
      });
    } finally {
      hideLoading();
      setIsDeleteTravelTheme(false);
      setIdToDelete(null);
    }
  };

  const handleImageSelect = (file) => {
    setImage(file);
  };

  const handleSubmit = async (formData) => {
    if (!formData.title || (!image && !isEditTravelTheme)) {
      notify({
        type: "error",
        message: "Title and image are required.",
      });
      return;
    }
    showLoading();
    const fD = new FormData();
    if (image) {
      fD.append("file", image);
    }
    fD.append("title", formData.title);
    try {
      let responseMessage;
      let response;
      if (isEditTravelTheme) {
        response = await travelThemeRepository.updateTravelTheme(fD, idToUpdate);
        setTravelThemeList((prev) =>
          prev.map((item) =>
            item._id === idToUpdate
              ? { ...item, title: formData.title, image: image || item.image }
              : item
          )
        );
      } else {
        response = await travelThemeRepository.addTravelTheme(fD);
        setTravelThemeList((prev) => [...prev, response.data]);
      }
      responseMessage = response.message;
      setModalOpen(false);
      setImage(null);
      setIsEditTravelTheme(false);
      setTravelTheme({});
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
    setTravelTheme(item);
  };

  const columns = [
    { label: "Title", accessor: "title" },
    { label: "Image", accessor: "image" },
  ];

  return (
    <>
      <TravelThemesView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditTravelTheme(false);
          setTravelTheme({});
          setImage(null);
        }}
        columns={columns}
        travelThemes={travelThemeList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />
      <TravelThemeViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        travelTheme={travelTheme}
      />
      <TravelThemeAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditTravelTheme(false);
          setModalOpen(false);
          setTravelTheme({});
          setImage(null);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isEditTravelTheme={isEditTravelTheme}
        travelTheme={travelTheme}
 год
      />
      <CustomDialogModal
        opened={isDeleteTravelTheme}
        onClose={() => setIsDeleteTravelTheme(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default TravelThemesController;