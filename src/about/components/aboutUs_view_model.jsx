import { Image, Modal, Stack, Text, Title } from "@mantine/core";
import SafeHtml from "../../common/common_view_components/safeHtml";


const AboutUsViewModel = ({ openedView, onClose, aboutUs }) => {
 
console.log({aboutUs})
  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View About Us Content"
      centered
      size="xl"
      styles={{
        title: {
          fontSize: "34px",
          color: "#0890cf",
          fontWeight: 700,
        },
      }}
    >
      {aboutUs ? (
        <Stack spacing="sm" className="text-[14px]">
          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Title
          </Title>
          <Text inherit>{aboutUs?.title}</Text>

          <Title
            style={{ fontWeight: "500", fontSize: "15px" }}
            order={4}
            inherit
          >
            Description
          </Title>
          <Text className="h-25 overflow-y-scroll" inherit>
            <SafeHtml html={aboutUs?.description} />
          </Text>
          
          {aboutUs?.bannerImage && (
            <>
              <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
                Image
              </Title>
              <Image
                src={aboutUs.bannerImage}
                alt="bannerImage"
                radius="md"
                withPlaceHolder
              // w={500}
              h={400}
              fit="cover"
              />
            </>
          )}
        </Stack>
      ) : (
        <Text color="dimmed">No About us data available.</Text>
      )}
    </Modal>
  );
};

export default AboutUsViewModel;
