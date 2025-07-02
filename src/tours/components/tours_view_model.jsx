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
  {name: "Discount In Percentage", label: "discountInPercentage"},
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
      style={{ fontSize: "15px" }}
    >
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
            } else if (key === "overview"){
              content = <SafeHtml html={value} />
            }   else if ((key === "inclusions" || key === "exclusions") && Array.isArray(value)){
              content = value.map((v, idx) => <SafeHtml key={idx} html={v} />);
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
            }
             else {
              content = <Text inherit>{value || "N/A"}</Text>
            }
         return (
            <>
              <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
            {t.name }
          </Title>
          <Text inherit>{content || "N/A"}</Text>
            </>
          )})}

          

          {tour?.image && (
            <>
              <Title style={{ fontWeight: "500", fontSize: "15px" }} order={4}>
                Image
              </Title>
              <Image
                src={tour.image}
                alt="Travel Theme"
                readius="md"
                withPlaceHolder
              />
            </>
          )}
        </Stack>
      ) : (
        <Text color="dimmed">No tour data available.</Text>
      )}
    </Modal>
  );
};

export default ToursViewModel;
