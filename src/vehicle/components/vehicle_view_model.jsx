import { Modal, Stack, Text, Title, Image } from "@mantine/core";

const VehicleViewModal = ({ openedView, onClose, vehicle }) => {
  const formatCurrency = (value) => {
    if (!value && value !== 0) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Vehicle"
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
      {vehicle ? (
        <Stack spacing="sm" className="text-[14px]">
          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Title
          </Title>
          <Text inherit>{vehicle?.title}</Text>

          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Description
          </Title>
          <Text inherit>{vehicle?.description}</Text>

          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Price From
          </Title>
          <Text inherit>{formatCurrency(vehicle?.priceFrom)}</Text>

          {vehicle?.image && (
            <>
              <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
                Image
              </Title>
              <Image
                src={vehicle.image}
                alt="Vehicle Image"
                radius="md"
                withPlaceholder
              />
            </>
          )}
        </Stack>
      ) : (
        <Text color="dimmed">No vehicle data available.</Text>
      )}
    </Modal>
  );
};

export default VehicleViewModal;
