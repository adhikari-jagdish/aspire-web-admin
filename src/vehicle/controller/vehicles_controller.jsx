import { useState, useEffect } from "react";
import VehiclesView from "../view/vehicles_view";
import VehicleAddEditModal from "../components/vehicle_add_edit_model";
import VehicleViewModal from "../components/vehicle_view_model";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import VehicleRepository from "../repository/vehicle_repository";
import useAuth from "../../auth/components/use_auth";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import { VehicleValidator } from "../validations/vehicle_validation";

const VehiclesController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [vehicleList, setVehicleList] = useState([]);
  const [vehicle, setVehicle] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditVehicle, setIsEditVehicle] = useState(false);
  const [isDeleteVehicle, setIsDeleteVehicle] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const { getToken } = useAuth();
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();

  const vehicleRepository = new VehicleRepository(getToken);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await vehicleRepository.getAllVehicles();
        setVehicleList(res.data);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Failed to load vehicles.",
        });
      }
    };

    fetchVehicles();
  }, []);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleEditButtonClick = (item) => {
    setIsEditVehicle(true);
    setVehicle(item);
    setModalOpen(true);
    setIdToUpdate(item._id);
    setImagePreview(item.image || null);
  };

  const handleViewButtonClick = (item) => {
    setVehicle(item);
    setOpenedView(true);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteVehicle(true);
    setIdToDelete(item._id);
  };

  const handleDeleteButtonClick = async () => {
    try {
      showLoading();
      await vehicleRepository.deleteVehicle(idToDelete);
      setVehicleList((prev) => prev.filter((v) => v._id !== idToDelete));
      notify({ type: "success", message: "Vehicle deleted successfully." });
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Failed to delete vehicle.",
      });
    } finally {
      hideLoading();
    }
  };

  const handleImageSelect = (file) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(objectUrl);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async (formData) => {
   const result = VehicleValidator(formData, image, isEditVehicle);

   if(!result.valid){
     notify({
      type: "error",
      message: result.message
    })
    return;
   }


    const fd = new FormData();

    if (image) fd.append("file", image);
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("priceFrom", formData.priceFrom);

    fd.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    showLoading();

    try {
      let response;

      if (isEditVehicle) {
        response = await vehicleRepository.updateVehicle(fd, idToUpdate);
        setVehicleList((prev) =>
          prev.map((v) =>
            v._id === idToUpdate
              ? {
                  ...v,
                  ...formData,
                  image: imagePreview || v.image,
                }
              : v
          )
        );
      } else {
        response = await vehicleRepository.createVehicle(fd);
        setVehicleList((prev) => [...prev, response.data]);
      }

      notify({ type: "success", message: response.message });
      setModalOpen(false);
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
    { label: "Price From", accessor: "priceFrom" },
    { label: "Image", accessor: "image" },
  ];

  return (
    <>
      <VehiclesView
        columns={columns}
        vehicles={vehicleList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />

      <VehicleViewModal
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        vehicle={vehicle}
      />

      <VehicleAddEditModal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditVehicle(false);
          setImage(null);
          setImagePreview(null);
        }}
        isEditVehicle={isEditVehicle}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        vehicle={vehicle}
        imagePreview={isEditVehicle ? vehicle?.image : null}
      />

      <CustomDialogModal
        opened={isDeleteVehicle}
        onClose={() => setIsDeleteVehicle(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />

      <LoadingOverlayComponent />
    </>
  );
};

export default VehiclesController;
