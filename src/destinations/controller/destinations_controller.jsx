import DestinationsView from "../view/destinations_view";
import DestinationAddEditModel from "../components/destination_add_edit_model";
import { useEffect, useState } from "react";
import DestinationRepository from "../repository/destination_repository";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";

const DestinationsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [destinationList, setDestinationList] = useState([]);
  const [destination, setDestination] = useState({});
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditDestination, setIsEditDestination] = useState(false);

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
  };

  //Function to trigger when edit button is clicked
  const handleEditButtonClick = (item) => {
    setIsEditDestination(true);
    setDestination(item);
    setModalOpen(true);
  };

  const handleDeleteButtonClick = async (item) => {
    try {
      showLoading();
      const response = await destinationRepository.deleteDestination(item.id);
      notify({ type: "success", message: response.message });
      setDestinationList((prev) => prev.filter((d) => d.id !== item.id));
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
    setImage(file);
  };

  const handleSubmit = async (formData) => {
    showLoading();
    const fD = new FormData();
    fD.append("file", image);
    fD.append("title", formData.title);
    fD.append("description", formData.description);
    try {
      const response = await destinationRepository.addDestination(fD);
      const responseMessage = response.message;
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

  const columns = [
    { label: "Title", accessor: "title" },
    { label: "Description", accessor: "description" },
    { label: "Image", accessor: "image" },
  ];

  return (
    <>
      <DestinationsView
        columns={columns}
        destinations={destinationList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={handleDeleteButtonClick}
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
      />

      <LoadingOverlayComponent />
    </>
  );
};

export default DestinationsController;
