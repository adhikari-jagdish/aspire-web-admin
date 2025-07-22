const CommonPackageRateViewComponent = ({ sectionsRef, packageRateList }) => {
  return (
    <div
      ref={sectionsRef}
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 scroll-mt-[60px]"
    >
      {packageRateList.map((p, idx) => (
        <div
          key={p._id || idx}
          className="bg-white shadow-md rounded-lg overflow-hidden border"
        >
          <div className="bg-gray-100 p-3 border-b text-center text-md font-bold ">
            No of Person: {p.noOfPerson}
          </div>

          <div className="p-4">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-2 border-r">NPR</th>
                  <th className="px-4 py-2 border-r">INR</th>
                  <th className="px-4 py-2 border-r">USD</th>
                  <th className="px-4 py-2">EUR</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50 transition text-md">
                  <td className="px-4 py-2 border-r">
                    <strong className="text-sm">Rs.</strong> {p.rateInNPR}
                  </td>
                  <td className="px-4 py-2 border-r ">
                    <strong className="text-sm">₹ </strong>
                    {p.rateInINR}
                  </td>
                  <td className="px-4 py-2 border-r">
                    <strong className="text-sm">$</strong> {p.rateInUSD}
                  </td>
                  <td className="px-4 py-2">
                    <strong className="text-sm">€</strong> {p.rateInEUR}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommonPackageRateViewComponent;
