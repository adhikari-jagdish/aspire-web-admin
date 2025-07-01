import { Image, Modal, Stack, Text, Title } from "@mantine/core";

const TripHighlightViewModel = ({ openedView, onClose, tripHighlight }) => {
  console.log({tripHighlight})
  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Trip Highlight"
      centered
      style={{ fontSize: "15px" }}
      
    >
      {tripHighlight ? (
        <Stack spacing="sm" className="text-[14px]">
          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Title
          </Title>
          <Text inherit>{tripHighlight?.title}</Text>

          {/* {tripHighlight?.image && (
            <>
              <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
                Image
              </Title>
              <Image
                src={tripHighlight.image}
                alt="tripHighlight"
                readius="md"
                withPlaceHolder
              />
            </>
          )} */}
        </Stack>
      ) : (
        <Text color="dimmed">No Trip Highlight data available.</Text>
      )}
    </Modal>
  );
};

export default TripHighlightViewModel;
