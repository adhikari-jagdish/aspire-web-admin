import { Image, Modal, Stack, Text, Title } from "@mantine/core";

const HotelViewModel = ({ openedView, onClose, hotel, destinationList }) => {
  const destination = destinationList?.find(d => d._id === hotel.destinationId);
  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Hotel"
      centered
      style={{ fontSize: "15px" }}
      
    >
      {hotel ? (
        <Stack spacing="sm" className="text-[14px]">
         <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Destination 
          </Title>
          <Text inherit>{destination?.title}</Text>

          <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Title
          </Title>
          <Text inherit>{hotel?.title}</Text>

           <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            City
          </Title>
          <Text inherit>{hotel?.city}</Text>

           <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Rating
          </Title>
          <Text inherit>{hotel?.rating}</Text>

           <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Overview
          </Title>
          <Text inherit>{hotel?.overview}</Text>

           <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Hotel Category
          </Title>
          <Text inherit>{hotel?.hotelCategory}</Text>

           <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            Rate
          </Title>
          <div className="space-y-3">
            {hotel?.rate?.map((item, idx) => (
              <>
                <h1 className="font-[500]">{item.roomCategory}</h1>
              <div className="text-[14px]">
                NPR: {item.rateInNPR } |  USD: {item.rateInUSD } | INR: {item.rateInINR } | BDT: {item.rateInBDT }  
              </div>
              </>
            ))}
          </div>


          {hotel?.image && (
            <>
              <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
                Image
              </Title>
              <Image
                src={hotel.image}
                alt="Travel Theme"
                readius="md"
                withPlaceHolder
              />
            </>
          )}
        </Stack>
      ) : (
        <Text color="dimmed">No Hotel data available.</Text>
      )}
    </Modal>
  );
};

export default HotelViewModel;
