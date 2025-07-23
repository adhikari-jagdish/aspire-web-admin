import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

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
const MealPlan = ({setHotelAndMealPlan
    
}) => {

    const [selectedMealPlan, setSelectedMealPlan] = useState("");

    
      const handleMealPlanChange = (e) => {
        const selected = e.target.value;
    
        if (selected) {
            const singleMealPlan = mealPlan.find(nmp => nmp.key === selected);
            setSelectedMealPlan(singleMealPlan?.value);
    
        setHotelAndMealPlan({mealPlan: selected});

        }
      };
    
  return (
    <div className="w-full space-y-4">
      <select
        className="border border-gray-500 outline-0 rounded w-full  h-[30px] w- mt-2 cursor-pointer text-center "
          onChange={handleMealPlanChange}
      >
        <option value="">List of Meal Plans</option>
        {mealPlan?.map((mp, idx) => (
          <option
            value={mp?.key}
            key={mp?.key || idx}
          >
            {mp?.value}
          </option>
        ))}
      </select>

      {selectedMealPlan && (
        <ul className="border border-gray-400 rounded p-2  flex flex-col ">
            <li
              className="bg-gray-100 px-2 py-1 rounded flex justify-between  "
            >
              {selectedMealPlan}
              <button
                onClick={() => {setSelectedMealPlan("");}}
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

export default MealPlan;
