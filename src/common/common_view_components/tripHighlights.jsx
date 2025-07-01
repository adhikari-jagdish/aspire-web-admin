import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../hooks/useNotification";
import { useEffect, useState } from "react";
import { Title } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import TripHighlightRepository from "../../trip highlights/repository/tripHighlight_repository";

const TripHighlights = ({ name, onChange, value, isEditTripHighlight }) => {
  
  const [tripHighlightList, setTripHighlightList] = useState([]);
  const [selectedTripHighlights, setSelectedTripHighlights] = useState([]);
  const { getToken } = useAuth();
  const notify = useNotification();

  const tripHighlightRepository = new TripHighlightRepository(getToken);
  useEffect(() => {
    //get all TripHighlights
    const fetchTripHighlights = async () => {
      try {
        const tripResponse = await tripHighlightRepository.getTripHighlights();
        setTripHighlightList(tripResponse.data);
      } catch (error) {
        notify({
          type: "error",
          message: error.message ?? "Something went wrong. Please try again.",
        });
      }
    };
    fetchTripHighlights();
  }, []);

  useEffect(() => {
    if(isEditTripHighlight && Array.isArray(value)){
      const trip = tripHighlightList.filter(h => value.some(v => h._id === v._id));
      setSelectedTripHighlights(trip)
    }
  },[isEditTripHighlight, value, tripHighlightList])

  const handleTripHighlightChange = (e) => {
    const selected = e.target.value;
    if (selected && !selectedTripHighlights?.some((s) => s._id === selected)) {
      const trip = tripHighlightList.find((h) => h._id === selected);
      if (trip) {
        const updated = [...selectedTripHighlights, trip];
        setSelectedTripHighlights(updated);
        const ids = updated.map((u) => u._id);
        onChange({ target: { name, value: ids } });
      }
    }
  };

  const removeTripHighlightRow = (idx, tripHighlightId) => {
    const trip = selectedTripHighlights.find((s) => s._id === tripHighlightId);

    if (trip) {
      const updated = selectedTripHighlights.filter((_, i) => i !== idx);
      setSelectedTripHighlights(updated);
      const ids = updated.map((u) => u._id);
      onChange({ target: { name, value: ids } });
    }
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
          Trip Highlights:
        </Title>
        <select
          name={name}
          id={name}
          className="border border-gray-500 outline-0 rounded  h-[30px] w-[500px] mt-2 cursor-pointer text-center "
          onChange={handleTripHighlightChange}
        >
          <option value="">List of Trip Highlights</option>
          {tripHighlightList?.map((t, idx) => (
            <option
              disabled={selectedTripHighlights.some((s) => s._id === t._id)}
              value={t?._id}
              key={t._id || idx}
            >
              {t?.title}
            </option>
          ))}
        </select>
      </div>

      {/* selected TripHighlights */}
      {selectedTripHighlights.length > 0 && (
        <ul className="border border-gray-400 rounded p-2 w-[500px] flex flex-col gap-6">
          {selectedTripHighlights.map((trip, idx) => (
            <>
                <li
              key={trip?._id || idx}
              className="bg-gray-100 px-2 py-1 rounded flex justify-between"
            >
              {trip?.title}
              <button
                onClick={() => removeTripHighlightRow(idx, trip._id)}
                className=" bg-red-200 text-red-600  w-fit px-2 py-1 cursor-pointer hover:bg-red-300 rounded flex items-center justify-center gap-1 text-xl"
              >
                <IconTrash size={14} />
              </button>
            </li>
              <textarea name="" id="" rows={5} cols={5} className="border border-gray-400 rounded p-2 outline-0 resize-none" placeholder="Description..."></textarea>
                          {selectedTripHighlights.length > 1 && <hr className="border-gray-400" />}

            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TripHighlights;
