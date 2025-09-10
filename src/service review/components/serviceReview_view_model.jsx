import { Image, Modal, Stack, Text, Title } from "@mantine/core";
import CommonRichTextViewComponent from "../../common/common_view_components/tour_trek_view_common_components/common_richtext_view_component";
import SafeHtml from "../../common/common_view_components/safeHtml";

const ServiceReviewViewModel = ({ openedView, onClose, serviceReview }) => {
  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Service Review"
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
      {serviceReview ? (
        <Stack spacing="sm" className="text-[14px]">
          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Review
          </Title>
          <Text inherit>{serviceReview?.review}</Text>

        <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Details
          </Title>
          <SafeHtml html={serviceReview?.details} />

          {serviceReview?.icon && (
            <>
              <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
                Icon
              </Title>
              <Image
                src={serviceReview.icon}
                alt="serviceReview"
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

export default ServiceReviewViewModel;
