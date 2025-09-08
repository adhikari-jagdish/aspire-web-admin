import { useState, useEffect } from "react";
import ReviewsView from "../view/reviews_view";
import ReviewAddEditModel from "../components/review_add_edit_model";
import ReviewViewModel from "../components/review_view_model";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import ReviewRepository from "../repository/review_repository";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import useAuth from "../../auth/components/use_auth";
import { CommonReviewBlogValidator } from "../../common/common_view_components/review_blog_validator/common_review_blog_validator";

const ReviewsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [review, setReview] = useState({});
  const { getToken } = useAuth();
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(["", "", ""]);
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
        showLoading();
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
      } finally {
        hideLoading();
      }
    };
    fetchReviews();
  }, []);

  const handleClick = () => {
    setModalOpen(true);
    setIsEditReview(false);
    setReview({});
    setImages([]);
    setImagePreviews(["", "", ""]);s
    setModalOpen(true);
  };

  const handleEditButtonClick = (item) => {
    setIsEditReview(true);
    setReview(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
    setImages([]);
    setImagePreviews(item?.imageUrl || ["", "", ""]);
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

  // Handle multiple image selection
  const handleImageSelect = (file, index, addNew = false) => {
    if (addNew) {
      if (imagePreviews.length < 5) {
        setImagePreviews((prev) => [...prev, ""]);
      }
      return;
    }

    const newPreviews = [...imagePreviews];
    const newImages = [...images];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      newPreviews[index] = objectUrl;
      newImages[index] = file;
    } else {
      newPreviews[index] = "";
      newImages[index] = null;
    }

    setImagePreviews(newPreviews);
    setImages(newImages);
  };

  // Avoids memory leaks when switching or removing pages
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        if (preview) URL.revokeObjectURL(preview);
      });
    };
  }, [imagePreviews]);

  const handleSubmit = async (formData) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = formData.description;

    const existingUrls = imagePreviews.filter(
      (p) => typeof p === "string" && p.startsWith("http")
    );
    const newFiles = images.filter(Boolean);
    const totalImages = existingUrls.length + newFiles.length;

    const result = CommonReviewBlogValidator(formData, tempDiv, images);
    if (!result.valid) {
      notify({ type: "error", message: result.message });
      return;
    }

    if (totalImages < 3) {
      notify({ type: "error", message: "At least 3 images are required." });
      return;
    }

    showLoading();
    const fD = new FormData();

    existingUrls.forEach((url) => {
      fD.append("existingImages", url);
    });

    newFiles.forEach((img) => {
      fD.append("files", img);
    });

    fD.append("postedBy", formData.postedBy);
    fD.append(
      "postDate",
      formData.postDate ? formData.postDate.toLocaleDateString("en-CA") : ""
    );
    fD.append("description", formData.description);

    try {
      let response;
      if (isEditReview) {
        response = await reviewRepository.updateReview(fD, idToUpdate);
        setReviewList((prev) =>
          prev.map((item) => (item._id === idToUpdate ? response.data : item))
        );
      } else {
        response = await reviewRepository.addReview(fD);
        setReviewList((prev) => [...prev, response.data]);
      }
      setModalOpen(false);
      notify({ type: "success", message: "Review saved successfully" });
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
    // { label: "Images", accessor: "images" },
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
        onClose={() => setOpenedView(false)}
        review={review}
      />

      <ReviewAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditReview(false);
          setModalOpen(false);
          setImages([]);
          setImagePreviews(["", "", ""]);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isEditReview={isEditReview}
        review={review}
        imagePreviews={imagePreviews}
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
