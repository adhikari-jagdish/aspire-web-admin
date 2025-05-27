import DestinationsView from "../view/destinations_view";
import DestinationAddEditModel from "../components/destination_add_edit_model";
import { useState } from "react";
import DestinationRepository from "../repository/destination_repository";
import useAuth from "../../auth/components/use_auth";

const DestinationsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);

  // Initialize AuthRepository with getToken from useAuth

  const destinationRepository = new DestinationRepository(getToken);

  const handleClick = () => {
    setModalOpen(true);
  };

  ///This is called when user selects an image
  const handleImageSelect = (file) => {
    setImage(file);
    console.log(image.path);
  };

  const handleSubmit = async (formData) => {
    const fD = new FormData();
    fD.append("file", image);
    fD.append("title", formData.title);
    fD.append("description", formData.description);
    console.log(image.path);
    try {
      const response = await destinationRepository.addDestination(fD);
      console.log(response);
    } catch (err) {
      setError(err.message);
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
    </>
  );
};

export default DestinationsController;
