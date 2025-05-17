import DestinationsView from "../view/destinations_view";
import DestinationAddEditModel from "../components/destination_add_edit_model";
import { useState } from "react";
import DestinationRepository from "../repository/destination_repository";

const DestinationsController = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    console.log("Form submitted:", formData);
    try {
      const response = await DestinationRepository.addDestination(formData);
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
      />
    </>
  );
};

export default DestinationsController;
