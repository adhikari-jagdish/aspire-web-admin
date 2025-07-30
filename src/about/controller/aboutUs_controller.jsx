import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import AboutUsRepository from "../repository/aboutUs_repository";
import AboutUsView from "../view/aboutUs_view";
import AboutUsViewModel from "../components/aboutUs_view_model";
import AboutUsAddEditModel from "../components/aboutUs_add_edit_model";

const AboutUsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [aboutUsList, setAboutUsList] = useState([]);
  const [aboutUs, setAboutUs] = useState({});
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditAboutUs, setIsEditAboutUs] = useState(false);
  const [isDeleteAboutUs, setIsDeleteAboutUs] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const aboutUsRepository = new AboutUsRepository(getToken);

  useEffect(() => {
    const fetchAllAboutUs = async () => {
      try {
        showLoading();
        const aboutUsResponse =
          await aboutUsRepository.getAllAboutUs();
        setAboutUsList(aboutUsResponse.data || []);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Failed to fetch all about us content.",
        });
      } finally {
        hideLoading();
      }
    };
    fetchAllAboutUs();
  }, []);

  const handleClick = () => {
    setModalOpen(true);
    setAboutUs({});
    setImage(null);
  };

  const handleEditButtonClick = (item) => {
    setIsEditAboutUs(true);
    setAboutUs(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
    setImage(null);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteAboutUs(true);
    setIdToDelete(item?._id);
  };

  const handleDeleteButtonClick = async () => {
    const previousList = aboutUsList;
    setAboutUsList((prev) => prev.filter((p) => p._id !== idToDelete));
    try {
      showLoading();
      await aboutUsRepository.deleteAboutUs(idToDelete);
      notify({
        type: "success",
        message: "About us content deleted successfully.",
      });
    } catch (err) {
      setAboutUsList(previousList);
      notify({
        type: "error",
        message: err.message ?? "Failed to delete about us content.",
      });
    } finally {
      hideLoading();
      setIsDeleteAboutUs(false);
      setIdToDelete(null);
    }
  };

  const handleImageSelect = (file) => {
    setImage(file);
  };

  const handleSubmit = async (formData) => {
    if(!image){
        notify({
        type: "error",
        message: "Image is required.",
      });
      return;
    }
    console.log({formData})
    if (!formData.title  || !formData.description) {
      notify({
        type: "error",
        message: "Title & Description are required.",
      });
      return;
    }
    showLoading();
    const fD = new FormData();
    if (image) {
      fD.append("file", image);
    }
    fD.append("title", formData.title);
    fD.append("description", formData.description);
    try {
      let responseMessage;
      let response;
      if (isEditAboutUs) {
        response = await aboutUsRepository.updateAboutUs(
          fD,
          idToUpdate
        );
        setAboutUsList((prev) =>
          prev.map((item) =>
            item._id === idToUpdate
              ? { ...item, title: formData.title, description: formData.description, image: image || item.image }
              : item
          )
        );
      } else {
        response = await aboutUsRepository.addAboutUs(fD);
        setAboutUsList((prev) => [...prev, response.data]);
      }
      responseMessage = response.message;
      setModalOpen(false);
      setImage(null);
      setIsEditAboutUs(false);
      setAboutUs({});
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
    setAboutUs(item);
  };

  const columns = [
    { label: "Title", accessor: "title" },
    { label: "Description", accessor: "description" },
    { label: "Image", accessor: "image" },
  ];

  return (
    <>
      <AboutUsView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditAboutUs(false);
          setAboutUs({});
          setImage(null);
        }}
        columns={columns}
        allAboutUs={aboutUsList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />
      <AboutUsViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        aboutUs={aboutUs}
      />
      <AboutUsAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditAboutUs(false);
          setModalOpen(false);
          setAboutUs({});
          setImage(null);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isEditAboutUs={isEditAboutUs}
        aboutUs={aboutUs}
      />
      <CustomDialogModal
        opened={isDeleteAboutUs}
        onClose={() => setIsDeleteAboutUs(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default AboutUsController;
