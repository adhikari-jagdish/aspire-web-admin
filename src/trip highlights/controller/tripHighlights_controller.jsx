import TripHighLightAddEditModel from "../components/tripHighLight_add_edit_model";
import TripHighLightViewModel from "../components/tripHighLight_view_model";
import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import TripHighLightsView from "../view/tripHighlights_view";
import TripHighlightRepository from "../repository/tripHighlight_repository";
import TripHighlightViewModel from "../components/tripHighLight_view_model";

const TripHighLightsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [tripHighlightList, setTripHighlightList] = useState([]);
  const [tripHighlight, setTripHighlight] = useState({});
  const { getToken } = useAuth();
  const [file, setFile] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditTripHighlight, setIsEditTripHighlight] = useState(false);
  const [isDeleteTripHighlight, setIsDeleteTripHighlight] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const tripHighlightRepository = new TripHighlightRepository(getToken);


  useEffect(() => {
    const fetchTripHighLights = async () => {
      try {
        const tripHighlightsResponse =
          await tripHighlightRepository.getTripHighlights();
        setTripHighlightList(tripHighlightsResponse.data);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Something went wrong. Please try again.",
        });
      }
    };
    fetchTripHighLights();
  }, []);
  const handleClick = (item) => {
    setModalOpen(true);
  };
  //Function to trigger when edit button is clicked
  const handleEditButtonClick = (item) => {
    setIsEditTripHighlight(true);
    setTripHighlight(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteTripHighlight(true);
    setIdToDelete(item?._id);
  };
  const handleDeleteButtonClick = async () => {
    try {
      await tripHighlightRepository.deleteTripHighlight(idToDelete);
      showLoading();
      setTripHighlightList((prev) => prev.filter((p) => p._id !== idToDelete));
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Failed to delete TripHighLight.",
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
    fD.append("file", formData.file);
    fD.append("title", formData.title);
    try {
      let responseMessage;
      let response;
     if(isEditTripHighlight){
       response = await tripHighlightRepository.updateTripHighlight(fD,idToUpdate);
       setTripHighlightList(prev => prev.map(item => item._id === idToUpdate ? {...item, title: formData.title, file: file || item.icon} : item));
     } else {
        response = await tripHighlightRepository.addTripHighlight(fD);
        setTripHighlightList(prev => [...prev, response.data])
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
    setTripHighlight(item);
  };

  const columns = [
    { label: "Title", accessor: "title" },
    { label: "Icon", accessor: "icon" },
  ];
  return (
    <>
      <TripHighLightsView
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        columns={columns}
        tripHighlights={tripHighlightList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />

      <TripHighlightViewModel
        openedView={openedView}
        onClose={() => {
          setOpenedView(false);
        }}
        tripHighlight={tripHighlight}
      />
      <TripHighLightAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditTripHighlight(false);
          setModalOpen(false);
        }}
        handleSubmit={handleSubmit}
        handleFileSelect={handleFileSelect}
        isEditTripHighlight={isEditTripHighlight}
        tripHighlight={tripHighlight}
      />

      <CustomDialogModal
        opened={isDeleteTripHighlight}
        onClose={() => setIsDeleteTripHighlight(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />

      <LoadingOverlayComponent />
    </>
  );
};

export default TripHighLightsController;
