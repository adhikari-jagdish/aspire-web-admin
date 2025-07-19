const CommonTravelThemesViewComponent = ({ travelThemes }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-[600px] pl-2 mt-3">
      {travelThemes?.map((travelTheme) => (
        <div
          key={travelTheme}
          className="border border-gray-500 rounded-[5px] px-2 py-1 text-sm text-center"
        >
          {travelTheme.title || "N/A"}
        </div>
      ))}
    </div>
  );
};

export default CommonTravelThemesViewComponent;
