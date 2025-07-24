const CommonHotelsViewComponent = ({ sectionsRef, hotelList }) => {
  return (
    <div
      ref={sectionsRef}
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 scroll-mt-[60px]"
    >
      {hotelList?.map((hotel, idx) => (
        <div
          key={hotel._id || idx}
          className="bg-white shadow-md rounded-lg overflow-hidden border"
        >
          <div className="p-4">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-2 border-r"> Hotel Name</th>
                  <th className="px-4 py-2 ">City</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border-r">{hotel.title}</td>
                  <td className="px-4 py-2">{hotel.city}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommonHotelsViewComponent;
