import { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Textarea,
  Stack,
  Menu,
} from "@mantine/core";
import ImagePicker from "../../common/common_view_components/image_picker";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { NumbersOnlyValidator, TextOnlyValidator } from "../../common/hooks/common_inputField_validator";

const HotelAddEditModel = ({
  opened,
  onClose,
  isEditHotel,
  handleSubmit,
  handleImageSelect,
  hotel,
  destinationList,
}) => {
  const [formData, setFormData] = useState({
    destinationId: "",
    title: "",
    city: "",
    rating: null,
    overview: "",
    hotelCategory: "",
    rate: [
      {
        roomCategory: "",
        rateInNPR: 0,
        rateInUSD: 0,
        rateInINR: 0,
      },
    ],
    image: null,
  });

  const [DestinationCategory, setDestinationCategory] = useState("");

  const destinaton = hotel.destinationId;

  useEffect(() => {
    if (isEditHotel && opened) {
      setFormData({
        destinationId: destinaton._id || "",
        title: hotel.title || "",
        city: hotel.city || "",
        rating: hotel.rating || null,
        overview: hotel.overview || "",
        hotelCategory: hotel.hotelCategory || "",
        rate: hotel.rate || null,
        image: hotel.image || null,
      });
      setDestinationCategory(destinaton._id || "");
    } else {
      // Clear form for new travel theme
      setFormData({
        destinationId: "",
        title: "",
        city: "",
        rating: null,
        overview: "",
        hotelCategory: "",
        rate: [
          {
            roomCategory: "",
            rateInNPR: 0,
            rateInUSD: 0,
            rateInINR: 0,
          },
        ],
        image: null,
      });
      setDestinationCategory("");
    }
  }, [isEditHotel, opened]);

  const handleChange = (e) => {
    NumbersOnlyValidator(e);
    const {name, value} = e.target;

    if(name === "rating"){
      const isValid = /^\d{0,1}(\.\d{0,1})?$/.test(value);
      const num = Number(value);
      if(isValid && num < 10){
        setFormData({...formData, [name]: value})
      }
    } else {

      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleRateChange = (idx, field, value) => {
    const updatedRates = formData.rate.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );

    setFormData({ ...formData, rate: updatedRates });
  };

  const addRateRow = () => {
    setFormData({
      ...formData,
      rate: [
        ...formData.rate,
        {
          roomCategory: "",
          rateInNPR: 0,
          rateInUSD: 0,
          rateInINR: 0,
        },
      ],
    });
  };

  const removeRateRow = (idx) => {
    const updatedRates = formData.rate.filter((_, i) => i !== idx);
    setFormData({ ...formData, rate: updatedRates });
  };

  const handleDestinationSelect = (e) => {
    const selectedId = e.target.value;
    setDestinationCategory(selectedId);
    setFormData((prev) => ({
      ...prev,
      destinationId: selectedId,
    }));
  };

 

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditHotel ? "Edit Hotel" : "Add Hotel"}
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
      centered
    >
      <div className="flex flex-col">
        <label htmlFor="destinations" className="font-medium text-[15px]">
          Destinations
        </label>

        <select
          name="destinations"
          id="destinations"
          className="border outline-blue-200 border-gray-400 p-1 rounded"
          style={{ fontSize: "14px" }}
          value={DestinationCategory}
          onChange={handleDestinationSelect}
        >
          <option value=""> Select Destination </option>

          {destinationList.map((d) => (
            <option key={d._id} value={d._id || ""}>
              {d?.title}
            </option>
          ))}
        </select>
      </div>

      <TextInput
        label="Title"
        placeholder="Enter Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <TextInput
        label="City"
        placeholder="Enter City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
        onKeyDown={TextOnlyValidator}
      />

      <TextInput
        label="Rating"
        placeholder="Enter Rating"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        required
        onKeyDown={NumbersOnlyValidator}
        onWheel={(e) => e.target.blur()}
      />

      <TextInput
        label="Overview"
        placeholder="Enter Overview"
        name="overview"
        value={formData.overview}
        onChange={handleChange}
        required
      />

      <div className="flex flex-col">
        <label htmlFor="hotelCategory" className="font-medium text-[15px]">
          Hotel Category
        </label>

        <select
          name="hotelCategory"
          className="border outline-blue-200 border-gray-400 p-1 rounded text-xl"
          style={{ fontSize: "14px" }}
          value={hotel.hotelCategory}
          onChange={handleChange}
        >
          <option value=""> Select Category </option>
          <option value="budget">Budget</option>
          <option value="standard">Standard</option>
          <option value="deluxe">Deluxe</option>
          <option value="luxury">Luxury</option>
          <option value="boutique">Boutique</option>
          <option value="resort">Resort</option>
          <option value="hostel">Hostel</option>
          <option value="apartment">Serviced Apartment</option>
        </select>
      </div>

      <div style={{ marginTop: 5 }}>
        <h3 className="font-medium">Rate Info</h3>

        {formData.rate.map((rateItem, idx) => (
          <div className="border border-gray-400 rounded p-2 space-y-3 mt-">
            <div className="flex flex-col gap-2">
              <label htmlFor="roomCategory" className="text-[14px] font-medium">
                Room Category
              </label>
              <input
                label="Room Category"
                value={rateItem.roomCategory}
                type="text"
                onKeyDown={TextOnlyValidator}
                onChange={(e) =>
                  handleRateChange(idx, "roomCategory", e.target.value)
                }
                placeholder="Enter Room Category"
                name="roomCategory"
                required
                className="border border-gray-400 rounded outline-blue-300 px-2 py-1 placeholder:text-[14px] text-[14px] w-[300px]"
              />
            </div>

            <Group grow justify="center">
              <TextInput
                label="NPR"
                value={rateItem.rateInNPR}
                onChange={(e) =>
                    {
                    const value = e.target.value;
                    if(/^\d{0,5}$/.test(value)){
                      handleRateChange(idx, "rateInNPR", value)
                    }
                  }
                }
                placeholder="Enter Rate in NPR"
                name="rateInNPR"
                required
                type="number"
                onKeyDown={NumbersOnlyValidator}
                labelProps={{ style: { fontSize: "13px", fontWeight: 500 } }}
              />

              <TextInput
                label="USD"
                value={rateItem.rateInUSD}
                onChange={(e) =>
                  {
                    const value = e.target.value;
                    if(/^\d{0,5}$/.test(value)){
                      handleRateChange(idx, "rateInUSD", value)
                    }
                  }
                }
                placeholder="Enter Rate in USD"
                name="rateInUSD"
                onKeyDown={NumbersOnlyValidator}
                required
                labelProps={{ style: { fontSize: "13px", fontWeight: 500 } }}
              />

              <TextInput
                label="INR"
                value={rateItem.rateInINR}
                onKeyDown={NumbersOnlyValidator}
                onChange={(e) =>
                    {
                    const value = e.target.value;
                    if(/^\d{0,5}$/.test(value)){
                      handleRateChange(idx, "rateInINR", value)
                    }
                  }
                }
                placeholder="Enter Rate in INR"
                name="rateInINR"
                required
                labelProps={{ style: { fontSize: "13px", fontWeight: 500 } }}
              />

              <div className="flex justify-end h-[35px] gap-2 mt-5 ">
                {formData.rate.length > 1 && (
                  <button
                    onClick={() => removeRateRow(idx)}
                    className=" bg-red-200 text-red-600  w-fit px-2 py-1 cursor-pointer hover:bg-red-300 rounded flex items-center justify-center gap-1 text-xl"
                  >
                    <IconTrash size={14} />
                  </button>
                )}

                <button
                  onClick={() => addRateRow(idx)}
                  className=" bg-green-200 text-green-600   px-2 py-1 cursor-pointer hover:bg-green-300 rounded "
                >
                  <IconPlus size={14} />
                </button>
              </div>
            </Group>
          </div>
        ))}
      </div>

      <ImagePicker
        onImageSelect={handleImageSelect}
        defaultImage={hotel.image}
      />

      <Group position="right" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => handleSubmit(formData)}>Submit</Button>
      </Group>
    </Modal>
  );
};

export default HotelAddEditModel;
