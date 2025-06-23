import { Button, Group, Title } from "@mantine/core";
import Destinations from "../components/destinations";
import TravelThemes from "../components/travelThemes";
import TitleDuration from "../components/title-Duration";
import Overview from "../components/overview";
import Itenarary from "../components/itenarary";
import Inclusions from "../components/inclusions";
import Exclusions from "../components/exclusions";
import Hotels from "../components/hotels";
import ImageDiscount from "../components/image-discount";
import PackageInclusions from "../components/packageInclusions";

const TrekkingAddEditForm = () => {
  return (
    <>
      <div className="text-[15px]">
        <Title mt={20} mb={10} ta="center" c="dark">
          Trekking Packages
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

          {/* Package Inclusions */}
          <PackageInclusions />

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

        
               <div className="flex items-center justify-end pr-10 pb-4 gap-4">
                 <Button variant="default" > {/*onClick={onClose} */}
                 Cancel
               </Button>
               <Button >Submit</Button> {/*onClick={() => handleSubmit(formData)} */}
               </div>
      </div>
    </>
  );
};

export default TrekkingAddEditForm;
