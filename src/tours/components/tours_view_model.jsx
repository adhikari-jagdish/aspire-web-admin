import { Image, Modal, Stack, Text, Title } from "@mantine/core";
import SafeHtml from "../../common/common_view_components/safeHtml";

const titles = [
  { name : "Destinations", label: "destinationIds"},
  {name : "Travel Themes", label: "travelThemeIds"},
  {name: "Title", label: "title"},
  {name: "Duration", label: "duration"},
  {name: "Overview", label: "overview"},
  {name: "Trip Highlights", label: "tripHighlights"},
  {name: "Itinerary", label: "itinerary"},
  {name: "Inclusions", label: "inclusions"},
  {name: "Exclusions", label: "exclusions"},
  {name: "Hotels", label: "hotels"},
  {name: "Discount", label: "discountInPercentage"},
];
const ToursViewModel = ({
  openedView,
  onClose,
  tour,
  destinationList,
  travelThemeList,
  tripHighlightList
}) => {
  const destinationIds = tour.destinationIds;
  const destinations = destinationList?.filter((dl) =>
    destinationIds?.some((d) => dl._id === d)
  );
  const travelThemeIds = tour.travelThemeIds;
  const travelThemes = travelThemeList?.filter((tl) =>
    travelThemeIds?.some((t) => tl._id === t)
  );
 const tripHighlightIds = tour?.tripHighlights?.map(t => t.tripHighlightsId);
 const tripHighlights = tripHighlightList.filter(trip => tripHighlightIds?.some(t => trip._id === t));
 
 return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Tour Package"
      centered
      size='xxl'
      style={{ fontSize: "15px" }}
    >
    {tour?.image && (
            <>
              <Title style={{ fontWeight: "500", fontSize: "20px" }} order={4}>
                Image
              </Title>
              <Image
                src={tour.image}
                alt="Travel Theme"
                radius="md"
                 h={1000}
                withPlaceHolder
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
              />
            </>
          )}
      {tour ? (
        <Stack spacing="sm" className="text-[14px]">
          {titles.map((t, idx) => {
            const key = t.label;
            const value = tour[key];

            let content;

            if(key === "destinationIds") {
              content = destinations?.map(d => d.title).join(", ") || "N/A";
            } else if (key === "travelThemeIds") {
              content = travelThemes?.map(t => t.title).join(", ") || "N/A";
            } else if (key === "overview" || key === "inclusions" || key ==="exclusions"){
              content = <SafeHtml html={value} />
            } else if( key === "itinerary" && Array.isArray(value)) {
              content = (
                <ul className="space-y-3">
                  {value.map((day, idx) => (
                    <li>
                      <span>{day.dayAndTitle}</span> <br /><span>Details: </span>  {day.details?.[0]}
                    </li>
                  ))}
                </ul>
              )
            } else if(key === "hotels" && Array.isArray(value)){
              content = (
                <ul className="space-y-3">
                  {value.map((hotel, idx) => (
                    <li key={idx}>{hotel?.title}</li>
                  ))}
                </ul>
              )
            } else if( key === "tripHighlights" && Array.isArray(value)){
              content = (
                <ul className="space-y-3">
                  {value.map((trip, idx )=> (
                    <div key={idx}>
                      <li>Title: {tripHighlights[idx]?.title}  </li>
                    <li>Description: {trip.description}</li>
                    </div>
                  ))}
                </ul>
              )
            } else if(key === "duration"){
              content = ( value + " day(s)")
            } else if(key === "discountInPercentage"){
              content = ( value + "%")
            }
             else {
              content = <Text inherit>{value || "N/A"}</Text>
            }
         return (
            <>
            
              <Title style={{ fontWeight: "500", fontSize: "20px" }} order={4}>
            {t.name }
          </Title>
          <Text  tyle={{ fontSize: "18px" }}>{content || "N/A"}</Text>
            </>
          )})}

          

          
        </Stack>
      ) : (
        <Text color="dimmed">No tour data available.</Text>
      )}
    </Modal>
  );
};

export default ToursViewModel;
