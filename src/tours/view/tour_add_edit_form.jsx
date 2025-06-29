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
// import PackageInclusions from "../../common/common_view_components/packageInclusions";

// Define initial form state for type safety and consistency
const initialFormState = {
  destinationIds: "",
  travelThemeIds: "",
  title: "",
  duration: 0,
  overview: "",
  packageInclusions: ["68512dd3ca679719a771a676"],
  itinerary: [],
  inclusions: [],
  exclusions: [],
  hotels: [],
  packageRate: "",
  discountInPercentage: 0,
  file: null,
};
const ToursAddEditForm = ({
  opened,
  onClose,
  isEditTour,
  handleSubmit,
  handleFileSelect,
  tour = {},
  idToUpdate,
}) => {
  const [formData, setFormData] = useState(initialFormState);

  // Debug prop passing
  useEffect(() => {
    console.log("ToursAddEditForm props:", {
      handleSubmit,
      type: typeof handleSubmit,
      isEditTour,
      idToUpdate,
      tour,
    });
  }, [handleSubmit, isEditTour, idToUpdate, tour]);

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
        packageInclusions: tour.packageInclusions || "",
        itinerary: Array.isArray(tour.itinerary) ? tour.itinerary : [],
        inclusions: Array.isArray(tour.inclusions) ? tour.inclusions : [],
        exclusions: Array.isArray(tour.exclusions) ? tour.exclusions : [],
        hotels: Array.isArray(tour.hotels) ? tour.hotels : [],
        packageRate: String(tour.packageRate || ""),
        discountInPercentage: String(tour.discountInPercentage ?? 0),
        file: tour.file || null,
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

  const onFileChange = (file) => {
    setFormData((prev) => ({ ...prev, file }));
    if (handleFileSelect) {
      handleFileSelect(file);
    }
  };

  const onSubmit = () => {
    if (typeof handleSubmit !== "function") {
      console.error("handleSubmit is not a function:", handleSubmit);
      return;
    }
    console.log("Submitting form with:", {
      formData,
      file: formData.file,
      isEditTour,
      idToUpdate,
    });
    handleSubmit(formData, formData.file, isEditTour, idToUpdate);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Title order={2} ta="center" c="dark">
          Add Tour Packages
        </Title>
      }
      size="lg"
      centered
      padding="lg"
      radius="md"
    >
      <div className="text-[15px]">
        <div className="space-y-6">
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
          {/* <PackageInclusions
            name="packageInclusions"
            value={formData.packageInclusions}
            onChange={handleChange}
          /> */}
          <Itinerary
            name="itinerary"
            value={formData.itinerary}
            onChange={handleChange}
            // onChange={(value) =>
            //   setFormData((prev) => ({ ...prev, itinerary: value }))
            // }
          />
          <PackageRate
            name="packageRate"
            value={formData.packageRate}
            onChange={handleChange}
          />
          <Inclusions
            name="inclusions"
            value={formData.inclusions}
            // onChange={handleChange}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, inclusions: value }))
            }
          />
          <Exclusions
            name="exclusions"
            value={formData.exclusions}
            onChange={handleChange}

            // onChange={(value) =>
            //   setFormData((prev) => ({ ...prev, exclusions: value }))}
            
          />

          <Hotels
            name="hotels"
            value={formData.hotels}
            onChange={handleChange}

            // onChange={(value) =>
            //   setFormData((prev) => ({ ...prev, hotels: value }))
            // }
          />
          <FileDiscount
            fileName="file"
            discountName="discountInPercentage"
            discountValue={formData.discountInPercentage}
            onChange={handleChange}
            onFileChange={onFileChange}
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

export default ToursAddEditForm;
