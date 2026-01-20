import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import PeakClimbingsView from "../view/peakClimbings_view";
import PeakClimbingsViewModel from "../components/peakClimbings_view_model";
import PeakClimbingsAddEditModel from "../components/peakClimbing_add_edit_model";
import usePackageController from "../../common/hooks/usePackageController";

const PeakClimbingsController = () => {
 const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const packageController = usePackageController({
    packageType: "PeakClimbing",
    isMapImage: true,
    showLoading, 
    hideLoading
  });

  const {
    modalOpen,
    setModalOpen,
    packageList: peakClimbingList,
    handleClick,
    handleEditButtonClick,
    onDeleteButtonClick,
    handleViewButtonClick,
    destinationList,
    travelThemeList,
    openedView,
    setOpenedView,
    packageItem: peakClimbing,
    setIsEditPackage: setIsEditPeakClimbing,
    handleSubmit,
    handleImageSelect,
    isEditPackage: isEditPeakClimbing,
    isDeletePackage: isDeletePeakClimbing,
    setIsDeletePackage: setIsDeletePeakClimbing,
    handleDeleteButtonClick,
    setMapImage,
    setPackageItem: setPeakClimbing,
    handleMapImageSelect
  } = packageController;


  const columns = [
    { label: "Destination", accessor: "destinationIds" },
    { label: "Title", accessor: "title" },
    { label: "Duration", accessor: "duration" },
    { label: "Discount", accessor: "discountInPercentage" },
    { label: "Image", accessor: "image" },
    { label: "Map", accessor: "mapImage" },
  ];
  return (
    <>
      <PeakClimbingsView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditPeakClimbing(false);
          setPeakClimbing({});
          setImage(null);
          setMapImage(null);
        }}
        columns={columns}
        peakClimbings={peakClimbingList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
        destinationList={destinationList}
        travelThemeList={travelThemeList}
      />
      <PeakClimbingsViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        peakClimbing={peakClimbing}
      />
      <PeakClimbingsAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditPeakClimbing(false);
          setModalOpen(false);
          setPeakClimbing({});
          setImage(null);
          setMapImage(null);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        handleMapImageSelect={handleMapImageSelect}
        isEditPeakClimbing={isEditPeakClimbing}
        peakClimbing={peakClimbing}
        destinationList={destinationList}
        travelThemeList={travelThemeList}
        imagePreview={isEditPeakClimbing ? peakClimbing?.image : null}
        mapImagePreview={isEditPeakClimbing ? peakClimbing?.mapImage : null}
      />
      <CustomDialogModal
        opened={isDeletePeakClimbing}
        onClose={() => setIsDeletePeakClimbing(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default PeakClimbingsController;
