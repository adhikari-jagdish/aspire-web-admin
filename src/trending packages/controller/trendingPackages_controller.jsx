import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import { useNotification } from "../../common/hooks/useNotification";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import TrendingPackageRepository from "../repository/trendingPackage_repository";
import TrendingPackagesView from "../view/trendingPackages_view";
import TrendingPackagesViewModel from "../components/trendingPackages_view_model";
import TrendingPackagesAddModel from "../components/trendingPackage_add_model";
import {  useGetAllPackages } from "../../common/hooks/useGetAllPackages";

const TrendingPackagesController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [packageList, setPackageList] = useState([]);
  const [trendingPackageList, setTrendingPackageList] = useState([]);
  const [trendingPackage, setTrendingPackage] = useState({});
  const { getToken } = useAuth();
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isDeleteTrendingPackage, setIsDeleteTrendingPackage] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const trendingPackageRepository = new TrendingPackageRepository(getToken);

  useEffect(() => {
    const fetchTrendingPackages = async () => {
      try {
        showLoading();
        const trendingPackageResponse =
          await trendingPackageRepository.getAllTrendingPackages();
        setTrendingPackageList(trendingPackageResponse.data || []);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Failed to fetch Trending Packages.",
        });
      } finally {
        hideLoading();
      }
    };
    fetchTrendingPackages();
  }, []);

  //fetch all top rated packages

  useEffect(() => {
    const fetchAllPackages = async () => {
      try {
        showLoading();
        const result = await useGetAllPackages(getToken);
        setPackageList(result);
      } catch (error) {
        notify({
          type: "error",
          message: error.message ?? "Something went wrong. Please try again",
        });
      } finally {
        hideLoading();
      }
    };
    fetchAllPackages();
  }, [trendingPackageList]);

  const handleClick = () => {
    setModalOpen(true);
    setTrendingPackage({});
    setImage(null);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteTrendingPackage(true);
    setIdToDelete(item?._id);
  };

  const handleDeleteButtonClick = async () => {
    const previousList = trendingPackageList;
    setTrendingPackageList((prev) => prev.filter((p) => p._id !== idToDelete));
    try {
      showLoading();
      await trendingPackageRepository.deleteTrendingPackage(idToDelete);
      notify({
        type: "success",
        message: "Trending Package deleted successfully.",
      });
    } catch (err) {
      setTrendingPackageList(previousList);
      notify({
        type: "error",
        message: err.message ?? "Failed to delete trending package.",
      });
    } finally {
      hideLoading();
      setIsDeleteTrendingPackage(false);
      setIdToDelete(null);
    }
  };

  const handleSubmit = async (packageId) => {
    if (!packageId || packageId.trim() == "") {
      notify({
        type: "error",
        message: "Package is required.",
      });
      return;
    }
    showLoading();

    let responseMessage;
    try {
      let response;
      response = await trendingPackageRepository.createTrendingPackage(
        packageId
      );
      setTrendingPackageList((prev) => [...prev, response.data]);

      responseMessage = response.message;
      setModalOpen(false);
      setTrendingPackage({});
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
    setTrendingPackage(item);
  };

  const columns = [
    { label: "Destination", accessor: "destinationIds" },
    { label: "Title", accessor: "title" },
    { label: "Duration", accessor: "duration" },
    { label: "Discount", accessor: "discountInPercentage" },
    { label: "Image", accessor: "image" },
  ];
  return (
    <>
      <TrendingPackagesView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setTrendingPackage({});
          setImage(null);
        }}
        columns={columns}
        trendingPackages={trendingPackageList}
        handleClick={handleClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />
      <TrendingPackagesViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        trendingPackage={trendingPackage}
      />
      <TrendingPackagesAddModel
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setTrendingPackage({});
          setImage(null);
        }}
        handleSubmit={handleSubmit}
        packageList={packageList}
      />
      <CustomDialogModal
        opened={isDeleteTrendingPackage}
        onClose={() => setIsDeleteTrendingPackage(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default TrendingPackagesController;
