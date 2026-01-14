import { useState, useEffect } from "react";
import BlogsView from "../view/blogs_view";
import BlogAddEditModel from "../components/blog_add_edit_model";
import BlogViewModel from "../components/blog_view_model";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import BlogRepository from "../repository/blog_repository";
import useAuth from "../../auth/components/use_auth";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";

const BlogsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [blog, setBlog] = useState({});
  const { getToken } = useAuth();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditBlog, setIsEditBlog] = useState(false);
  const [isDeleteBlog, setIsDeleteBlog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const blogRepository = new BlogRepository(getToken);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsResponse = await blogRepository.getAllBlogs();
        const formattedData = blogsResponse.data.map((item) => ({
          ...item,
          postDate: new Date(item.postDate).toLocaleDateString("en-CA"),
        }));
        setBlogList(formattedData);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Something went wrong. Please try again.",
        });
      }
    };
    fetchBlogs();
  }, []);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleEditButtonClick = (item) => {
    setIsEditBlog(true);
    setBlog(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteBlog(true);
    setIdToDelete(item?._id);
  };

  const handleDeleteButtonClick = async () => {
    try {
      await blogRepository.deleteBlog(idToDelete);
      showLoading();
      setBlogList((prev) => prev.filter((p) => p._id !== idToDelete));
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Failed to delete blog.",
      });
    } finally {
      hideLoading();
    }
  };

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
    fD.append("title", formData.title);
    fD.append("postedBy", formData.postedBy);
    const formattedDate = formData.postDate
      ? formData.postDate.toLocaleDateString("en-CA")
      : "";
    fD.append("postDate", formattedDate);
    fD.append("description", formData.description);

    try {
      let responseMessage;
      let response;
      if (isEditBlog) {
        response = await blogRepository.updateBlog(fD, idToUpdate);
        setBlogList((prev) =>
          prev.map((item) =>
            item._id === idToUpdate
              ? {
                  ...item,
                  postedBy: formData.postedBy,
                  postDate: formData.postDate.toLocaleDateString("en-CA"),
                  description: formData.description,
                  image: imagePreview || item.image,
                }
              : item
          )
        );
      } else {
        response = await blogRepository.createBlog(fD);
        setBlogList((prev) => [...prev, response.data]);
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
    setBlog(item);
  };

  const columns = [
    { label: "Title", accessor: "title" },
    { label: "Posted By", accessor: "postedBy" },
    { label: "Post Date", accessor: "postDate" },
    { label: "Description", accessor: "description" },
    { label: "Image", accessor: "image" },
  ];

  return (
    <>
      <BlogsView
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        columns={columns}
        blogs={blogList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />

      <BlogViewModel
        openedView={openedView}
        onClose={() => {
          setOpenedView(false);
        }}
        blog={blog}
      />

      <BlogAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditBlog(false);
          setModalOpen(false);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isEditBlog={isEditBlog}
        blog={blog}
        imagePreview={isEditBlog ? blog?.image : null}
      />

      <CustomDialogModal
        opened={isDeleteBlog}
        onClose={() => setIsDeleteBlog(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />

      <LoadingOverlayComponent />
    </>
  );
};

export default BlogsController;
