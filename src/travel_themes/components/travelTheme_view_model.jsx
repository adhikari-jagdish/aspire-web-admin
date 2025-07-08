import { Image, Modal, Stack, Text, Title } from "@mantine/core";

const TravelThemeViewModel = ({ openedView, onClose, travelTheme }) => {
  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Travel Theme"
      centered
       styles={{
        title: {
          fontSize: "34px",
          color: "#0890cf",
          fontWeight: 700
        }
      }}
      
    >
      {travelTheme ? (
        <Stack spacing="sm" className="text-[14px]">
          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Title
          </Title>
          <Text inherit>{travelTheme?.title}</Text>


          {travelTheme?.image && (
            <>
              <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
                Image
              </Title>
              <Image
                src={travelTheme.image}
                alt="Travel Theme"
                readius="md"
                withPlaceHolder
              />
            </>
          )}
        </Stack>
      ) : (
        <Text color="dimmed">No Travel Theme data available.</Text>
      )}
    </Modal>
  );
};

export default TravelThemeViewModel;
