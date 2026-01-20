import { Image, Modal, Stack, Text, Title } from "@mantine/core";

const VideoViewModel = ({ openedView, onClose, video }) => {
  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Video"
      centered
      size={'xxl'}
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
      {video ? (
       <Stack>
           <Title  style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Video
          </Title>

          <video controls>
            <source src={video?.videoUrl}/>
          </video>
       </Stack>
      ) : (
        <Text color="dimmed">No Video data available.</Text>
      )}
    </Modal>
  );
};

export default VideoViewModel;
