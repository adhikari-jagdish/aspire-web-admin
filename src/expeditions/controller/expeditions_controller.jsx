import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import ExpeditionsView from "../view/expeditions_view";
import ExpeditionsViewModel from "../components/expeditions_view_model";
import ExpeditionsAddEditModel from "../components/expedition_add_edit_model";
import usePackageController from "../../common/hooks/usePackageController";

const ExpeditionsController = () => {
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const packageController = usePackageController({
    packageType: "Expedition",
    isMapImage: true,
    showLoading, 
    hideLoading
  });

  const {
    modalOpen,
    setModalOpen,
    packageList: expeditionList,
    handleClick,
    handleEditButtonClick,
    onDeleteButtonClick,
    handleViewButtonClick,
    destinationList,
    travelThemeList,
    openedView,
    setOpenedView,
    packageItem: expedition,
    setIsEditPackage: setIsEditExpedition,
    handleSubmit,
    handleImageSelect,
    isEditPackage: isEditExpedition,
    isDeletePackage: isDeleteExpedition,
    setIsDeletePackage: setIsDeleteExpedition,
    handleDeleteButtonClick,
    setMapImage,
    setPackageItem: setExpedition,
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
      <ExpeditionsView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditExpedition(false);
          setExpedition({});
          setImage(null);
          setMapImage(null);
        }}
        columns={columns}
        expeditions={expeditionList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
        destinationList={destinationList}
        travelThemeList={travelThemeList}
      />
      <ExpeditionsViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        expedition={expedition}
      />
      <ExpeditionsAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditExpedition(false);
          setModalOpen(false);
          setExpedition({});
          setImage(null);
          setMapImage(null);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        handleMapImageSelect={handleMapImageSelect}
        isEditExpedition={isEditExpedition}
        expedition={expedition}
        destinationList={destinationList}
        travelThemeList={travelThemeList}
        imagePreview={isEditExpedition ? expedition?.image : null}
      />
      <CustomDialogModal
        opened={isDeleteExpedition}
        onClose={() => setIsDeleteExpedition(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default ExpeditionsController;
