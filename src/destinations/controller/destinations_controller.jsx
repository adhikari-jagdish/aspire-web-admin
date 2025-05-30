import DestinationsView from "../view/destinations_view";
import DestinationAddEditModel from "../components/destination_add_edit_model";
import { useState } from "react";
import DestinationRepository from "../repository/destination_repository";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";

const DestinationsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();

  const destinationRepository = new DestinationRepository(getToken);

  const handleClick = () => {
    setModalOpen(true);
  };

  ///This is called when user selects an image
  const handleImageSelect = (file) => {
    setImage(file);
  };

  const handleSubmit = async (formData) => {
    showLoading();
    await new Promise((resolve) => setTimeout(resolve, 5000));
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
      setError(err.message);
    } finally {
      hideLoading();
    }
  };

  const columns = [
    { label: "Title", accessor: "title" },
    { label: "Description", accessor: "description" },
    { label: "Image", accessor: "image" },
  ];

  const destinations = [
    {
      id: 1,
      title: "Nepal",
      description: "Hello this is the description of Nepal",
      image: "Image Url",
    },
    {
      id: 2,
      title: "India",
      description: "Hello this is the description of India",
      image: "Image Url",
    },
    {
      id: 3,
      title: "Bhutan",
      description: "Hello this is the description of Bhutan",
      image: "Image Url",
    },
  ];

  return (
    <>
      <DestinationsView
        columns={columns}
        destinations={destinations}
        handleClick={handleClick}
      />

      <DestinationAddEditModel
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
      />

      <LoadingOverlayComponent />
    </>
  );
};

export default DestinationsController;
