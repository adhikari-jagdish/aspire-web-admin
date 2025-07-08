import { Button, Title, Modal, Group } from "@mantine/core";
import TitleDuration from "../../common/common_view_components/title-Duration";
import Overview from "../../common/common_view_components/overview";
import Itinerary from "../../common/common_view_components/itinerary";
import Inclusions from "../../common/common_view_components/inclusions";
import Exclusions from "../../common/common_view_components/exclusions";
import Hotels from "../../common/common_view_components/hotels";
import FileDiscount from "../../common/common_view_components/image-discount";
import { useEffect, useState } from "react";
import Destinations from "../../common/common_view_components/destinations";
import TravelThemes from "../../common/common_view_components/travelThemes";
import PackageRate from "../../common/common_view_components/packageRate";
import TripHighlights from "../../common/common_view_components/tripHighlights";
import ImageDiscount from "../../common/common_view_components/image-discount";

// Define initial form state for type safety and consistency
const initialFormState = {
  destinationIds: "",
  travelThemeIds: "",
  title: "",
  duration: 0,
  overview: "",
  tripHighlights: [],
  itinerary: [],
  inclusions: "",
  exclusions: "",
  hotels: [],
  packageRate: "",
  discountInPercentage: 0,
  file: null,
};
const ToursAddEditModel = ({
  opened,
  onClose,
  isEditTour,
  handleSubmit,
  handleImageSelect,
  tour = {},
  idToUpdate,
  imagePreview
}) => {
  const [formData, setFormData] = useState(initialFormState);
  // Initialize form data
  useEffect(() => {
    setFormData()
    if (isEditTour && opened && tour) {
      setFormData({
        destinationIds: tour.destinationIds || "",
        travelThemeIds: tour.travelThemeIds || "",
        title: tour.title || "",
        duration: String(tour.duration || 0),
        overview: tour.overview || "",
        tripHighlights: Array.isArray(tour.tripHighlights)? tour.tripHighlights: [],
        itinerary: Array.isArray(tour.itinerary) ? tour.itinerary : [],
        inclusions: tour.inclusions || "",
        exclusions: tour.exclusions || "",
        hotels: Array.isArray(tour.hotels) ? tour.hotels : [],
        packageRate: Array.isArray(tour.packageRate)? tour.packageRate : [],
        discountInPercentage: tour.discountInPercentage ?? 0,
        file: imagePreview || null,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [isEditTour, opened, tour]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onImageChange = (image) => {
    setFormData((prev) => ({ ...prev, image }));
    if (handleImageSelect) {
      handleImageSelect(image);
    }
  };

  const onSubmit = () => {
    handleSubmit(formData, formData.file, isEditTour, idToUpdate);
  };
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Title order={2} ta="center" c="dark">
          {isEditTour ? "Edit" : "Add"} Tour Packages
        </Title>
      }
      size="xxl"
      centered
      padding="lg"
      radius="md"
    >
      <div className="text-[15px]">
        <div className="space-y-8">
          <Destinations
            name="destinationIds"
            value={formData.destinationIds}
            onChange={handleChange}
          />
          <TravelThemes
            name="travelThemeIds"
            value={formData.travelThemeIds}
            onChange={handleChange}
          />
          <TitleDuration
            titleName="title"
            durationName="duration"
            titleValue={formData.title}
            durationValue={formData.duration}
            onChange={handleChange}
          />
          <Overview
            name="overview"
            value={formData.overview}
            onChange={handleChange}
          />
          <TripHighlights
            name="tripHighlights"
            value={formData.tripHighlights}
            onChange={handleChange}
            isEditTour={isEditTour}
          />
          <Itinerary
            name="itinerary"
            value={formData.itinerary}
            onChange={handleChange}
            isEditTour={isEditTour}
            durationLimit = {formData.duration || "0"}
            // onChange={(value) =>
            //   setFormData((prev) => ({ ...prev, itinerary: value }))
            // }
          />
          <PackageRate
            name="packageRate"
            value={formData.packageRate}
            onChange={handleChange}
            isEditTour={isEditTour}
          />
          <Inclusions
            name="inclusions"
            value={formData.inclusions}
            // onChange={handleChange}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, inclusions: value }))
            }
            isEditTour={isEditTour}
          />
          <Exclusions
            name="exclusions"
            value={formData.exclusions}
            onChange={handleChange}
            isEditTour={isEditTour}
            // onChange={(value) =>
            //   setFormData((prev) => ({ ...prev, exclusions: value }))}
            
          />

          <Hotels
            name="hotels"
            value={formData.hotels}
            onChange={handleChange}
            isEditTour={isEditTour}
            // onChange={(value) =>
            //   setFormData((prev) => ({ ...prev, hotels: value }))
            // }
          />
          <ImageDiscount
            imageName="file"
            discountName="discountInPercentage"
            discountValue={formData.discountInPercentage}
            onChange={handleChange}
            onImageChange={onImageChange}
            isEditTour={isEditTour}
            tour={tour}
            defaultImage= {isEditTour && (tour?.image || imagePreview)}
          />
        </div>
        <Group position="right" mt="md" pr={10} pb={4} spacing="sm">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Submit</Button>
        </Group>
      </div>
    </Modal>
  );
};

export default ToursAddEditModel;
