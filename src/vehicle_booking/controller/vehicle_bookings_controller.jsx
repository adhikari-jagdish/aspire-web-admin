import { useState, useEffect } from "react";
import VehicleBookingsView from "../view/vehicle_bookings_view";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import VehicleBookingRepository from "../repository/vehicle_booking_repository";
import useAuth from "../../auth/components/use_auth";
import CustomDialogModal from "../../common/common_view_components/custom_dialog_model";
import VehicleBookingViewModal from "../components/vehicle_booking_view_model";
import VehicleBookingEditModal from "../components/vehicle_edit_model";
import VehicleRepository from "../../vehicle/repository/vehicle_repository";

const VehicleBookingsController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [bookingList, setBookingList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [booking, setBooking] = useState({});
  const [isEditBooking, setIsEditBooking] = useState(false);
  const [isDeleteBooking, setIsDeleteBooking] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const { getToken } = useAuth();
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();

  const vehicleBookingRepository = new VehicleBookingRepository(getToken);
  const vehicleRepository = new VehicleRepository(getToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsRes =
          await vehicleBookingRepository.getAllVehicleBookings();
        const formattedBookings = bookingsRes.data.map((booking) => ({
          ...booking,
          pickupDate: booking.pickupDate
            ? new Date(booking.pickupDate).toISOString().split("T")[0]
            : "",
        }));
        setBookingList(formattedBookings);

        const vehiclesRes = await vehicleRepository.getAllVehicles();
        const vehicles = vehiclesRes.data.map((vehicle) => ({
          _id: vehicle._id,
          title: vehicle.title,
        }));
        setVehicleList(vehicles);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Failed to load data.",
        });
      }
    };

    fetchData();
  }, []);

  const handleEditButtonClick = (item) => {
    setIsEditBooking(true);
    setBooking(item);
    setModalOpen(true);
    setIdToUpdate(item._id);
  };

  const handleViewButtonClick = (item) => {
    setBooking(item);
    setOpenedView(true);
  };

  const onDeleteButtonClick = (item) => {
    setIsDeleteBooking(true);
    setIdToDelete(item._id);
  };

  const handleDeleteButtonClick = async () => {
    try {
      showLoading();
      await vehicleBookingRepository.deleteVehicleBooking(idToDelete);
      setBookingList((prev) => prev.filter((b) => b._id !== idToDelete));
      notify({ type: "success", message: "Booking deleted successfully." });
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Failed to delete booking.",
      });
    } finally {
      hideLoading();
    }
  };

  const handleSubmit = async (formData) => {
    if (
      formData.vehicle.trim() === "" ||
      formData.tripType.trim() === "" ||
      formData.startingLocation.trim() === "" ||
      formData.endingLocation.trim() === "" ||
      formData.duration <= 0 ||
      formData.pickupDate === ""
    ) {
      notify({
        type: "error",
        message: "All fields are required!",
      });
      return;
    }

    showLoading();

    try {
      let response;

      if (isEditBooking) {
        response = await vehicleBookingRepository.updateVehicleBooking(
          formData,
          idToUpdate
        );
        setBookingList((prev) =>
          prev.map((b) => (b._id === idToUpdate ? { ...b, ...formData } : b))
        );
      }

      notify({ type: "success", message: response.message });
      setModalOpen(false);
    } catch (err) {
      notify({
        type: "error",
        message: err.message ?? "Something went wrong. Please try again.",
      });
    } finally {
      hideLoading();
    }
  };

  const columns = [
    { label: "Vehicle", accessor: "vehicle" },
    { label: "Trip Type", accessor: "tripType" },
    { label: "Starting Location", accessor: "startingLocation" },
    { label: "Ending Location", accessor: "endingLocation" },
    { label: "Duration", accessor: "duration" },
    { label: "Pickup Date", accessor: "pickupDate" },
  ];

  return (
    <>
      <VehicleBookingsView
        columns={columns}
        bookings={bookingList}
        onEditButtonClick={handleEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />

      <VehicleBookingViewModal
        openedView={openedView}
        onClose={() => setOpenedView(false)}
        booking={booking}
        vehicles={vehicleList}
      />

      <VehicleBookingEditModal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditBooking(false);
        }}
        isEditBooking={isEditBooking}
        handleSubmit={handleSubmit}
        booking={booking}
        vehicles={vehicleList}
      />

      <CustomDialogModal
        opened={isDeleteBooking}
        onClose={() => setIsDeleteBooking(false)}
        title="Alert!!"
        message="Are you sure you want to delete this booking?"
        onConfirm={handleDeleteButtonClick}
      />

      <LoadingOverlayComponent />
    </>
  );
};

export default VehicleBookingsController;
