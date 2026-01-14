import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import FaqRepository from "../repository/faq_repository";
import FaqTitleAddEditModel from "../components/faq_title_add_edit_model";
import FaqView from "../view/faq_view";
import FaqAddEditModel from "../components/faq_add_edit_model";

const FaqController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [faqTitleList, setFaqTitleList] = useState([]);
  const [faqTitle, setFaqTitle] = useState({});
  const { getToken } = useAuth();
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditFaqTitle, setIsEditFaqTitle] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [faqData, setFaqData] = useState({});
  const [faqIdToUpdate, setFaqIdToUpdate] = useState(null);
  const [faqDataList, setFaqDataList] = useState([]);
  const [expandedSubtitleId, setExpandedSubtitleId] = useState(null);

  const [activeTitleId, setActiveTitleId] = useState(null); // track selected title

  const faqRepository = new FaqRepository(getToken);

  // Fetch all titles
  const fetchFaqTitles = async () => {
    try {
      showLoading();
      const res = await faqRepository.getFaqTitles();
      setFaqTitleList(res.data || []);
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Failed to fetch FAQ titles.",
      });
    } finally {
      hideLoading();
    }
  };

  // Fetch FAQs under one title
  const fetchFaqsByTitle = async (id) => {
    try {
      showLoading();
      const res = await faqRepository.getAllFaqsByTitle(id);
      const faqs = res?.data || [];
      setFaqDataList(faqs);
      if (faqDataList.length === 0) {
        handleTitlePlusClick(id);
      }
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Failed to fetch FAQ details.",
      });
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchFaqTitles();
  }, []);

  const handleClick = () => {
    setModalOpen(true);
    setFaqTitle({});
  };

  const handleTitlePlusClick = (id) => {
    setFaqModalOpen(true);
    setFaqIdToUpdate(id);
    setFaqData({});
  };

  const toggleSubtitle = (id) => {
    setExpandedSubtitleId(expandedSubtitleId === id ? null : id);
  };

  const handleTitleClick = async (id) => {
    setActiveTitleId(id);
    await fetchFaqsByTitle(id);
  };

  const handleSubmit = async (formData) => {
    if (!formData.title) {
      notify({ type: "error", message: "Title is required." });
      return;
    } else if (formData.title.length < 10) {
      notify({
        type: "error",
        message: "Title must be at least 10 characters.",
      });
      return;
    }

    showLoading();
    try {
      let response;
      if (isEditFaqTitle) {
        response = await faqRepository.updateFaqTitle(formData, idToUpdate);
        notify({ type: "success", message: response.message });
      } else {
        response = await faqRepository.createFaqTitle(formData);
        notify({ type: "success", message: response.message });
      }

      await fetchFaqTitles();
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Something went wrong. Please try again.",
      });
    } finally {
      setModalOpen(false);
      setIsEditFaqTitle(false);
      setFaqTitle({});
      hideLoading();
    }
  };

  const handleFaqSubmit = async (formData) => {
    if (!formData.subtitle) {
      notify({ type: "error", message: "Subtitle is required." });
      return;
    } else if (!formData.description) {
      notify({ type: "error", message: "Description is required." });
      return;
    }

    showLoading();
    try {
      let response = await faqRepository.createFaq(formData);
      notify({ type: "success", message: response.message });

      if (activeTitleId) {
        await fetchFaqsByTitle(activeTitleId);
      }
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Something went wrong. Please try again.",
      });
    } finally {
      setFaqModalOpen(false);
      setFaqData({});
      hideLoading();
    }
  };

  return (
    <>
      <FaqView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditFaqTitle(false);
          setFaqTitle({});
        }}
        faqTitles={faqTitleList}
        handleClick={handleClick}
        handleTitleClick={handleTitleClick}
        handleTitlePlusClick={handleTitlePlusClick}
        faqDataList={faqDataList}
        expandedSubtitleId={expandedSubtitleId}
        toggleSubtitle={toggleSubtitle}
      />
      <FaqTitleAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditFaqTitle(false);
          setModalOpen(false);
          setFaqTitle({});
        }}
        handleSubmit={handleSubmit}
        isEditFaqTitle={isEditFaqTitle}
        faqTitle={faqTitle}
      />
      <FaqAddEditModel
        opened={faqModalOpen}
        onClose={() => {
          setFaqModalOpen(false);
          setFaqData({});
        }}
        handleSubmit={handleFaqSubmit}
        faqTitle={faqIdToUpdate}
        faqData={faqData}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default FaqController;
