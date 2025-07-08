import DestinationsView from "../view/destinations_view";
import DestinationAddEditModel from "../components/destination_add_edit_model";
import DestinationViewModel from "../components/destination_view_model";
import { useEffect, useState } from "react";
import DestinationRepository from "../repository/destination_repository";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";

const DestinationsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [destinationList, setDestinationList] = useState([]);
  const [destination, setDestination] = useState({});
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditDestination, setIsEditDestination] = useState(false);
  const [isDeleteDestination, setIsDeleteDestination] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

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

  const handleClick = (item) => {
    setModalOpen(true);
  };

  //Function to trigger when edit button is clicked
  const handleEditButtonClick = (item) => {
    setIsEditDestination(true);
    setDestination(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteDestination(true);
    setIdToDelete(item?._id);
  };
  const handleDeleteButtonClick = async () => {
    try {
      await destinationRepository.deleteDestination(idToDelete);
      showLoading();
      setDestinationList((prev) => prev.filter((p) => p._id !== idToDelete));
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Failed to delete destination.",
      });
    } finally {
      hideLoading();
    }
  };

  ///This is called when user selects an image
  const handleImageSelect = (file) => {
    if(file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      setImage(file); 
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  

  //avoids memory leaks when switching or removing pages
  useEffect(() => {
  return () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };
}, [imagePreview]);


  const handleSubmit = async (formData) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = formData.description;
    if(formData.title.trim().length === 0  || tempDiv.textContent.trim().length === 0){
      notify({
        type: "error",
        message: "All fields are required!"
      })
      return;
    }
    if(!image) {
      notify({
        type: "error",
        message: "Image is required!"
      })
      return;
    }
    showLoading();
    const fD = new FormData();
    fD.append("file", image);
    fD.append("title", formData.title);
    fD.append("description", formData.description);
    try {
      let responseMessage;
      let response;
     if(isEditDestination){
       response = await destinationRepository.updateDestination(fD,idToUpdate);
       setDestinationList(prev => prev.map(item => item._id === idToUpdate ? {...item, title: formData.title, description: formData.description, image: imagePreview || item.image} : item));
     } else {
        response = await destinationRepository.addDestination(fD);
        setDestinationList(prev => [...prev, response.data])
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
    setDestination(item);
  };

  const columns = [
    { label: "Title", accessor: "title" },
    { label: "Description", accessor: "description" },
    { label: "Image", accessor: "image" },
  ];
  return (
    <>
      <DestinationsView
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        columns={columns}
        destinations={destinationList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />

      <DestinationViewModel
        openedView={openedView}
        onClose={() => {
          setOpenedView(false);
        }}
        destination={destination}
      />
      <DestinationAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditDestination(false);
          setModalOpen(false);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isEditDestination={isEditDestination}
        destination={destination}
        imagePreview={isEditDestination ? destination?.image : null}
      />

      <CustomDialogModal
        opened={isDeleteDestination}
        onClose={() => setIsDeleteDestination(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />

      <LoadingOverlayComponent />
    </>
  );
};

export default DestinationsController;
