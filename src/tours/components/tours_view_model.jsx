import { Image, Modal, Stack, Table, Text, Title } from "@mantine/core";
import SafeHtml from "../../common/common_view_components/safeHtml";
import overview from "../../assets/icons/overview.svg";
import hotels from "../../assets/icons/hotels.svg";
import includes from "../../assets/icons/includes.svg";
import excludes from "../../assets/icons/excludes.svg";
import itinerary from "../../assets/icons/itinerary.svg";
import location from "../../assets/icons/location.svg";
import packageRate from "../../assets/icons/packageRate.svg";
import { useRef } from "react";
import { FaRupeeSign, FaDollarSign, FaEuroSign } from 'react-icons/fa';


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
  { name: "Overview", icon: overview },
  { name: "Itinerary", icon: itinerary },
  { name: "Inclusions", icon: includes },
  { name: "Exclusions", icon: excludes },
  { name: "Hotels", icon: hotels },
  { name: "PackageRate", icon: packageRate },
];

const ToursViewModel = ({
  openedView,
  onClose,
  tour,
  destinationList,
  travelThemeList,
  tripHighlightList,
}) => {
  const scrollContainerRef = useRef(null);
  const sectionsRef = {
    overview: useRef(null),
    itinerary: useRef(null),
    inclusions: useRef(null),
    exclusions: useRef(null),
    hotels: useRef(null),
    packagerate: useRef(null),
  };
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

  const scrollToSection = (key) => {
    const ref = sectionsRef[key];
    if (ref?.current && scrollContainerRef.current) {
      const containerTop =
        scrollContainerRef.current.getBoundingClientRect().top; //Get the container’s (view modal) top position in the viewport (window):
      const sectionTop = ref.current.getBoundingClientRect().top; //Get the section’s top position in the viewport you want to scroll:
      const scrollOffset =
        sectionTop - containerTop + scrollContainerRef.current.scrollTop;

      scrollContainerRef.current.scrollTo({
        top: scrollOffset - 40,
        behavior: "smooth",
      });
    }
  };
const tableInsideBorder = "text-center border"
  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title="View Tour Package"
      centered
      size="xxl"
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
      <div
        ref={scrollContainerRef}
        className="scroll-container overflow-y-auto max-h-[calc(100vh-200px)]"
      >
        {tour?.image && (
          <>
            {/* <Title style={{ fontWeight: "500", fontSize: "20px" }} order={4}>
                Image
              </Title> */}
            <div className="w-full h-[80vh] pt-[56.25%] relative">
              <Image
                src={tour.image}
                alt="Travel Theme"
                radius="md"
                h="100%"
                w="100%"
                fit="cover"
                withPlaceHolder
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                className="absolute top-0 "
              />
            </div>
          </>
        )}
        {tour ? (
          <Stack spacing="sm" className="text-[14px] w-[1250px]">
            {titles.map((t) => {
              const key = t.label;
              const value = tour[key];

              let content;
              let discountBadge = null;

              if (key === "overview" && tour.discountInPercentage) {
                discountBadge = (
                  <div
                    className="
                    absolute right-[20px]
                    top-[-20px]
                    translate-y-[-50%]
                    bg-red-600
                    text-white
                    px-2.5
                    py-1.5
                    rounded-lg
                    font-bold
                    text-sm
                    whitespace-nowrap
                    shadow-md
                    pointer-events-none
                    select-none"
                  >
                    <span style={{ fontSize: "20px", lineHeight: 1 }}>🏷️</span>
                    {tour.discountInPercentage}% off
                  </div>
                );
              }

              if (key === "tripHighlights" && Array.isArray(value)) {
                content = (
                  <ul className="space-y-3">
                    {value.map((trip, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <img
                          src={tripHighlights[idx]?.icon}
                          onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loops if fallback img also fails to laod
                            e.target.src =
                              "https://img.favpng.com/5/1/8/no-icon-png-favpng-PdDFZn3LtBiKi6JEapF5jAtgi.jpg";
                          }}
                          alt="Icon"
                          className="w-8 mt-2"
                        />
                        <div className="pt-2">
                          <li>
                            <span className="font-[600]">Title</span>:{" "}
                            {tripHighlights[idx]?.title}{" "}
                          </li>
                          <li>
                            <span className="font-[600]">Description</span>:{" "}
                            {trip.description}
                          </li>
                        </div>
                      </div>
                    ))}
                  </ul>
                );
              } else if (key === "destinationIds") {
                content = (
                  <div className="flex gap-3 flex-wrap w-[500px] pl-2">
                    {destinations?.map((d) => (
                      <li className="list-none ring w-fit rounded-full   px-2 py-1 mt-2">
                        {d.title || "N/A"}
                      </li>
                    ))}
                  </div>
                );
              } else if (key === "travelThemeIds") {
                content = (
                  <div className="flex gap-3 flex-wrap w-[500px] pl-2">
                    {travelThemes?.map((t) => (
                      <li className="list-none ring w-fit rounded-full  px-2 py-1 mt-2">
                        {t.title || "N/A"}
                      </li>
                    ))}
                  </div>
                );
              } else if (
                key === "overview" ||
                key === "inclusions" ||
                key === "exclusions"
              ) {
                content = (
                  <div
                    ref={sectionsRef[t.label?.toLowerCase?.()]}
                    style={{ position: "relative", paddingLeft: "5px" }}
                  >
                    <SafeHtml html={value} />
                    {discountBadge}
                  </div>
                );
              } else if (key === "itinerary" && Array.isArray(value)) {
                content = (
                  <ul
                    ref={sectionsRef[t.label?.toLowerCase?.()]}
                    className="space-y-3 "
                  >
                    {value.map((day, idx) => (
                      <li className="bg-gray-100 p-2 rounded">
                        <strong>{day.dayAndTitle}</strong> <br />
                        <span>Details: </span> {day.details?.[0]}
                      </li>
                    ))}
                  </ul>
                );
              } else if (key === "hotels" && Array.isArray(value)) {
                content = (
                  <ul
                    ref={sectionsRef[t.label?.toLowerCase?.()]}
                    className="space-y-3"
                  >
                    {value.map((hotel, idx) => (
                      <li key={idx}>{hotel?.title}</li>
                    ))}
                  </ul>
                );
              } else if (key === "packageRate" && Array.isArray(value)) {
                content = (
                  <div
  ref={sectionsRef[t.label?.toLowerCase?.()]}
  className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5"
>
  {value.map((p, idx) => (
    <div
      key={p._id || idx}
      className="bg-white shadow-md rounded-lg overflow-hidden border"
    >
      <div className="bg-gray-100 p-3 border-b text-center text-lg font-bold ">
        Hotel Category: {p.hotelCategory}
      </div>

      <div className="p-4">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-2 border-r">NPR</th>
              <th className="px-4 py-2 border-r">INR</th>
              <th className="px-4 py-2 border-r">USD</th>
              <th className="px-4 py-2">EUR</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white hover:bg-gray-50 transition">
              <td className="px-4 py-2 border-r"><strong className="text-xl">Rs.</strong> {p.rateInNPR}</td>
              <td className="px-4 py-2 border-r"><strong className="text-xl">₹ </strong>{p.rateInINR}</td>
              <td className="px-4 py-2 border-r"><strong className="text-xl">$</strong> {p.rateInUSD}</td>
              <td className="px-4 py-2"><strong className="text-xl">€</strong> {p.rateInEUR}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ))}
</div>

                );
              } else if (key === "duration") {
                content = value + " day(s)";
              } else if (key === "discountInPercentage") {
                return;
              } else {
                content = (
                  <Text ref={sectionsRef[t.label?.toLowerCase?.()]} inherit>
                    {value || "N/A"}
                  </Text>
                );
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

                  {key === "travelThemeIds" && (
                    <div className="mt-6 gap-3 flex flex-wrap justify-between w-full ">
                      {buttons.map((b) => (
                        <button
                          onClick={() => scrollToSection(b.name.toLowerCase())}
                          className="border bg-blue-600 text-white flex items-center justify-center  gap-2 rounded p-1 cursor-pointer hover:bg-blue-700 outline-0"
                        >
                          <img
                            src={b?.icon}
                            alt={`${b.name} Icon`}
                            className="w-4"
                          />
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
      </div>
    </Modal>
  );
};

export default ToursViewModel;
