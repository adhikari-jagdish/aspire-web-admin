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
  const [tripHighLightList, setTripHighLightList] = useState([]);
  const [tripHighLight, setTripHighLight] = useState({});
  const { getToken } = useAuth();
  const [file, setFile] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditTripHighLight, setIsEditTripHighLight] = useState(false);
  const [isDeleteTripHighLight, setIsDeleteTripHighLight] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const tripHighLightRepository = new TripHighlightRepository(getToken);


  useEffect(() => {
    const fetchTripHighLights = async () => {
      try {
        const tripHighLightsResponse =
          await tripHighLightRepository.getTripHighlights();
        setTripHighLightList(tripHighLightsResponse.data);
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
    setIsEditTripHighLight(true);
    setTripHighLight(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteTripHighLight(true);
    setIdToDelete(item?._id);
  };
  const handleDeleteButtonClick = async () => {
    try {
      await tripHighLightRepository.deleteTripHighlight(idToDelete);
      showLoading();
      setTripHighLightList((prev) => prev.filter((p) => p._id !== idToDelete));
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
     if(isEditTripHighLight){
       response = await tripHighLightRepository.updateTripHighlight(fD,idToUpdate);
       setTripHighLightList(prev => prev.map(item => item._id === idToUpdate ? {...item, title: formData.title, file: file || item.icon} : item));
     } else {
        response = await tripHighLightRepository.addTripHighlight(fD);
        setTripHighLightList(prev => [...prev, response.data])
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
    setTripHighLight(item);
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
        tripHighLights={tripHighLightList}
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
        tripHighLight={tripHighLight}
      />
      <TripHighLightAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditTripHighLight(false);
          setModalOpen(false);
        }}
        handleSubmit={handleSubmit}
        handleFileSelect={handleFileSelect}
        isEditTripHighLight={isEditTripHighLight}
        tripHighLight={tripHighLight}
      />

      <CustomDialogModal
        opened={isDeleteTripHighLight}
        onClose={() => setIsDeleteTripHighLight(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />

      <LoadingOverlayComponent />
    </>
  );
};

export default TripHighLightsController;
