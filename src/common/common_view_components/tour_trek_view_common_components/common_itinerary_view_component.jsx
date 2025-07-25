import { useEffect, useState } from "react";
import HotelRepository from "../../../hotels/repository/hotel_repository";
import useAuth from "../../../auth/components/use_auth";
import { useNotification } from "../../hooks/useNotification";

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
              <strong className="text-xl">{factor?.details}</strong>
              </div> 
              {idx < day.itineraryFactors.length- 1  && <span className="border-r border-gray-400 border-1" ></span>}
              </div>
            ))}
            
          </div>
           <div className="mt-4">{day.details}</div> <br />
          <div >
             {hotelList.find(h => h._id === day?.hotelAndMealPlan?.hotel)?.title} | &nbsp;
           {day?.hotelAndMealPlan?.mealPlan}
          </div>
           {/* <span>Details: </span> */}
        </li>
      ))}
    </ul>
  );
};

export default CommonItineraryViewComponent;
