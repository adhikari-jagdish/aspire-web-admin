import { Modal, Stack, Text, Title, Image, Group } from "@mantine/core";

const VehicleBookingViewModal = ({
  openedView,
  onClose,
  booking,
  vehicles,
}) => {
  const getVehicleTitle = (vehicleId) => {
    const vehicle = vehicles.find((v) => v._id === vehicleId);
    return vehicle ? vehicle.title : "Unknown Vehicle";
  };

  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Vehicle Booking"
      centered
      style={{ fontSize: "15px" }}
      styles={{
        title: {
          fontSize: "34px",
          color: "#0890cf",
          fontWeight: 700,
        },
        content: {
          scrollbarWidth: "none",
        },
      }}
    >
      {booking ? (
        <Stack spacing="sm" className="text-[14px]">
          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Vehicle
          </Title>
          <Text inherit>{getVehicleTitle(booking.vehicle)}</Text>

          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Trip Type
          </Title>
          <Text inherit>{booking.tripType}</Text>

          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Starting Location
          </Title>
          <Text inherit>{booking.startingLocation}</Text>

          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Ending Location
          </Title>
          <Text inherit>{booking.endingLocation}</Text>

          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Duration
          </Title>
          <Text inherit>
            {booking.duration} {booking.durationType}
          </Text>

          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Pickup Date
          </Title>
          <Text inherit>
            {new Date(booking.pickupDate).toLocaleDateString()}
          </Text>
        </Stack>
      ) : (
        <Text color="dimmed">No booking data available.</Text>
      )}
    </Modal>
  );
};

export default VehicleBookingViewModal;
