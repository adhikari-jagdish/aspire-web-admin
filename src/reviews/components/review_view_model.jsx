import { Modal, Stack, Text, Title, Image, SimpleGrid } from "@mantine/core";
import SafeHtml from "../../common/common_view_components/safeHtml";

const ReviewViewModel = ({ openedView, onClose, review }) => {
  const formatFancyDate = (dateStr) => {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    const day = date.getDate();

    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
    };
    return `${day}${getOrdinal(day)} ${date.toLocaleString("en-US", {
      month: "long",
    })} ${date.getFullYear()}`;
  };

  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Review"
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
      {review ? (
        <Stack spacing="sm" className="text-[14px]">
          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Posted By
          </Title>
          <Text inherit>{review?.postedBy}</Text>

          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Post Date
          </Title>
          <Text inherit>{formatFancyDate(review?.postDate)}</Text>

          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Description
          </Title>
          <Text className="h-25 overflow-y-scroll" inherit>
            <SafeHtml html={review?.description} />
          </Text>

          {review?.imageUrl?.length > 0 && (
            <>
              <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
                Images
              </Title>
              <SimpleGrid cols={3} spacing="sm">
                {review.imageUrl.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt={`Review Image ${idx + 1}`}
                    radius="md"
                    withPlaceholder
                  />
                ))}
              </SimpleGrid>
            </>
          )}
        </Stack>
      ) : (
        <Text color="dimmed">No review data available.</Text>
      )}
    </Modal>
  );
};

export default ReviewViewModel;
