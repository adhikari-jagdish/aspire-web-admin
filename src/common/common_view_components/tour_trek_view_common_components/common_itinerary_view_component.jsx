const CommonItineraryViewComponent = ({ sectionsRef, itineraryData }) => {
  return (
    <ul ref={sectionsRef} className="space-y-3 mt-3 scroll-mt-[60px]">
      {itineraryData.map((day, idx) => (
        <li
          key={idx}
          className="bg-blue-50 p-2 rounded border border-dotted border-gray-400"
        >
          <strong>{day.dayAndTitle}</strong> <br />
          <span>Details: </span> {day.details?.[0]}
        </li>
      ))}
    </ul>
  );
};

export default CommonItineraryViewComponent;
