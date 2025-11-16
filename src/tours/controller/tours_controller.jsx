import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import { useNotification } from "../../common/hooks/useNotification";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import ToursView from "../view/tours_view";
import DestinationRepository from "../../destinations/repository/destination_repository";
import ToursViewModel from "../components/tours_view_model";
import ToursAddEditModel from "../components/tour_add_edit_model";
import TravelThemeRepository from "../../travel_themes/repository/travelTheme_repository";
import TripHighlightRepository from "../../trip highlights/repository/tripHighlight_repository";
import { FieldValidator } from "../../common/common_view_components/validations/common_tour_trek_validator";
import PackageRepository from "../../common/package/package_repository";
import { usePackageForm } from "../../common/hooks/usePackageForm";
import usePackageController from "../../common/hooks/usePackageController";



const ToursController = () => {
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const packageController = usePackageController({
    packageType: "Tour",
    isMapImage: false,
    showLoading, 
    hideLoading
  });

  const {
    modalOpen,
    setModalOpen,
    packageList: tourList,
    handleClick,
    handleEditButtonClick,
    onDeleteButtonClick,
    handleViewButtonClick,
    destinationList,
    travelThemeList,
    openedView,
    setOpenedView,
    packageItem: tour,
    setIsEditPackage: setIsEditTour,
    handleSubmit,
    handleImageSelect,
    isEditPackage: isEditTour,
    isDeletePackage: isDeleteTour,
    setIsDeletePackage: setIsDeleteTour,
    handleDeleteButtonClick,
    imagePreview
  } = packageController;
  
  const columns = [
    { label: "Destination", accessor: "destinationIds" },
    { label: "Title", accessor: "title" },
    { label: "Duration", accessor: "duration" },
    { label: "Discount", accessor: "discountInPercentage" },
    { label: "Image", accessor: "image" },
  ];
  return (
    <>
      <ToursView
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        columns={columns}
        tours={tourList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
        destinationList={destinationList}
        travelThemeList={travelThemeList}
      />
      <ToursViewModel
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        tour={tour}
      />
      <ToursAddEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditTour(false);
          setModalOpen(false);
        }}
        handleSubmit={handleSubmit}
        handleImageSelect={handleImageSelect}
        isEditTour={isEditTour}
        tour={tour}
        destinationList={destinationList}
        travelThemeList={travelThemeList}
        imagePreview={imagePreview ?? (isEditTour ? tour?.image : null)}
      />
      <CustomDialogModal
        opened={isDeleteTour}
        onClose={() => setIsDeleteTour(false)}
        title="Alert!!"
        message="Are you sure you want to delete?"
        onConfirm={handleDeleteButtonClick}
      />
      <LoadingOverlayComponent />
    </>
  );
};

export default ToursController;
