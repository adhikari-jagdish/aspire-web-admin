import { Button, Title } from "@mantine/core";
import Destinations from "../components/tour_add_edit_components/destinations";
import TravelThemes from "../components/tour_add_edit_components/travelThemes";
import TitleDuration from "../components/tour_add_edit_components/title-Duration";
import Overview from "../components/tour_add_edit_components/overview";
import Itenarary from "../components/tour_add_edit_components/itenarary";
import Inclusions from "../components/tour_add_edit_components/inclusions";
import Exclusions from "../components/tour_add_edit_components/exclusions";
import Hotels from "../components/tour_add_edit_components/hotels";
import ImageDiscount from "../components/tour_add_edit_components/image-discount";

const ToursAddEditForm = () => {
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
        <div className="flex items-center justify-end pr-10 pb-4 gap-4">
          <Button variant="default">
            {" "}
            {/*onClick={onClose} */}
            Cancel
          </Button>
          <Button>Submit</Button> {/*onClick={() => handleSubmit(formData)} */}
        </div>
      </div>
    </>
  );
};

export default ToursAddEditForm;
