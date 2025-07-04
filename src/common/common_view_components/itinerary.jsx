import { Title } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNotification } from "../hooks/useNotification";

const Itinerary = ({ name, value, onChange, isEditTour, durationLimit }) => {
  const [itineraries, setItineraries] = useState([]);
  const notify = useNotification();

  useEffect(() => {
    if(isEditTour && Array.isArray(value)){
      const initialized = value.map(v => ({
        dayAndTitle: v.dayAndTitle,
        details: (v.details || []).join("\n"),
        }
      ));
      setItineraries(initialized)
    }
  },[isEditTour, value]);

  const handleAddItinerary = () => {

    if(durationLimit && itineraries.length >=durationLimit){
      console.log('triggered')
       notify({
          type: "error",
          message:  `Only ${durationLimit} itinerary items are allowed.`,
        });
        return;
    }
    const newItem = {
      dayAndTitle: `Day ${itineraries.length + 1}: `,
      details: "",
    };
    const updated = [...itineraries, newItem];
    setItineraries(updated);
    onChange({ target: { name, value: transformItinerary(updated) } });
  };

  const handleRemoveItinerary = (indexToRemove) => {
    const updated = itineraries
      .filter((_, i) => i !== indexToRemove)
      .map((item, idx) => ({
        ...item,
        dayAndTitle: `Day ${idx + 1}: ${extractTitle(item.dayAndTitle)}`,
      }));
    setItineraries(updated);
    onChange({ target: { name, value: transformItinerary(updated) } });
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
      onChange({ target: { name, value: transformItinerary(updated) } });
      return updated;
    });
  };

  const transformItinerary = (items) =>
    items.map((item) => ({
      dayAndTitle: item.dayAndTitle,
      details: item.details
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    }));

  const extractTitle = (dayAndTitle) => {
    const match = dayAndTitle.match(/^Day \d+: (.*)$/);
    return match ? match[1] : "";
  };



  return (
    <div className="">
      <div className=" flex justify-between items-center ">
        <Title order={4} mt={20} mb={10} ta="left" c="dark" className="flex flex-col">
          Itinerary
        </Title>

        <button
          onClick={handleAddItinerary}
          className={`${durationLimit && itineraries.length >=durationLimit   ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'} text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center gap-1`}
          // disabled={durationLimit && itineraries.length >= durationLimit}
        >
          <IconPlus size={20} />
        </button>
      </div>

      <div className="border border-gray-400 rounded p-2 max-h-[550px] overflow-y-scroll">
        {itineraries.length > 0 ? (
          itineraries.map((item, idx) => (
            <div key={idx} >
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
                      value={extractTitle(item.dayAndTitle)}
                      onChange={(e) =>
                        updateItineraryField(idx, "title", e.target.value)
                      }
                      className="outline-0 border border-gray-400 p-2 rounded w-[95%]"
                    />
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

              {itineraries.length > 1 && <hr className="opacity-50 py-2" />}
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
