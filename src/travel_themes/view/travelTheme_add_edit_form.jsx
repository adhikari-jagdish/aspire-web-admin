

const TravelThemeAddEditForm = ({ onClose }) => (
    <div>
        <h3 className="text-xl font-semibold">Add/Edit Destination</h3>
        <p>Form for adding or editing a destination.</p>
        <div className="mt-4">
            <input
                type="text"
                placeholder="Destination Name"
                className="w-full p-2 border rounded mb-2"
            />
            <input
                type="text"
                placeholder="Description"
                className="w-full p-2 border rounded mb-2"
            />
            <div className="flex justify-end space-x-2">
                <button
                    onClick={onClose}
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
);


export default TravelThemeAddEditForm;