import { useEffect, useState } from "react";
import useAuth from "../../../auth/components/use_auth";
import TripHighlightRepository from "../../../trip highlights/repository/tripHighlight_repository";
import { useNotification } from "../../hooks/useNotification";

const CommonTripHighlightsView = ({ tripHighlightList }) => {
  const [tripHighlights, setTripHighlights] = useState([]);
  const { getToken } = useAuth();
  const notify = useNotification();

  const tripHighlightRepository = new TripHighlightRepository(getToken);

  useEffect(() => {
    const fetchTripHighlights = async () => {
      try {
        const tripHighlightResponse =
          await tripHighlightRepository.getTripHighlights();
        setTripHighlights(tripHighlightResponse.data);
      } catch (error) {
        notify({
          type: "error",
          message: error.message ?? "Something went wrong. Please try again!",
        });
      }
    };
    fetchTripHighlights();
  }, []);

  const tripHighlightTitles = tripHighlights.filter(
    (trip) =>
      tripHighlightList.some((t) => trip._id === t.tripHighlightsId)
  ).map(trip => trip.title);

  const fallBackImageUrl =
    "https://img.favpng.com/5/1/8/no-icon-png-favpng-PdDFZn3LtBiKi6JEapF5jAtgi.jpg";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
      {tripHighlightList.map((trip, idx) => (
        <div
          key={idx}
          className="flex items-start gap-3 border border-dotted border-blue-300 rounded-md p-3"
        >
          <img
            src={trip.icon || fallBackImageUrl}
            onError={(e) => {
              e.currentTarget.onerror = null; // Prevents infinite loop in case fallback also fails
              e.currentTarget.src = fallBackImageUrl;
            }}
            alt={trip.title || "Icon"}
            className="w-10 h-10 object-contain"
          />
          <div className="space-y-1 text-sm">
            <div className="font-semibold">{tripHighlightTitles[idx] || "N/A"}</div>
            <div>{trip.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommonTripHighlightsView;
