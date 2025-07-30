import { useState, useEffect } from "react";
import ReviewsView from "../view/reviews_view";
import ReviewAddEditModel from "../components/review_add_edit_model";
import ReviewViewModel from "../components/review_view_model";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import ReviewRepository from "../repository/review_repository";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import useAuth from "../../auth/components/use_auth";

const ReviewsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [review, setReview] = useState({});
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditReview, setIsEditReview] = useState(false);
  const [isDeleteReview, setIsDeleteReview] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const reviewRepository = new ReviewRepository(getToken);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsResponse = await reviewRepository.getAllReviews();
        const formattedData = reviewsResponse.data.map((item) => ({
          ...item,
          postDate: new Date(item.postDate).toLocaleDateString("en-CA"),
        }));
        setReviewList(formattedData);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Something went wrong. Please try again.",
        });
      }
    };
    fetchReviews();
  }, []);

  const handleClick = () => {
    setModalOpen(true);
  };

  // Function to trigger when edit button is clicked
  const handleEditButtonClick = (item) => {
    setIsEditReview(true);
    setReview(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteReview(true);
    setIdToDelete(item?._id);
  };

  const handleDeleteButtonClick = async () => {
    try {
      await reviewRepository.deleteReview(idToDelete);
      showLoading();
      setReviewList((prev) => prev.filter((p) => p._id !== idToDelete));
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Failed to delete review.",
      });
    } finally {
      hideLoading();
    }
  };

  // This is called when user selects an image
  const handleImageSelect = (file) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      setImage(file);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  // Avoids memory leaks when switching or removing pages
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
    console.log(formData);

    if (
      formData.postedBy.trim().length === 0 ||
      tempDiv.textContent.trim().length === 0
    ) {
      notify({
        type: "error",
        message: "All fields are required!",
      });
      return;
    }
    showLoading();
    const fD = new FormData();
    fD.append("file", image);
    fD.append("postedBy", formData.postedBy);
    const formattedDate = formData.postDate
      ? formData.postDate.toLocaleDateString("en-CA")
      : "";

    fD.append("postDate", formattedDate);
    fD.append("description", formData.description);
    try {
      let responseMessage;
      let response;
      if (isEditReview) {
        response = await reviewRepository.updateReview(fD, idToUpdate);
        setReviewList((prev) =>
          prev.map((item) =>
            item._id === idToUpdate
              ? {
                  ...item,
                  postedBy: formData.postedBy,
                  postDate: formData.postDate.toLocaleDateString("en-CA"),
                  description: formData.description,
                  file: imagePreview || item.file,
                }
              : item
          )
        );
      } else {
        response = await reviewRepository.addReview(fD);
        setReviewList((prev) => [...prev, response.data]);
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
    setReview(item);
  };

  const columns = [
    { label: "Posted By", accessor: "postedBy" },
    { label: "Post Date", accessor: "postDate" },
    { label: "Description", accessor: "description" },
    { label: "Image", accessor: "imageUrl" },
  ];

  return (
    <>
      <ReviewsView
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        columns={columns}
        reviews={reviewList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />

      <ReviewViewModel
        openedView={openedView}
        onClose={() => {
          setOpenedView(false);
        }}
        review={review}
      />
      <ReviewAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditReview(false);
          setModalOpen(false);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isEditReview={isEditReview}
        review={review}
        imagePreview={isEditReview ? review?.imageUrl : null}
      />

      <CustomDialogModal
        opened={isDeleteReview}
        onClose={() => setIsDeleteReview(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />

      <LoadingOverlayComponent />
    </>
  );
};

export default ReviewsController;
