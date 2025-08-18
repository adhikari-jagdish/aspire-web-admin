import FaqTitleAddEditModel from "../components/faqTitle_add_edit_model";
import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import FaqTitlesView from "../view/FaqTitles_view";
import FaqTitleRepository from "../repository/faqTitle_repository";
import FaqTitleViewModel from "../components/faqTitle_view_model";

const FaqTitlesController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [faqTitleList, setFaqTitleList] = useState([]);
  const [faqTitle, setFaqTitle] = useState({});
  const { getToken } = useAuth();
  const [file, setFile] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditFaqTitle, setIsEditFaqTitle] = useState(false);
  const [isDeleteFaqTitle, setIsDeleteFaqTitle] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const faqTitleRepository = new FaqTitleRepository(getToken);


  useEffect(() => {
    const fetchFaqTitles = async () => {
      try {
        const faqTitlesResponse =
          await faqTitleRepository.getFaqTitles();
        setFaqTitleList(faqTitlesResponse.data);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Something went wrong. Please try again.",
        });
      }
    };
    fetchFaqTitles();
  }, []);
  const handleClick = (item) => {
    setModalOpen(true);
  };
  //Function to trigger when edit button is clicked
  const handleEditButtonClick = (item) => {
    setIsEditFaqTitle(true);
    setFaqTitle(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteFaqTitle(true);
    setIdToDelete(item?._id);
  };
  const handleDeleteButtonClick = async () => {
    try {
      await faqTitleRepository.deleteFaqTitle(idToDelete);
      showLoading();
      setFaqTitleList((prev) => prev.filter((p) => p._id !== idToDelete));
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Failed to delete FaqTitle.",
      });
    } finally {
      hideLoading();
    }
  };

  ///This is called when user selects an file
  const handleFileSelect = (file) => {
    setFile(file);
  };

  const handleSubmit = async (formData) => {
    showLoading();
    const fD = new FormData();
    fD.append("file", formData.icon);
    fD.append("title", formData.title);
    try {
      let responseMessage;
      let response;
     if(isEditFaqTitle){
       response = await faqTitleRepository.updateFaqTitle(fD,idToUpdate);
       setFaqTitleList(prev => prev.map(item => item._id === idToUpdate ? {...item, title: formData.title, file: file || item.icon} : item));
     } else {
        response = await faqTitleRepository.addFaqTitle(fD);
        setFaqTitleList(prev => [...prev, response.data])
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
    setFaqTitle(item);
  };

  const columns = [
    { label: "Title", accessor: "title" },
  ];
  return (
    <>
      <FaqTitlesView
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        columns={columns}
        faqTitles={faqTitleList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />

      <FaqTitleViewModel
        openedView={openedView}
        onClose={() => {
          setOpenedView(false);
        }}
        faqTitle={faqTitle}
      />
      <FaqTitleAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditFaqTitle(false);
          setModalOpen(false);
        }}
        handleSubmit={handleSubmit}
        handleFileSelect={handleFileSelect}
        isEditFaqTitle={isEditFaqTitle}
        faqTitle={faqTitle}
      />

      <CustomDialogModal
        opened={isDeleteFaqTitle}
        onClose={() => setIsDeleteFaqTitle(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />

      <LoadingOverlayComponent />
    </>
  );
};

export default FaqTitlesController;
