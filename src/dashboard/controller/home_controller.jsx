
import { useEffect, useState } from "react";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../../common/hooks/useNotification";
import useLoadingOverlay from "../../common/hooks/useLoadingOverlay";
import HomeView from "../view/home_view";
import BookingRepository from "../../bookings/repository/booking_repository";
import HomeViewModel from "../components/home_view_model";

const HomeController = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedView, setOpenedView] = useState(false);
  const [bookingList, setBookingList] = useState([]);
  const [booking, setBooking] = useState({});
  const { getToken } = useAuth();
  const notify = useNotification();
  const { showLoading, hideLoading, LoadingOverlayComponent } =
    useLoadingOverlay();
  const [isEditBooking, setIsEditBooking] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const bookingRepository = new BookingRepository(getToken);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        showLoading();
        const bookingsResponse = await bookingRepository.getBookings();
        setBookingList(bookingsResponse.data);
      } catch (err) {
        notify({
          type: "error",
          message: err.message ?? "Something went wrong. Please try again.",
        });
      } finally {
        hideLoading();
      }
    };
    fetchBookings();
  }, []);

  const handleClick = () => {
    setModalOpen(true);
  };

  //Function to trigger when edit button is clicked
  const handleEditButtonClick = (item) => {
    setIsEditBooking(true);
    setBooking(item);
    setModalOpen(true);
    setIdToUpdate(item?._id);
  };

//   const handleSubmit = async (formData) => {
//     // const tempDiv = document.createElement("div");
//     // tempDiv.innerHTML = formData.description;
//     const isValid = valildateForm(formData);
//     if (!isValid) {
//       notify({
//         type: "errror",
//         message: isValid.message,
//       });
//       return;
//     }

//     showLoading();

//     try {
//       const response = await bookingRepository.updateBooking(
//         formData,
//         idToUpdate
//       );
//       setBookingList((prev) =>
//         prev.map((item) =>
//           item._id === idToUpdate
//             ? {
//                 ...item,
//                 tripStartDate: formData.tripStartDate,
//                 fullname: formData.fullname,
//                 email: formData.email,
//                 country: formData.country,
//                 contactNumber: formData.contactNumber,
//                 commentOrQuestion: formData.commentOrQuestion,
//               }
//             : item
//         )
//       );

//       setModalOpen(false);
//       notify({
//         type: "success",
//         message: response?.message,
//       });
//     } catch (err) {
//       notify({
//         type: "error",
//         message: err.message ?? "Something went wrong. Please try again.",
//       });
//     } finally {
//       hideLoading();
//     }
//   };
  const handleViewButtonClick = (item) => {
    setOpenedView(true);
    setBooking(item);
  };

  const columns = [
    { label: "Trip Start Date", accessor: "tripStartDate" },
    { label: "Full Name", accessor: "fullname" },
  ];
  return (
    <>
      <HomeView
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        columns={columns}
        bookings={bookingList}
        handleClick={handleClick}
        onEditButtonClick={handleEditButtonClick}
        onViewButtonClick={handleViewButtonClick}
      />

      <HomeViewModel
        openedView={openedView}
        onClose={() => {
          setOpenedView(false);
        }}
        booking={booking}
      />
      {/* <BookingEditModel
        opened={modalOpen}
        onClose={() => {
          setIsEditBooking(false);
          setModalOpen(false);
        }}
        handleSubmit={handleSubmit}
        isEditBooking={isEditBooking}
        booking={booking}
      /> */}

      <LoadingOverlayComponent />
    </>
  );
};

export default HomeController;
