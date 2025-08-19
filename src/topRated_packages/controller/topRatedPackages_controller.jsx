import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import { useNotification } from "../../common/hooks/useNotification";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import TopRatedPackageRepository from "../repository/topRatedPackage_repository";
import TopRatedPackagesView from "../view/topRatedPackages_view";
import TopRatedPackagesViewModel from "../components/TopRatedPackages_view_model";
import TopRatedPackagesAddModel from "../components/topRatedPackage_add_model";
import TourRepository from "../../tours/repository/tour_repository";
import TrekkingRepository from "../../trekkings/repository/trekking_repository";
import ExpeditionRepository from "../../expeditions/repository/expedition_repository";
import PeakClimbingRepository from "../../peak climbings/repository/peakClimbing_repository";

const TopRatedPackagesController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [packageList, setPackageList] = useState([]);
  const [topRatedPackageList, setTopRatedPackageList] = useState([]);
  const [topRatedPackage, setTopRatedPackage] = useState({});
  const { getToken } = useAuth();
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isDeleteTopRatedPackage, setIsDeleteTopRatedPackage] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const topRatedPackageRepository = new TopRatedPackageRepository(getToken);

  useEffect(() => {
    const fetchTopRatedPackages = async () => {
      try {
        showLoading();
        const topRatedPackageResponse =
          await topRatedPackageRepository.getAllTopRatedPackages();
        setTopRatedPackageList(topRatedPackageResponse.data || []);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Failed to fetch TopRatedPackages.",
        });
      } finally {
        hideLoading();
      }
    };
    fetchTopRatedPackages();
  }, []);

  //fetch all top rated packages
  const tourRepository = new TourRepository(getToken);
  const trekkingRepository = new TrekkingRepository(getToken);
  const expeditionRepository = new ExpeditionRepository(getToken);
  const peakClimbingRepository = new PeakClimbingRepository(getToken);
  useEffect(() => {
    const fetchAllPackages = async () => {
      try {
        showLoading();
        const [tours, trekkings, expeditions, peaks] = await Promise.all([
          tourRepository.getTourPackages(),
          trekkingRepository.getTrekkingPackages(),
          expeditionRepository.getExpeditionPackages(),
          peakClimbingRepository.getPeakClimbingPackages(),
        ]);

        const allPackages = [
          ...tours.data,
          ...trekkings.data,
          ...expeditions.data,
          ...peaks.data,
        ];

        const uniquePackages = Array.from(
          new Map(
            allPackages.map((pkg) => [
              pkg._id,
              { _id: pkg._id, title: pkg.title },
            ])
          ).values()
        );
        setPackageList(uniquePackages);
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
  }, [topRatedPackageList]);

  const handleClick = () => {
    setModalOpen(true);
    setTopRatedPackage({});
    setImage(null);
  };

  const handleEditButtonClick = (item) => {
    setTopRatedPackage(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
    setImage(null);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteTopRatedPackage(true);
    setIdToDelete(item?._id);
  };

  const handleDeleteButtonClick = async () => {
    const previousList = topRatedPackageList;
    setTopRatedPackageList((prev) => prev.filter((p) => p._id !== idToDelete));
    try {
      showLoading();
      await topRatedPackageRepository.deleteTopRatedPackage(idToDelete);
      notify({
        type: "success",
        message: "Top Rated Package deleted successfully.",
      });
    } catch (err) {
      setTopRatedPackageList(previousList);
      notify({
        type: "error",
        message: err.message ?? "Failed to delete top rated package.",
      });
    } finally {
      hideLoading();
      setIsDeleteTopRatedPackage(false);
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
      response = await topRatedPackageRepository.createTopRatedPackage(
        packageId
      );
      setTopRatedPackageList((prev) => [...prev, response.data]);

      responseMessage = response.message;
      setModalOpen(false);
      setTopRatedPackage({});
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
    setTopRatedPackage(item);
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
      <TopRatedPackagesView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setTopRatedPackage({});
          setImage(null);
        }}
        columns={columns}
        topRatedPackages={topRatedPackageList}
        handleClick={handleClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />
      <TopRatedPackagesViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        topRatedPackage={topRatedPackage}
      />
      <TopRatedPackagesAddModel
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setTopRatedPackage({});
          setImage(null);
        }}
        handleSubmit={handleSubmit}
        packageList={packageList}
      />
      <CustomDialogModal
        opened={isDeleteTopRatedPackage}
        onClose={() => setIsDeleteTopRatedPackage(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default TopRatedPackagesController;
