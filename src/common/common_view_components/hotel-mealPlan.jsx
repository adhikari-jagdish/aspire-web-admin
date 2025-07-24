import HotelRepository from "../../hotels/repository/hotel_repository";
import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../hooks/useNotification";
import { useEffect, useState } from "react";
import { Title } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

const mealPlan = [
  { key: "EP", value: "EP - Room only" },
  { key: "CP", value: "CP - Room and Breakfast only " },
  { key: "MAP", value: "MAP - Room, Breakfast and Dinner" },
  { key: "AP", value: "AP - Room, Breakfast, Lunch and Dinner" },
  {
    key: "JP",
    value: "JP - Room, Breakfast, Lunch and Dinner + Jungle Activities ",
  },
];
const HotelAndMealPlan = ({
  onChange,
  value,
}) => {
  const [hotelList, setHotelList] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
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
  // useEffect(() => {
  //   if (isEditTour && Array.isArray(value) && hotelList.length > 0) {
  //     const hotel = hotelList.filter((h) =>
  //       value.some((v) =>
  //         typeof v === "object" ? h._id === v._id : h._id === v
  //       )
  //     );
  //     setSelectedHotels(hotel);
  //     // setSelectedHotels(updated);

  //   }
  // }, [isEditTour, value, hotelList]);

  const handleHotelChange = (e) => {
    const selected = e.target.value;

    if (selected) {
      const hotel = hotelList.find((h) => h._id === selected);
      setSelectedHotel(hotel?.title);


      onChange({ hotel: selected});
    }
  };

  const [selectedMealPlan, setSelectedMealPlan] = useState("");

  const handleMealPlanChange = (e) => {
    const selected = e.target.value;

    if (selected) {
      const singleMealPlan = mealPlan.find((nmp) => nmp.key === selected);
      setSelectedMealPlan(singleMealPlan?.value);


      onChange({mealPlan: selected});
    }
  };

  

  return (
    <div className="w-full space-y-4 flex flex-col gap-2">
      <div className="flex gap-4">
        <div className="flex items-center w-[50%] gap-5">
          {/* <Title
          order={4}
          mt={20}
          mb={10}
          ta="left"
          c="dark"
          className="flex flex-col"
        >
          Hotels:
        </Title> */}
          <select
            name={name}
            id={name}
            className="border border-gray-500 outline-0 rounded  h-[30px]  mt-2 cursor-pointer text-center "
            onChange={handleHotelChange}
          >
            <option value="">List of Hotels</option>
            {hotelList?.map((h, idx) => (
              <option
                disabled={selectedHotel === h._id}
                value={h?._id}
                key={h._id || idx}
              >
                {h?.title}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full space-y-4">
          <select
            className="border border-gray-500 outline-0 rounded w-full  h-[30px] w- mt-2 cursor-pointer text-center "
            onChange={handleMealPlanChange}
          >
            <option value="">List of Meal Plans</option>
            {mealPlan?.map((mp, idx) => (
              <option value={mp?.key} key={mp?.key || idx}>
                {mp?.value}
              </option>
            ))}
          </select>
        </div>
      </div>
      {((selectedHotel && selectedMealPlan) || JSON.stringify(value) !== "{}") && (
        <ul className="border border-gray-400 rounded p-2 w-full  flex flex-col ">
          <li className="bg-gray-100 px-2 py-1 rounded flex justify-around ">
            <span>{ value ? hotelList.find(h => h?._id === value?.hotel)?.title : selectedHotel} </span>
            |
            <span>{value ? value?.mealPlan : selectedMealPlan}</span>
         <button
              onClick={() => {
                setSelectedMealPlan("");
              }}
              className=" bg-red-200 text-red-600  w-fit px-2 py-1 cursor-pointer hover:bg-red-300 rounded flex items-center justify-center gap-1 text-xl"
            >
              <IconTrash size={14} />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default HotelAndMealPlan;
