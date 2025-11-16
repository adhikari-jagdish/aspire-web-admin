import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import TrekkingsView from "../view/trekkings_view";
import TrekkingsViewModel from "../components/trekking_view_model";
import TrekkingsAddEditModel from "../components/trekking_add_edit_model";
import usePackageController from "../../common/hooks/usePackageController";


const TrekkingsController = () => {
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const packageController = usePackageController({
    packageType: "Trekking",
    isMapImage: true,
    showLoading, 
    hideLoading
  });

  const {
    modalOpen,
    setModalOpen,
    packageList: trekkingList,
    handleClick,
    handleEditButtonClick,
    onDeleteButtonClick,
    handleViewButtonClick,
    destinationList,
    travelThemeList,
    openedView,
    setOpenedView,
    packageItem: trekking,
    setIsEditPackage: setIsEditTrekking,
    handleSubmit,
    handleImageSelect,
    isEditPackage: isEditTrekking,
    isDeletePackage: isDeleteTrekking,
    setIsDeletePackage: setIsDeleteTrekking,
    handleDeleteButtonClick,
    setMapImage,
    setPackageItem: setTrekking,
    handleMapImageSelect,
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
      <TrekkingsView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditTrekking(false);
          setTrekking({});
          setImage(null);
          setMapImage(null);
        }}
        columns={columns}
        trekkings={trekkingList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
        destinationList={destinationList}
        travelThemeList={travelThemeList}
      />
      <TrekkingsViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        trekking={trekking}
      />
      <TrekkingsAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditTrekking(false);
          setModalOpen(false);
          setTrekking({});
          setImage(null);
          setMapImage(null);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        handleMapImageSelect={handleMapImageSelect}
        isEditTrekking={isEditTrekking}
        trekking={trekking}
        destinationList={destinationList}
        travelThemeList={travelThemeList}
        imagePreview={isEditTrekking ? trekking?.image : null}
        mapImagePreview={isEditTrekking ? trekking?.mapImage : null}
        
      />
      <CustomDialogModal
        opened={isDeleteTrekking}
        onClose={() => setIsDeleteTrekking(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default TrekkingsController;
