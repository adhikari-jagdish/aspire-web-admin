const CommmonDestinationsViewComponent = ({ destinations }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-[500px] pl-2 ">
      {destinations?.map((destination, idx) => (
        <div
          key={idx}
          className="border border-gray-500 rounded-[5px] px-3 py-1 text-sm text-center"
        >
          {destination.title || "N/A"}
        </div>
      ))}
    </div>
  );
};

export default CommmonDestinationsViewComponent;
