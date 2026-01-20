import {  Modal, Select, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";

const HomeViewModel = ({ openedView, onClose, booking }) => {
  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Booking"
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
      {booking ? (
        <Stack spacing="sm" className="text-[14px]">
          <Title order={4} ta="left" c="dark">
        Booking Detaiils
      </Title>
      <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Trip Start Date
          </Title>
      <Text
        
      > {booking.tripStartDate}</Text>

      <Title order={4} mt={10}  ta="left" c="dark">
        Personal Details(Trip Leader)
      </Title>
     <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Full Name
          </Title>
      <Text
        
      > {booking.fullname}</Text>

         <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Email
          </Title>
      <Text
        
      > {booking.email}</Text>

         <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Country
          </Title>
      <Text
        
      > {booking.country}</Text>

       <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Contact Number
          </Title>
      <Text
        
      > {booking.contactNumber}</Text>

        <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Comments/Questions
          </Title>
      <Text
        
      > {booking.commentOrQuestion}</Text>

        </Stack>
      ) : (
        <Text color="dimmed">No destination data available.</Text>
      )}
    </Modal>
  );
};

export default HomeViewModel;
