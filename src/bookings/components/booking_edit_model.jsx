import { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Title,
  Textarea,
  Select,
  Stack,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

const countryList = ["Nepal", "India", "Us", "Uk", "Bangladesh", "Bhutan"];
const date = new Date();

const BookingEditModel = ({ opened, onClose, handleSubmit, booking }) => {
  console.log({ booking });
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData({
      tripStartDate: booking.tripStartDate || "",
      fullname: booking.fullname || "",
      email: booking.email || "",
      country: booking.country || "",
      contactNumber: booking.contactNumber || null,
      commentOrQuestion: booking.commentOrQuestion || "",
    });
  }, [opened]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={"Edit Booking"}
      centered
      size="xl"
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
      <Stack spacing="sm">
        <Title order={4} ta="left" c="dark">
          Booking Detaiils
        </Title>
        <DatePickerInput
          rightSection={<IconCalendar size={18} stroke={1.5} />}
          label="Trip Start Date"
          name="tripStartDate"
          placeholder="Choose Date"
          leftSectionPointerEvents="none"
          value={formData.tripStartDate}
          onChange={(value) =>
            setFormData({ ...formData, tripStartDate: value })
          }
          minDate={new Date()}
        />

        <Title order={4} mt={20} mb={10} ta="left" c="dark">
          Personal Details(Trip Leader)
        </Title>
        <TextInput
          label="Full Name"
          name="fullname"
          placeholder="John doe"
          value={formData.fullname}
          onChange={handleChange}
          required
        />

        <TextInput
          label="Email Address"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Select
          label="Country"
          name="country"
          data={countryList}
          placeholder="Select Country"
          required
          value={formData.country}
          onChange={(value) => setFormData({ ...formData, country: value })}
        />

        <TextInput
          type="number"
          label="Contact Number"
          name="contactNumber"
          placeholder="Enter your contact number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />

        <Textarea
          resize="vertical"
          label="Comments/Questions"
          name="commentOrQuestion"
          placeholder="Let us know all your inquiries and we will get back to you shortly.."
          value={formData?.commentOrQuestion}
          onChange={handleChange}
        />
        {/* <RichTextEditor
        editor={descriptionEditor}
        className="border border-gray-500 rounded"
      >
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content className="min-h-[250px] [&_ul]:list-disc [&_ol]:list-decimal" />
      </RichTextEditor> */}

        <Group position="right" mt="md">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit(formData)}>Submit</Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default BookingEditModel;
