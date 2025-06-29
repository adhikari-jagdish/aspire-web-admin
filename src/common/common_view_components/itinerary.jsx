import { Title } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";

const Itinerary = ({ name, value, onChange }) => {
  const [itineraries, setItineraries] = useState([]);

  const handleAddItinerary = () => {
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
    <div>
      <div className="max-w-[100%] flex justify-between items-center">
        <Title order={4} mt={20} mb={10} ta="left" c="dark" className="flex flex-col">
          Itinerary
          <span className="border border-b-1 w-[80px]"></span>
        </Title>

        <button
          onClick={handleAddItinerary}
          className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center gap-1"
        >
          <IconPlus size={20} />
        </button>
      </div>

      <div className="border border-gray-400 rounded p-2 w-full">
        {itineraries.length > 0 ? (
          itineraries.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between p-1">
                <div className="space-y-5">
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
                      className="outline-0 border border-gray-400 p-2 rounded w-[300px]"
                    />
                  </div>

                  <textarea
                    rows={3}
                    cols={80}
                    placeholder="Details (one per line)..."
                    value={item.details}
                    onChange={(e) =>
                      updateItineraryField(idx, "details", e.target.value)
                    }
                    className="border border-gray-400 text-black w-[420px] rounded p-2 resize-none outline-0"
                  />
                </div>

                <div>
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
