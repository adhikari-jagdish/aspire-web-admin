import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import ServiceReviewAddEditModel from "../components/serviceReview_add_edit_model";
import ServiceReviewViewModel from "../components/serviceReview_view_model";
import ServiceReviewsView from "../view/serviceReviews_view";
import ServiceReviewRepository from "../repository/serviceReview_repository";

const ServiceReviewsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [serviceReviewList, setServiceReviewList] = useState([]);
  const [serviceReview, setServiceReview] = useState({});
  const { getToken } = useAuth();
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditServiceReview, setIsEditServiceReview] = useState(false);
  const [isDeleteServiceReview, setIsDeleteServiceReview] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const serviceReviewRepository = new ServiceReviewRepository(getToken);

  useEffect(() => {
    const fetchServiceReviews = async () => {
      try {
        const serviceReviewsResponse =
          await serviceReviewRepository.getServiceReviews();
        setServiceReviewList(serviceReviewsResponse.data);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Something went wrong. Please try again.",
        });
      }
    };
    fetchServiceReviews();
  }, []);
  const handleClick = () => {
    setModalOpen(true);
  };
  //Function to trigger when edit button is clicked
  const handleEditButtonClick = (item) => {
    setIsEditServiceReview(true);
    setServiceReview(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteServiceReview(true);
    setIdToDelete(item?._id);
  };
  const handleDeleteButtonClick = async () => {
    try {
      showLoading();
      await serviceReviewRepository.deleteServiceReview(idToDelete);
      showLoading();
      setServiceReviewList((prev) => prev.filter((p) => p._id !== idToDelete));
      notify({
        type: "success",
        message: "Service Review deleted successfully.",
      });
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Failed to delete ServiceReview.",
      });
    } finally {
      hideLoading();
    }
  };

  const handleSubmit = async (formData) => {
    if (!formData.review || !formData.icon || !formData.details) {
      notify({
        type: "error",
        message: "All fields are required!",
      });
      return;
    }
    if (formData.details.trim().length > 150) {
      notify({
        type: "error",
        message: "Title must be 150 characters or fewer.",
      });
      return;
    }

    if (!formData.icon) {
      notify({
        type: "error",
        message: "Icon is required!",
      });
      return;
    }

    showLoading();
    const fD = new FormData();
    fD.append("file", formData.icon);
    fD.append("review", formData.review);
    fD.append("details", formData.details);
    try {
      let responseMessage;
      let response;
      if (isEditServiceReview) {
            const objectUrl = URL.createObjectURL(formData.icon);
          
        response = await serviceReviewRepository.updateServiceReview(
          fD,
          idToUpdate
        );
        setServiceReviewList((prev) =>
          prev.map((item) =>
            item._id === idToUpdate
              ? {
                  ...item,
                  review: formData.review,
                  details: formData.details,
                  icon: objectUrl || item.icon,
                }
              : item
          )
        );
      } else {
        response = await serviceReviewRepository.addServiceReview(fD);
        setServiceReviewList((prev) => [...prev, response.data]);
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
    setServiceReview(item);
  };

  const columns = [
    { label: "Icon", accessor: "icon" },
    { label: "Review", accessor: "review" },
    { label: "Detail", accessor: "details" },
  ];
  return (
    <>
      <ServiceReviewsView
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        columns={columns}
        serviceReviews={serviceReviewList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />

      <ServiceReviewViewModel
        openedView={openedView}
        onClose={() => {
          setOpenedView(false);
        }}
        serviceReview={serviceReview}
      />
      <ServiceReviewAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditServiceReview(false);
          setModalOpen(false);
        }}
        handleSubmit={handleSubmit}
        isEditServiceReview={isEditServiceReview}
        serviceReview={serviceReview}
      />

      <CustomDialogModal
        opened={isDeleteServiceReview}
        onClose={() => setIsDeleteServiceReview(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />

      <LoadingOverlayComponent />
    </>
  );
};

export default ServiceReviewsController;
