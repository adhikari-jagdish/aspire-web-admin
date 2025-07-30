import { Image, Modal, Stack, Table, Text, Title } from "@mantine/core";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

import { useEffect, useRef, useState } from "react";
import {
  FaAngleUp,
  FaPaperPlane,
  FaCheckCircle,
  FaHotel,
} from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { GrOverview } from "react-icons/gr";
import CommonDiscountBatchComponent from "../../common/common_view_components/tour_trek_view_common_components/common_discount_batch_component";
import CommonImageBannerComponent from "../../common/common_view_components/tour_trek_view_common_components/common_image_banner_component";
import CommonTripHighlightsViewComponent from "../../common/common_view_components/tour_trek_view_common_components/common_trip_highlights_view_component";
import CommonTitleComponent from "../../common/common_view_components/common_title_component";
import CommmonDestinationsViewComponent from "../../common/common_view_components/tour_trek_view_common_components/common_destinations_view_component";
import CommonTravelThemesViewComponent from "../../common/common_view_components/tour_trek_view_common_components/common_travel_themes_view_component";
import CommonRichTextViewComponent from "../../common/common_view_components/tour_trek_view_common_components/common_richtext_view_component";
import CommonItineraryViewComponent from "../../common/common_view_components/tour_trek_view_common_components/common_itinerary_view_component";
import CommonPackageRateViewComponent from "../../common/common_view_components/tour_trek_view_common_components/common_package_rate_view_component";
import CommonHotelsViewComponent from "../../common/common_view_components/tour_trek_view_common_components/common_hotels_view_component";
import CommonViewModelTabsComponent from "../../common/common_view_components/tour_trek_view_common_components/common_view_model_tabs_component";

const buttons = [
  { name: "Overview", icon: GrOverview },
  { name: "Itinerary", icon: FaPaperPlane },
  { name: "PackageRate", icon: RiMoneyDollarCircleFill },
  { name: "Inclusions", icon: FaCheckCircle },
  { name: "Exclusions", icon: IoMdCloseCircle },
  // { name: "Hotels", icon: FaHotel },
];

const PeakClimbingsViewModel = ({ openedView, onClose, peakClimbing }) => {
  const scrollContainerRef = useRef(null);
  const buttonGroupRef = useRef(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const sectionsRef = {
    overview: useRef(null),
    itinerary: useRef(null),
    inclusions: useRef(null),
    exclusions: useRef(null),
    // hotels: useRef(null),
    packagerate: useRef(null),
  };



  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return; // safety check

    const handleScroll = () => {
      //get the whole view modal height
      const containerHeight = container.clientHeight; //535
      //get the height from top of model to the button group
      const buttonGroupPos = buttonGroupRef.current?.offsetTop;

      //get current scroll position of user
      const currentScroll = container.scrollTop;
      const hideBtn = buttonGroupPos - containerHeight;
      //if user is in view of above button group - disable the up icon else enable
      if (currentScroll > hideBtn) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [openedView]);

  const scrollToButtonGroup = () => {
    buttonGroupRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <Modal
      opened={openedView}
      onClose={onClose}
      title={
        peakClimbing.title ? `${peakClimbing.title} ( ${peakClimbing.duration} days )` : "peakClimbing Package"
      }
      centered
      size="xxl"
      styles={{
        title: {
          fontSize: "20px",
          color: "#0890cf",
          fontWeight: 700,
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
        {peakClimbing ? (
          <>
            {/*Renders The Banner Image */}
            <CommonImageBannerComponent peakClimbing={peakClimbing}  />
            <Stack spacing="sm" className="text-[14px]">
            

              {/*Trip Hightlight Section Title */}
              <CommonTitleComponent title={"Trip Highlights"} />

              {/*Renders The Trip Highlights Section */}
              <CommonTripHighlightsViewComponent
                tripHighlightList={peakClimbing.tripHighlights}
              />

              {/*Destinations Section Title */}
              <CommonTitleComponent title={"Destinations"} />

              {/*Renders the Destinations Section */}
              <CommmonDestinationsViewComponent
                destinations={peakClimbing.destinationIds}
              />

              {/*Travel Themes Section Title */}
              <CommonTitleComponent title={"Travel Themes"} />

              {/*Renders the Travel Themes Section */}
              <CommonTravelThemesViewComponent
                travelThemes={peakClimbing.travelThemeIds}
              />

              {/*Renders the Common Tabs/Menu Section */}
              <CommonViewModelTabsComponent
                buttonGroupRef={buttonGroupRef}
                buttons={buttons}
                sectionsRef={sectionsRef}
              />

              {/*Overview Section Title */}
              <CommonTitleComponent title={"Overview"} />

              {/*Renders the Overview Section */}
              <CommonRichTextViewComponent
                sectionsRef={sectionsRef["overview"]}
                title={"Overview"}
                data={peakClimbing?.overview}
              />

              {/*Itinerary Section Title */}
              <CommonTitleComponent title={"Itinerary"} />

              {/*Renders the Itinerary Section */}
              <CommonItineraryViewComponent
                sectionsRef={sectionsRef["itinerary"]}
                title={"Itinerary"}
                itineraryData={peakClimbing?.itinerary}
                parentName="peakClimbings"
              />

              {/*Package Rates Section Title */}
              <CommonTitleComponent title={"Package Rates"} />

              {/*Renders the Package Rate Section */}
              <CommonPackageRateViewComponent
                sectionsRef={sectionsRef["packagerate"]}
                packageRateList={peakClimbing?.packageRate}
              />

              {/*Inclusions Section Title */}
              <CommonTitleComponent title={"Inclusions"} />

              {/*Inclusions Section Title */}
              <CommonRichTextViewComponent
                sectionsRef={sectionsRef["inclusions"]}
                title={"Inclusions"}
                data={peakClimbing?.inclusions}
              />

              {/*Exclusions Section Title */}
              <CommonTitleComponent title={"Exclusions"} />

              {/*Exclusions Section Title */}
              <CommonRichTextViewComponent
                sectionsRef={sectionsRef["exclusions"]}
                title={"Exclusions"}
                data={peakClimbing?.exclusions}
              />

              {/*Hotels Section Title */}
              {/* <CommonTitleComponent title={"Hotels"} /> */}

              {/*Renders the Hotels Section */}
              {/* <CommonHotelsViewComponent
                sectionsRef={sectionsRef["hotels"]}
                hotelList={peakClimbing?.hotels}
              /> */}
            </Stack>
          </>
        ) : (
          <Text c="dimmed">No PeakClimbing data available.</Text>
        )}
          <button
            onClick={scrollToButtonGroup}
            aria-label="Scroll to button sections"
            className={`fixed bottom-8 cursor-pointer right-8 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition `}
          >
            <FaAngleUp className="text-xl" />
          </button>
      </div>
    </Modal>
  );
};

export default PeakClimbingsViewModel;
