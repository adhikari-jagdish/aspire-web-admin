import useAuth from "../../auth/components/use_auth";
import { useNotification } from "../hooks/useNotification";
import { useEffect, useState } from "react";
import { Title } from "@mantine/core";
import { IconPlus, IconTrash, IconX } from "@tabler/icons-react";
import TripHighlightRepository from "../../trip highlights/repository/tripHighlight_repository";

const TripHighlights = ({ name, onChange, value, isEditTour }) => {
  const [tripHighlightList, setTripHighlightList] = useState([]);
  const [tripHighlightRows, setTripHighlightRows] = useState([]);

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
    if (isEditTour && Array.isArray(value)) {
      const trip = tripHighlightList.filter((h) =>
        value.some((v) => h._id === v.tripHighlightsId)
      );

      setSelectedTripHighlights(trip);
    }
  }, [isEditTour, value, tripHighlightList]);


  const handleAddTripHighlights = () => {
    if(tripHighlightRows.length < tripHighlightList.length){
      setTripHighlightRows(prev => [...prev, {tripHighlightsId: "", description: ""}])
    }
  };

  const handleTripHighlightRowChange = (idx, field, value) => {
    const updated = [...tripHighlightRows];
    updated[idx][field] = value;

    setTripHighlightRows(updated);

    onChange({target: {name, value: updated}})
  }

const handleTripHighlightRemove = (idx) => {
  const updated = tripHighlightRows.filter((_, i) =>  i !== idx);
  setTripHighlightRows(updated);

  onChange({target: {name, value: updated}})
}
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between  w-[100%] ">
        <Title
          order={4}
          mt={20}
          mb={10}
          ta="left"
          c="dark"
          className="flex flex-col"
        >
          Trip Highlights
        </Title>
        <button
          onClick={handleAddTripHighlights}
          className="bg-blue-600
           text-white px-2 py-1 h-fit rounded hover:bg-blue-700 flex items-center gap-1"
        >
          <IconPlus size={20} />
        </button>
      </div>

      <div className="border p-2 border-gray-400 rounded space-y-4">
        {tripHighlightRows.map((trip, i) => (
          <>
            <div className="flex gap-6 items-center justify-center">
              <select
              name={name}
              id={name}
              className="border border-gray-500 outline-0 rounded  h-[30px] w-full mt-2 cursor-pointer text-center"
              onChange={e => handleTripHighlightRowChange(i, "tripHighlightsId", e.target.value)}
            >
              <option value="">List of Trip Highlights</option>
              {tripHighlightList?.map((t, idx) => (
                <option
                  value={t?._id}
                  key={t._id || idx}
                  disabled={tripHighlightRows.some((trip) => trip.tripHighlightsId === t._id)}
                >
                  {t?.title}
                </option>
              ))}
            </select>
            <button
              className="bg-red-200 text-red-600 px-2 py-1 rounded hover:bg-red-300 h-[30px]  text-xl"
              onClick={() => handleTripHighlightRemove(i, trip?.tripHighlightsId)}
            >
              <IconX size={10} />
            </button>
            </div>

              <textarea
                rows={5}
                value={trip?.description}
                className="border border-gray-400 outline-0 resize-none p-2 w-full rounded"
                placeholder="Details....."
                onChange={e => handleTripHighlightRowChange(i, "description", e.target.value)}

              ></textarea>
          </>
        ))}

        {tripHighlightRows.length === 0 && <div>No Trip highlights yet.</div>}
      </div>
    </div>
  );
};

export default TripHighlights;
