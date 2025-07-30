import { Modal, Stack, Text, Title, Image } from "@mantine/core";
import SafeHtml from "../../common/common_view_components/safeHtml";

const BlogViewModel = ({ openedView, onClose, blog }) => {
  const formatFancyDate = (dateStr) => {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    const day = date.getDate();

    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
    };

    const dayWithOrdinal = `${day}${getOrdinal(day)}`;

    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    return `${dayWithOrdinal} ${month} ${year}`;
  };

  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Blog"
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
      {blog ? (
        <Stack spacing="sm" className="text-[14px]">
          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Title
          </Title>
          <Text inherit>{blog?.title}</Text>

          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Posted By
          </Title>
          <Text inherit>{blog?.postedBy}</Text>

          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Post Date
          </Title>
          <Text inherit>{formatFancyDate(blog?.postDate)}</Text>

          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Description
          </Title>
          <Text className="h-25 overflow-y-scroll" inherit>
            <SafeHtml html={blog?.description} />
          </Text>

          {blog?.image && (
            <>
              <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
                Image
              </Title>
              <Image
                src={blog.image}
                alt="Blog Image"
                radius="md"
                withPlaceholder
              />
            </>
          )}
        </Stack>
      ) : (
        <Text color="dimmed">No blog data available.</Text>
      )}
    </Modal>
  );
};

export default BlogViewModel;
