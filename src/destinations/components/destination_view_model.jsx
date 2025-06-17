import { Image, Modal, Stack, Text, Title } from "@mantine/core";

const DestinationViewModel = ({ openedView, onClose, destination }) => {
  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Destination"
      centered
      style={{ fontSize: "15px" }}
      
    >
      {destination ? (
        <Stack spacing="sm" className="text-[14px]">
          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Title
          </Title>
          <Text inherit>{destination?.title}</Text>

          <Title
            style={{ fontWeight: "500", fontSize: "15px" }}
            order={4}
            inherit
          >
            Description
          </Title>
          <Text className="h-25 overflow-y-scroll" inherit>
            {destination?.description}
          </Text>

          {destination?.image && (
            <>
              <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
                Image
              </Title>
              <Image
                src={destination.image}
                alt="Destination"
                readius="md"
                withPlaceHolder
              />
            </>
          )}
        </Stack>
      ) : (
        <Text color="dimmed">No destination data available.</Text>
      )}
    </Modal>
  );
};

export default DestinationViewModel;
