import HotelRepository from "../../hotels/repository/hotel_repository";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../hooks/useNotification";
import { useEffect, useState } from "react";
import { Title } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

const Hotels = ({ name, onChange, value, isEditTour }) => {
  const [hotelList, setHotelList] = useState([]);
  const [selectedHotels, setSelectedHotels] = useState([]);
  const { getToken } = useAuth();
  const notify = useNotification();
  const hotelRepository = new HotelRepository(getToken);
  useEffect(() => {
    //get all hotels
    const fetchHotels = async () => {
      try {
        const hotelResponse = await hotelRepository.getHotels();
        setHotelList(hotelResponse.data);
      } catch (error) {
        notify({
          type: "error",
          message: error.message ?? "Something went wrong. Please try again.",
        });
      }
    };
    fetchHotels();
  }, []);
  useEffect(() => {
    if (isEditTour && Array.isArray(value) && hotelList.length > 0) {
      const hotel = hotelList.filter((h) =>
        value.some((v) =>
          typeof v === "object" ? h._id === v._id : h._id === v
        )
      );
      setSelectedHotels(hotel);
      // setSelectedHotels(updated);
      
    }
  }, [isEditTour, value, hotelList]);

  const handleHotelChange = (e) => {
    const selected = e.target.value;

    if (selected && !selectedHotels?.some((s) => s._id === selected)) {
      const hotel = hotelList.find((h) => h._id === selected);
      if (hotel) {
        const updated = [...selectedHotels, hotel];
        setSelectedHotels(updated);

        const ids = updated.map((u) => u._id);
        // Send the updated IDs directly
        onChange({ target: { name, value: ids } });
      }
    }
  };
  const removeHotelRow = (idx, hotelId) => {
    let updated = [];

    if (isEditTour) {
      updated = selectedHotels.filter((sh) => sh._id !== hotelId);
    } else {
      updated = selectedHotels.filter((_, i) => i !== idx);
    }
    setSelectedHotels(updated);

    const ids = updated.map((u) => u._id);
    onChange({ target: { name, value: ids } });
  };
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center w-[100%] gap-5">
        <Title
          order={4}
          mt={20}
          mb={10}
          ta="left"
          c="dark"
          className="flex flex-col"
        >
          Hotels:
        </Title>
        <select
          name={name}
          id={name}
          className="border border-gray-500 outline-0 rounded  h-[30px] w-full mt-2 cursor-pointer text-center "
          onChange={handleHotelChange}
        >
          <option value="">List of Hotels</option>
          {hotelList?.map((h, idx) => (
            <option
              disabled={selectedHotels.some((s) => s._id === h._id)}
              value={h?._id}
              key={h._id || idx}
            >
              {h?.title}
            </option>
          ))}
        </select>
      </div>

      {/* selected hotels */}
      {selectedHotels.length > 0 && (
        <ul className="border border-gray-400 rounded p-2 w- flex flex-col ">
          {selectedHotels.map((hotel, idx) => (
            <li
              key={hotel?._id || idx}
              className="bg-gray-100 px-2 py-1 rounded flex justify-between "
            >
              {hotel?.title}
              <button
                onClick={() => removeHotelRow(idx, hotel._id)}
                className=" bg-red-200 text-red-600  w-fit px-2 py-1 cursor-pointer hover:bg-red-300 rounded flex items-center justify-center gap-1 text-xl"
              >
                <IconTrash size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Hotels;
