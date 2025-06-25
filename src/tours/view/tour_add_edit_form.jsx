import { Button, Title } from "@mantine/core";
import TitleDuration from "../../common/common_view_components/title-Duration";
import Overview from "../../common/common_view_components/overview";
import Itinerary from "../../common/common_view_components/itinerary";
import Inclusions from "../../common/common_view_components/inclusions";
import Exclusions from "../../common/common_view_components/exclusions";
import Hotels from "../../common/common_view_components/hotels";
import ImageDiscount from "../../common/common_view_components/image-discount";
import { useEffect, useState } from "react";
import Destinations from "../../common/common_view_components/destinations";
import TravelThemes from "../../common/common_view_components/travelThemes";
import PackageRate from "../../common/common_view_components/packageRate";
import PackageInclusions from "../../common/common_view_components/packageInclusions";

const ToursAddEditForm = ({
  opened,
  onClose,
  isEditTour,
  handleSubmit,
  handleImageSelect,
  tour,
  test,
}) => {
  const [formData, setFormData] = useState({
    destinationId: "",
    travelThemeId: "",
    title: "",
    duration: 0,
    overview: "",
    packageInclusions: "",
    itinerary: [],
    inclusions: [],
    exclusions: [],
    hotels: [],
    packageRate: 0,
    discount: 0,
    image: null,
  });


  useEffect(() => {
    if (isEditTour && opened) {
      setFormData({
        destinationId: tour.destinationId || "",
        travelThemeId: tour.travelThemeId || "",
        title: tour.title || "",
        duration: tour.duration || "",
        overview: tour.overview || "",
        packageInclusions: tour.packageInclusions || "",
        itinerary: tour.itinerary,
        inclusions: tour.inclusions || "",
        exclusions: tour.exclusions || "",
        hotels: tour.hotels || "",
        packageRate: tour.packageRate || "",
        discount: tour.discount || "",
        image: tour.image || null,
      });
    } else {
      // Clear form for new tour package
      setFormData({
        destinationId: [],
        travelThemeId: [],
        title: "",
        duration: "",
        overview: "",
        packageInclusions: "",
        itinerary: [],
        inclusions: [],
        exclusions: [],
        hotels: [],
        packageRate: "",
        discount: "",
        image: null,
      });
    }
  }, [isEditTour, opened]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="text-[15px] pl-2">
        <Title mt={20} mb={10} ta="center" c="dark">
          Tour Packages
        </Title>
        <div className="space-y-6">
        {/* Destinations */}
        <Destinations value={formData.destinationId} onChange={handleChange} />
        {/* Travel Themes */}
        <TravelThemes value={formData.travelThemeId} onChange={handleChange} />

        {/* Title & Duration */}
        <TitleDuration
          titleName="title"
          durationName="duration"
          titleValue={formData.title}
          durationValue={formData.duration}
          onChange={handleChange}
        />

        {/* Overview */}

        <Overview
          name="overview"
          value={formData.overview}
          onChange={handleChange}
        />

        {/* Package inclusion */}
        <PackageInclusions
          name="packageInclusions"
          value={formData.packageInclusions}
          onChange={handleChange}
        />
        {/* Itinerary */}

        <Itinerary
            name="itinerary"
            value={formData.itinerary}
            onChange={handleChange}
          />

        {/* Package Rate */}
        <PackageRate 
        name="packageRate" 
        onChange={handleChange}
         />

        {/* Inclusions  */}

        <Inclusions
            name="inclusions"
            value={formData.inclusions}
            onChange={handleChange}
          />

        {/* Exclusions  */}

        <Exclusions
            name="exclusions"
            value={formData.exclusions}
            onChange={handleChange}
          />

        {/* Hotels */}

        <Hotels 
        name="hotels" 
        onChange={handleChange} />

        {/*  Image & Discount  */}
        <ImageDiscount
            imageName="image"
            discountName="discount"
            discountValue={formData.discount}
            onChange={handleChange}
          />
      </div>
      <div className="flex items-center justify-end pr-10 pb-4 gap-4">
        <Button variant="default"  onClick={() => window.history.back()}>
          {" "}
         
          Cancel
        </Button>
        <Button onClick={() => handleSubmit(formData)}>Submit</Button>{" "}
      </div>
      </div>
    </>
  );
};

export default ToursAddEditForm;
