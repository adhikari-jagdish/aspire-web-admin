import { Title } from "@mantine/core";
import Destinations from "../components/destinations";
import TravelThemes from "../components/travelThemes";
import TitleDuration from "../components/title-Duration";
import Overview from "../components/overview";
import Itenarary from "../components/itenarary";
import Inclusions from "../components/inclusions";
import Exclusions from "../components/exclusions";
import Hotels from "../components/hotels";
import ImageDiscount from "../components/image-discount";

const ToursView = () => {
  return (
    <>
      <div className="text-[15px]">
        <Title mt={20} mb={10} ta="center" c="dark">
          Tour Packages
        </Title>
        <div className="space-y-3">
          {/* Destinations */}
          <Destinations />
          {/* Travel Themes */}
          <TravelThemes />

          {/* Title & Duration */}
          <TitleDuration />

          {/* Overview */}

          <Overview />
          {/* Itinerary */}

          <Itenarary />

          {/* Inclusions  */}

          <Inclusions />

          {/* Exclusions  */}

          <Exclusions />

          {/* Hotels */}

          <Hotels />

          {/*  Image & Discount  */}
          <ImageDiscount />
        </div>
      </div>
    </>
  );
};

export default ToursView;
