import VideoView from "../view/videos_view";
import { useEffect, useState } from "react";
import VideoRepository from "../repository/Video_repository";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import VideoViewModel from "../components/video_view_model";
import VideoAddEditModel from "../components/video_add_edit_model";

const VideoController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [video, setVideo] = useState({});
  const { getToken } = useAuth();
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditVideo, setIsEditVideo] = useState(false);
  const [isDeleteVideo, setIsDeleteVideo] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const videoRepository = new VideoRepository(getToken);

  useEffect(() => {
    const fetchVideo = async () => {
      showLoading();
      try {
        const videoResponse = await videoRepository.getVideos();
        setVideoList(videoResponse.data);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Something went wrong. Please try again.",
        });
      } finally {
        hideLoading();
      }
    };
    fetchVideo();
  }, []);

  const handleClick = () => {
    setModalOpen(true);
  };

  //Function to trigger when edit button is clicked
  const handleEditButtonClick = (item) => {
    setIsEditVideo(true);
    setVideo(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteVideo(true);
    setIdToDelete(item?._id);
  };
  const handleDeleteButtonClick = async () => {
    showLoading();
    try {
      await videoRepository.deleteVideo(idToDelete);
      setVideoList((prev) => prev.filter((p) => p._id !== idToDelete));
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Failed to delete Video.",
      });
    } finally {
      hideLoading();
    }
  };

  ///This is called when user selects an video
  const handleVideoSelect = (file) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setVideoPreview(objectUrl);
      setVideo(file);
    } else {
      setVideo(null);
      setVideoPreview(null);
    }
  };

  //avoids memory leaks when switching or removing pages
  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  const handleSubmit = async () => {
    if (
      !video
    ) {
      notify({
        type: "error",
        message: "Video is required!",
      });
      return;
    }
  
    showLoading();
    const fD = new FormData();
    if (video) {
      fD.append("video", video);
    }
    try {
      let responseMessage;
      let response;
      if (isEditVideo) {
        response = await videoRepository.updateVideo(fD, idToUpdate);
        setVideoList((prev) =>
          prev.map((item) =>
            item._id === idToUpdate
              ? {
                  videoUrl: videoPreview || item.videoUrl,
                }
              : item
          )
        );
      } else {
        response = await videoRepository.addVideo(fD);
        setVideoList((prev) => [...prev, response.data]);
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
    setVideo(item);
  };

  const columns = [
    { label: "Video", accessor: "videoUrl" },
  ];

  return (
    <>
      <VideoView
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        columns={columns}
        videos={videoList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />

      <VideoViewModel
        openedView={openedView}
        onClose={() => {
          setOpenedView(false);
        }}
        video={video}
      />
      <VideoAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditVideo(false);
          setModalOpen(false);
        }}
        handleSubmit={handleSubmit}
        handleVideoSelect={handleVideoSelect}
        isEditVideo={isEditVideo}
        video={video}
        imagePreview={isEditVideo ? video?.videoUrl : null}
      />

      <CustomDialogModal
        opened={isDeleteVideo}
        onClose={() => setIsDeleteVideo(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />

      <LoadingOverlayComponent />
    </>
  );
};

export default VideoController;
