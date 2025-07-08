import { Image, Modal, Stack, Text, Title } from "@mantine/core";

const TripHighlightViewModel = ({ openedView, onClose, tripHighlight }) => {
  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Trip Highlight"
      centered
       styles={{
        title: {
          fontSize: "34px",
          color: "#0890cf",
          fontWeight: 700
        },
        content: {
          scrollbarWidth: "none", 
        },
      }}
      
    >
      {tripHighlight ? (
        <Stack spacing="sm" className="text-[14px]">
          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Title
          </Title>
          <Text inherit>{tripHighlight?.title}</Text>

          {tripHighlight?.icon && (
            <>
              <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
                Icon
              </Title>
              <Image
                src={tripHighlight.icon}
                alt="tripHighlight"
                radius="md"
                withPlaceHolder
                h={100}
                w="auto"
                fit="contain"
              />
            </>
          )}
        </Stack>
      ) : (
        <Text color="dimmed">No Trip Highlight data available.</Text>
      )}
    </Modal>
  );
};

export default TripHighlightViewModel;
