import { Title } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNotification } from "../hooks/useNotification";
// import Hotels from "./hotels";
// import MealPlan from "./mealPlan";
import HotelAndMealPlan from "./hotel-mealPlan";

const ItineraryFactors = [
  "Trek Distance",
  "Flight Hours",
  "Highest Altitude",
  "Trek Duration",
  "Driving Duration",
  "Walking Duration",
];

const Itinerary = ({ name, parentName, value, onChange, isEditTour, durationLimit,isEditTrekking }) => {
  const [itineraries, setItineraries] = useState([]);
  const notify = useNotification();

  useEffect(() => {
    if ((isEditTour|| isEditTrekking) && Array.isArray(value)) {
      const initialized = value.map((v) => ({
        dayAndTitle: v.dayAndTitle,
        details: v.details,
        itineraryFactors: v.itineraryFactors,
        hotelAndMealPlan: v.hotelAndMealPlan
      }));
      setItineraries(initialized);
    }
  }, [isEditTour, value]);
  

  const handleAddItinerary = () => {
    if (durationLimit < 1) {
      notify({
        type: "error",
        message: `Please select Duration.`,
      });
      return;
    } else if (durationLimit && itineraries.length >= durationLimit) {
      notify({
        type: "error",
        message: `Only ${durationLimit} itinerary items are allowed. To add more, Increase duration days!`,
      });
      return;
    }
    const newItem = {
      dayAndTitle: `Day ${itineraries.length + 1}: `,
      details: "",
      itineraryFactors: [],
      hotelAndMealPlan: {}
    };
    const updated = [...itineraries, newItem];
    setItineraries(updated);
    onChange({ target: { name, value: updated } });
  };

  const handleRemoveItinerary = (indexToRemove) => {
    const updated = itineraries
      .filter((_, i) => i !== indexToRemove)
      .map((item, idx) => ({
        ...item,
        dayAndTitle: `Day ${idx + 1}: ${extractTitle(item.dayAndTitle)}`,
      }));
    setItineraries(updated);
    onChange({ target: { name, value: updated } });
  };

  const updateItineraryField = (index, field, inputValue) => {
    setItineraries((prev) => {
      const updated = [...prev];
      const current = { ...updated[index] };

      if (field === "title") {
        current.dayAndTitle = `Day ${index + 1}: ${inputValue}`;
      } else if (field === "details") {
        current.details = inputValue;
      }

      updated[index] = current;
      onChange({ target: { name, value: updated } });
      return updated;
    });
  };

  const extractTitle = (dayAndTitle) => {
    const match = dayAndTitle.match(/^Day \d+: (.*)$/);
    return match ? match[1] : "";
  };

  const handleAddItineraryFactors = (itineraryIdx) => {
    const newFactor = {
      title: "",
      details: "",
    };

    const updatedItineraries = itineraries.map((item, idx) => {
      if (idx === itineraryIdx) {
        const updatedFactors = [...(item.itineraryFactors || []), newFactor];

        return {
          ...item,
          itineraryFactors: updatedFactors,
        };
      }
      return item;
    });
    setItineraries(updatedItineraries);
    onChange({
      target: { name, value: transformItinerary(updatedItineraries) },
    });
  };

  const handleRemoveItineraryFactors = (factorIdx, itineraryIdx) => {
    const updatedItineraries = itineraries.map((item, idx) => {
      if (itineraryIdx === idx) {
        const filteredFactors = item?.itineraryFactors.filter(
          (_, idx) => idx !== factorIdx
        );

        return {
          ...item,
          itineraryFactors: filteredFactors,
        };
      }
      return item;
    });
    setItineraries(updatedItineraries);

    onChange({
      target: { name, value: transformItinerary(updatedItineraries) },
    });
  };

  const handleItineraryFactorsUpdate = (
    factorIdx,
    field,
    value,
    itineraryIdx
  ) => {
    const updatedItineraries = itineraries.map((item, idx) => {
      if (itineraryIdx === idx) {
        const updatedFactors = [...item.itineraryFactors];
        updatedFactors[factorIdx][field] = value;

        return { ...item, itineraryFactors: updatedFactors };
      }
      return item;
    });

    setItineraries(updatedItineraries);

    onChange({ target: { name, value: updatedItineraries } });
  };

  return (
    <div className="">
      <div className=" flex justify-between items-center ">
        <Title
          order={4}
          mt={20}
          mb={10}
          ta="left"
          c="dark"
          className="flex flex-col"
        >
          Itinerary
        </Title>

        <button
          onClick={handleAddItinerary}
          className={`${
            durationLimit && itineraries.length >= durationLimit
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600"
          } text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center gap-1`}
        >
          <IconPlus size={20} />
        </button>
      </div>

      <div className="border border-gray-400 rounded p-2 grid grid-template-cols grid-cols-2 gap-6  ">
        {itineraries.length > 0 ? (
          itineraries.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between p-1 ">
                <div className="space-y-5 w-full">
                  <div className="flex gap-5">
                    <div className="border flex items-center space-x-3 border-gray-400 rounded p-1">
                      <span>Day</span>
                      <input
                        type="number"
                        value={String(idx + 1).padStart(2, "0")}
                        readOnly
                        className="outline-0 w-[50px]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Title"
                      value={extractTitle(item?.dayAndTitle)}
                      onChange={(e) =>
                        updateItineraryField(idx, "title", e.target.value)
                      }
                      className="outline-0 border border-gray-400 p-2 rounded w-[95%]"
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1 border p-2 rounded border-gray-400 max-h-[240px] overflow-y-scroll">
                    <div className="flex justify-end ">
                      <button
                        onClick={() => handleAddItineraryFactors(idx)}
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center gap-1"
                      >
                        <IconPlus size={20} />
                      </button>
                    </div>
                    {item?.itineraryFactors?.length === 0 ? (
                      <div className="text-center text-gray-400 py-2">
                        No Itinerary Facts yet!
                      </div>
                    ) : (
                      <>
                        <Title order={4}>Itinerary Facts</Title>
                        {item?.itineraryFactors?.map((o, i) => (
                          <div className="space-x-5 space-y-4 w-full flex items-center ">
                            <select
                              name="ItineraryFactors"
                              className="border w-[45%] text-center border-gray-400 p-2 rounded outline-0"
                              value={o?.title}
                              onChange={(e) =>
                                handleItineraryFactorsUpdate(
                                  i,
                                  "title",
                                  e.target.value,
                                  idx
                                )
                              }
                            >
                              <option value="">Select ItineraryFactors</option>

                              {ItineraryFactors?.map((opt, idx) => (
                                <option key={idx} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <input
                              type="text"
                              className="border border-gray-400 p-2 rounded  outline-0 w-[45%]"
                              placeholder="User input....."
                              value={o.details}
                              onChange={(e) =>
                                handleItineraryFactorsUpdate(
                                  i,
                                  "details",
                                  e.target.value,
                                  idx
                                )
                              }
                            />

                            <button
                              className="bg-red-200 text-red-600 px-2 py-1 rounded hover:bg-red-300 h-[30px]  text-xl"
                              onClick={() =>
                                handleRemoveItineraryFactors(i, idx)
                              }
                            >
                              <IconX size={10} />
                            </button>
                          </div>
                        ))}
                      </>
                    )}
                  </div>

                  <textarea
                    rows={7}
                    cols={80}
                    placeholder="Details (one per line)..."
                    value={item.details}
                    onChange={(e) =>
                      updateItineraryField(idx, "details", e.target.value)
                    }
                    className="border border-gray-400 text-black w-full rounded p-2 resize-none outline-0"
                  />
                    <HotelAndMealPlan 
                      value={item?.hotelAndMealPlan}
                      onChange = {newData => {
                        const updated = [...itineraries];
                        updated[idx].hotelAndMealPlan = {
                          ...updated[idx].hotelAndMealPlan,
                          ...newData
                        }
                        setItineraries(updated);;
                        onChange({target: {name, value: updated}})
                      }}
                      parentName = {parentName}
                      isEditTrekking={isEditTrekking}
                      isEditTour={isEditTour}
                    />
                </div>

                <div className="pl-3">
                  <button
                    onClick={() => handleRemoveItinerary(idx)}
                    className="bg-red-200 text-red-600 px-2 py-1 rounded hover:bg-red-300 flex items-center gap-1 text-xl"
                  >
                    <IconX size={14} />
                  </button>
                </div>
              </div>

              {itineraries.length > 1 && <hr className="opacity-50 py-2 w-[95%]" />}
            </div>
          ))
        ) : (
          <span>No Itineraries yet.</span>
        )}
      </div>
    </div>
  );
};

export default Itinerary;
