import { Image, Modal, Stack, Text, Title } from "@mantine/core";
import SafeHtml from "../../common/common_view_components/safeHtml";
import overview from '../../assets/icons/overview.svg';
import hotels from '../../assets/icons/hotels.svg';
import includes from '../../assets/icons/includes.svg';
import excludes from '../../assets/icons/excludes.svg';
import itinerary from '../../assets/icons/itinerary.svg';
import location from '../../assets/icons/location.svg';
import packageRate from '../../assets/icons/packageRate.svg';

const titles = [
  { name: "Trip Highlights", label: "tripHighlights" },
  { name: "Destinations", label: "destinationIds" },
  { name: "Travel Themes", label: "travelThemeIds" },
  { name: "Title", label: "title" },
  { name: "Duration", label: "duration" },
  { name: "Overview", label: "overview" },
  { name: "Itinerary", label: "itinerary" },
  { name: "Package Rate", label: "packageRate" },
  { name: "Inclusions", label: "inclusions" },
  { name: "Exclusions", label: "exclusions" },
  { name: "Hotels", label: "hotels" },
  { name: "Discount", label: "discountInPercentage" },
];

const buttons = [
  {name: "Overview", icon: overview},
  {name: "Itinerary", icon: itinerary},
  {name: "Includes", icon: includes},
  {name: "Exludes", icon: excludes},
  {name: "Hotels", icon: hotels},
  {name: "PackageRate", icon: packageRate}
]
const ToursViewModel = ({
  openedView,
  onClose,
  tour,
  destinationList,
  travelThemeList,
  tripHighlightList,
}) => {
  const destinationIds = tour.destinationIds;
  const destinations = destinationList?.filter((dl) =>
    destinationIds?.some((d) => dl._id === d)
  );
  const travelThemeIds = tour.travelThemeIds;
  const travelThemes = travelThemeList?.filter((tl) =>
    travelThemeIds?.some((t) => tl._id === t)
  );
  const tripHighlightIds = tour?.tripHighlights?.map((t) => t.tripHighlightsId);
  const tripHighlights = tripHighlightList.filter((trip) =>
    tripHighlightIds?.some((t) => trip._id === t)
  );
  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Tour Package"
      centered
      size="xxl"
      style={{ fontSize: "15px" }}
    >
      {tour?.image && (
        <>
          {/* <Title style={{ fontWeight: "500", fontSize: "20px" }} order={4}>
                Image
              </Title> */}
          <Image
            src={tour.image}
            alt="Travel Theme"
            radius="md"
            h={350}
            w={500}
            fit="cover"
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

            if (key === "tripHighlights" && Array.isArray(value)) {
              content = (
                <ul className="space-y-3">
                  {value.map((trip, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <img src={tripHighlights[idx]?.icon} alt="tripHighlightIcon" className="w-8 mt-2" />
                      <div className="pt-2">
                        <li><span className="font-[600]">Title</span>: {tripHighlights[idx]?.title} </li>
                      <li><span className="font-[600]">Description</span>: {trip.description}</li>
                      </div>
                    </div>
                  ))}
                </ul>
              );
            } else if (key === "destinationIds") {
              content = 
              <div className="flex gap-3 flex-wrap w-[500px]">
              {destinations?.map((d) => 
              
                <li className="list-none ring w-fit rounded-full   px-2 py-1 mt-2">{ d.title || "N/A"}</li>
              )}
              </div>
            } else if (key === "travelThemeIds") {
              content = <div className="flex gap-3 flex-wrap w-[500px]">
              {travelThemes?.map((t) => 
              
                <li className="list-none ring w-fit rounded-full  px-2 py-1 mt-2">{ t.title || "N/A"}</li>
              )}
              </div>
            } else if (
              key === "overview" ||
              key === "inclusions" ||
              key === "exclusions"
            ) {
              content = <SafeHtml html={value} />;
            } else if (key === "itinerary" && Array.isArray(value)) {
              content = (
                <ul className="space-y-3">
                  {value.map((day, idx) => (
                    <li>
                      <span>{day.dayAndTitle}</span> <br />
                      <span>Details: </span> {day.details?.[0]}
                    </li>
                  ))}
                </ul>
              );
            } else if (key === "hotels" && Array.isArray(value)) {
              content = (
                <ul className="space-y-3">
                  {value.map((hotel, idx) => (
                    <li key={idx}>{hotel?.title}</li>
                  ))}
                </ul>
              );
            } else if (key === "packageRate" && Array.isArray(value)) {
              content = (
                <ul className="space-y-3">
                  {value.map((p, idx) => (
                    <div key={p._id || idx} className="space-y-2">
                      <li>Hotel Category: {p.hotelCategory} </li>
                      <li>Rate in NPR: {p.rateInNPR}</li>
                      <li>Rate in USD: {p.rateInUSD}</li>
                      <li>Rate in INR: {p.rateInINR}</li>
                      <li>Rate in EUR: {p.rateInEUR}</li>
                    </div>
                  ))}
                </ul>
              );
            } else if (key === "duration") {
              content = value + " day(s)";
            } else if (key === "discountInPercentage") {
              content = value + "%";
            } else {
              content = <Text inherit>{value || "N/A"}</Text>;
            }
            return (
              <div className="space-y-2 mt-4">
                <Title
                  style={{ fontWeight: "500", fontSize: "20px" }}
                  order={4}
                >
                  {t.name}
                </Title>
                <Text tyle={{ fontSize: "18px" }}>{content || "N/A"}</Text>

                {key === 'travelThemeIds' && (
                  <div className="mt-6 space-x-4 space-y-4 flex flex-wrap w-[500px] text-">
                    {buttons.map(b => (
                      <button className="border bg-blue-600 text-white flex items-center justify-center  gap-2 rounded p-1 cursor-pointer hover:bg-blue-700">
                      <img src={b?.icon} alt={`${b.name} Icon`} className="w-4"/>
                      {b.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </Stack>
      ) : (
        <Text color="dimmed">No tour data available.</Text>
      )}
    </Modal>
  );
};

export default ToursViewModel;
