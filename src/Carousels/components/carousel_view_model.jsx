import { Image, Modal, Stack, Text, Title } from "@mantine/core";

const CarouselViewModel = ({ openedView, onClose, carousel }) => {
  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Carousel"
      centered
      style={{ fontSize: "15px" }}
      
    >
      {carousel ? (
        <Stack spacing="sm" className="text-[14px]">
          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Title
          </Title>
          <Text inherit>{carousel?.title}</Text>

          <Title
            style={{ fontWeight: "500", fontSize: "15px" }}
            order={4}
            inherit
          >
            Description
          </Title>
          <Text className="h-25 overflow-y-scroll" inherit>
            {carousel?.description}
          </Text>

          {carousel?.image && (
            <>
              <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
                Image
              </Title>
              <Image
                src={carousel.image}
                alt="Carousel"
                readius="md"
                withPlaceHolder
              />
            </>
          )}
        </Stack>
      ) : (
        <Text color="dimmed">No carousel data available.</Text>
      )}
    </Modal>
  );
};

export default CarouselViewModel;
