import { Image, Modal, Stack, Text, Title } from "@mantine/core";
import SafeHtml from "../../common/common_view_components/safeHtml";

const DestinationViewModel = ({ openedView, onClose, destination }) => {
  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Destination"
      centered
      style={{ fontSize: "15px" }}
      styles={{
         title: {
          fontSize: "34px",
          color: "#0890cf",
          fontWeight: 700
        },
        content:{
          scrollbarWidth: "none"
        }
      }}
      
    >
      {destination ? (
        <Stack spacing="sm" className="text-[14px]">
          <Title  style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
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
            <SafeHtml html={destination?.description} />
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
