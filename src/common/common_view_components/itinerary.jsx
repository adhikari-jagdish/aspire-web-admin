import { Title } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";

const Itinerary = ({ name, value, onChange }) => {
  const [itenararies, setItenararies] = useState([]);
  const handleAddItenarary = () => {
    const newItem = {
      title: "",
      details: "",
    };

    setItenararies([...itenararies, newItem]);

    onChange({target: {name, value: itenararies}})
  };

  const handleRemoveItenarary = (indexToRemove) => {
    const updated = itenararies.filter((_, i) => i !== indexToRemove);
    setItenararies(updated);
  };
  const updateItenararyField = (index, field, value) => {
    setItenararies((prev) => {
      const updated = [...prev];

      const current = { ...updated[index] };

      updated[index] = {
        ...current,
        [field]: value,
      };
    onChange({target: {name: 'itinerary', value: updated}})

      return updated;
    });
  };
  return (
    <div>
      <div className=" w-[85%] flex  justify-between items-center">
        <Title
          order={4}
          mt={20}
          mb={10}
          ta="left"
          c="dark"
          className="flex flex-col"
        >
          Itinerary
          <span className=" border border-b-1 w-[80px]"></span>
        </Title>

        <div>
          <button
            onClick={handleAddItenarary}
            className=" bg-blue-600 text-white  w-fit h-fit  px-2 py-1 cursor-pointer hover:bg-blue-700 rounded object-cover flex items-center justify-center gap-1 "
          >
            <IconPlus size={20} />
          </button>
        </div>
      </div>
      <div className="border border-gray-400 rounded p-2 w-[85%]">
        {itenararies.length > 0 ? (
          itenararies?.map((item, idx) => (
            <div key={item?.id}>
              <div className="flex justify-between p-1">
                <div className="space-y-5">
                  <div className="flex gap-5">
                    <div className=" border flex items-center justify-center w-fit space-x-3 border-gray-400 rounded p-1">
                      <span>Day</span>
                      <input
                        type="number"
                        value={String(idx + 1).padStart(2, "0")}
                        readOnly
                        placeholder="01"
                        min={1}
                        className="outline-0 w-[50px]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Title"
                      value={item?.title}
                      onChange={(e) =>
                        updateItenararyField(idx, "title", e.target.value)
                      }
                      className="outline-0 border border-gray-400 p-2 rounded w-[495px]"
                    />
                  </div>
                  <textarea
                    name=""
                    id=""
                    rows={3}
                    cols={80}
                    placeholder="Details....."
                    value={item?.details}
                    onChange={(e) =>
                      updateItenararyField(idx, "details", e.target.value)
                    }
                    className="border border-gray-400 text-black rounded p-2 resize-none outline-0"
                  />
                </div>

                <div>
                  {itenararies.length > 0 && (
                    <button
                      onClick={() => handleRemoveItenarary(idx)}
                      className=" bg-red-200 text-red-600  w-fit px-2 py-1 cursor-pointer hover:bg-red-300 rounded flex items-center justify-center gap-1 text-xl"
                    >
                      <IconX size={14} />
                    </button>
                  )}
                </div>
              </div>
              {itenararies.length > 1 && <hr className="opacity-50 py-2" />}
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
