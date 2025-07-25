import { useEffect, useState } from "react";
import HotelRepository from "../../../hotels/repository/hotel_repository";
import useAuth from "../../../auth/components/use_auth";
import { useNotification } from "../../hooks/useNotification";
import bedIcon from '../../../assets/icons/bed-hotel.svg';
import spoonIcon from '../../../assets/icons/utensils-food.svg';
import { FaBed } from "react-icons/fa6";
import { FaUtensils } from "react-icons/fa";

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

const CommonItineraryViewComponent = ({ sectionsRef, itineraryData }) => {
  const [hotelList, setHotelList] = useState([]);

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

  
  return (
    <ul ref={sectionsRef} className="space-y-3 scroll-mt-[60px]">
      {itineraryData.map((day, idx) => (
        <li
          key={idx}
          className="bg-blue-50 p-2 flex flex-col  rounded border border-dotted border-gray-400"
        >
          <strong>{day.dayAndTitle}</strong> <br />
          <div className="space-x-4 flex text-[#0890cf]">
            {day?.itineraryFactors?.map((factor, idx) => (
              <div className="flex gap-2">
                <div key={factor?._id} className="flex flex-col">
              <span className="text-sm">
                 {factor?.title} 
              </span>
              <strong>{factor?.details}</strong>
              </div> 
              {idx < day.itineraryFactors.length- 1  && <span className="border-r border-gray-400 border-1" ></span>}
              </div>
            ))}
            
          </div>
           <div className="mt-4">{day.details}</div> <br />
          <div className="flex items-center gap-2" >
          
             <span className="flex items-center justify-center gap-2"><FaBed color="#0890cf" size={18}/>{hotelList.find(h => h._id === day?.hotelAndMealPlan?.hotel)?.title}</span> | &nbsp;
             
         <span  className="flex items-center justify-center gap-2"> <FaUtensils color="#0890cf" size={18}/>  {mealPlan.find(m => m.key === day?.hotelAndMealPlan?.mealPlan)?.value}</span>
          </div>
           {/* <span>Details: </span> */}
        </li>
      ))}
    </ul>
  );
};

export default CommonItineraryViewComponent;
