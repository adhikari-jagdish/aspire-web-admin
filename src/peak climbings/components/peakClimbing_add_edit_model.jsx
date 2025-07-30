import { Button, Title, Modal, Group } from "@mantine/core";
import TitleDuration from "../../common/common_view_components/title-Duration";
import Overview from "../../common/common_view_components/overview";
import Itinerary from "../../common/common_view_components/itinerary";
import Inclusions from "../../common/common_view_components/inclusions";
import Exclusions from "../../common/common_view_components/exclusions";
// import Hotels from "../../common/common_view_components/hotels";
import FileDiscount from "../../common/common_view_components/image-discount";
import { useEffect, useState } from "react";
import Destinations from "../../common/common_view_components/destinations";
import TravelThemes from "../../common/common_view_components/travelThemes";
import PackageRate from "../../common/common_view_components/packageRate";
import TripHighlights from "../../common/common_view_components/tripHighlights";
import ImageDiscount from "../../common/common_view_components/image-discount";
import { FaAngleUp } from "react-icons/fa";

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
const PeakClimbingsAddEditModel = ({
  opened,
  onClose,
  isEditPeakClimbing,
  handleSubmit,
  handleImageSelect,
  peakClimbing = {},
  idToUpdate,
  imagePreview,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  // Initialize form data
  useEffect(() => {
    setFormData();
    if (isEditPeakClimbing && opened && peakClimbing) {
      setFormData({
        destinationIds: peakClimbing.destinationIds || "",
        travelThemeIds: peakClimbing.travelThemeIds || "",
        title: peakClimbing.title || "",
        duration: String(peakClimbing.duration || 0),
        overview: peakClimbing.overview || "",
        tripHighlights: Array.isArray(peakClimbing.tripHighlights)
          ? peakClimbing.tripHighlights
          : [],
        itinerary: Array.isArray(peakClimbing.itinerary) ? peakClimbing.itinerary : [],
        inclusions: peakClimbing.inclusions || "",
        exclusions: peakClimbing.exclusions || "",
        hotels: Array.isArray(peakClimbing.hotels) ? peakClimbing.hotels : [],
        packageRate: Array.isArray(peakClimbing.packageRate) ? peakClimbing.packageRate : [],
        discountInPercentage: peakClimbing.discountInPercentage ?? 0,
        file: imagePreview || null,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [isEditPeakClimbing, opened, peakClimbing]);

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
    handleSubmit(formData, formData.file, isEditPeakClimbing, idToUpdate);
  };
  return (
      <Modal
        opened={opened}
        onClose={onClose}
        title={isEditPeakClimbing ? "Edit PeakClimbing Packages" : "Add PeakClimbing Packages"}
        size="xxl"
        centered
        padding="lg"
        radius="md"
        styles={{
          title: {
            fontSize: "34px",
            color: "#0890cf",
            fontWeight: 700,
          },
          content: {
            scrollbarWidth: "none",
          },
        }}
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
              isEditPeakClimbing={isEditPeakClimbing}
            />
            <Itinerary
              name="itinerary"
              parentName="peakClimbings"
              value={formData.itinerary}
              onChange={handleChange}
              isEditPeakClimbing={isEditPeakClimbing}
              durationLimit={formData.duration || "0"}
            />
            <PackageRate
              name="packageRate"
              value={formData.packageRate}
              onChange={handleChange}
              isEditPeakClimbing={isEditPeakClimbing}
            />
            <Inclusions
              name="inclusions"
              value={formData.inclusions}
              // onChange={handleChange}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, inclusions: value }))
              }
              isEditPeakClimbing={isEditPeakClimbing}
            />
            <Exclusions
              name="exclusions"
              value={formData.exclusions}
              onChange={handleChange}
              isEditPeakClimbing={isEditPeakClimbing}
              // onChange={(value) =>
              // setFormData((prev) => ({ ...prev, exclusions: value }))}
            />

            <ImageDiscount
              imageName="file"
              discountName="discountInPercentage"
              discountValue={formData.discountInPercentage}
              onChange={handleChange}
              onImageChange={onImageChange}
              isEditPeakClimbing={isEditPeakClimbing}
              peakClimbing={peakClimbing}
              defaultImage={isEditPeakClimbing && (peakClimbing?.image || imagePreview)}
            />
          </div>
          {/* Sticky Button inside Modal */}
          <div className="sticky bottom-2  z-[90] flex justify-end  pb-2 bg-white">
            <button onClick={() => {
              const modalBody = document.querySelector('.mantine-Modal-content');
              if(modalBody){
                modalBody.scrollTo({top: 0, behavior: "smooth"})
              }
            }} className="bg-blue-600 rounded-full p-2 shadow-md cursor-pointer hover:bg-blue-700">
              <FaAngleUp size={25} color="white" />
            </button>
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

export default PeakClimbingsAddEditModel;
