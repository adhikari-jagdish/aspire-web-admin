import { Group, TextInput, Title } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const hotelCategories = ["Budget", "Standard", "Deluxe", "Luxury", "Boutique"];
const initialRate = {
  hotelCategory: "",
  rateInNPR: null,
  rateInUSD: null,
  rateInINR: null,
  rateInEUR: null,
};

const currencyFields = [
  { label: "NPR", name: "rateInNPR" },
  { label: "USD", name: "rateInUSD" },
  { label: "INR", name: "rateInINR" },
  { label: "EUR", name: "rateInEUR" },
];

const PackageRate = ({ name, value, onChange, isEditTour }) => {
  const [packageRates, setPackageRates] = useState([]);
  useEffect(() => {
    if(isEditTour && Array.isArray(value)){
      const initialized = value?.map(v => ({
          hotelCategory: v.hotelCategory || "",
          rateInNPR: v.rateInNPR || null,
          rateInEUR: v.rateInEUR || null,
          rateInUSD: v.rateInUSD || null,
          rateInINR: v.rateInINR || null
      }));

      setPackageRates(initialized)
    } 
  },[isEditTour, JSON.stringify(value)]);
  const handleAdd = () => {
    const updated = [...packageRates, { ...initialRate }]
    setPackageRates(updated);
    
    onChange({ target: { name, value: updated } });
  };

  const handleUpdate = (idx, field, value) => {
    const isNumericField  = field.startsWith('rateIn');
    const parsedValue = isNumericField ? parseFloat (value) || 0: value;
    setPackageRates((prev) => {
      const updated = prev.map((item, i) =>
        i === idx ? { ...item, [field]: parsedValue } : item
      );
      onChange({ target: { name: "packageRate", value: updated } });

      return updated;
    });
  };
  //disable selected hotel
  const selectedHotels = packageRates
    ?.map((p) => p.hotelCategory)
    .filter(Boolean);

  const handleDelete = (idx) =>
    setPackageRates((prev) => prev.filter((_, i) => i !== idx));
  return (
    <div>
      <div className="w-[100%] flex justify-between items-center">
        <Title
          order={4}
          mt={20}
          mb={10}
          ta="left"
          c="dark"
          className="flex flex-col"
        >
          Package Rates
          <span className="border border-b-1 w-[120px]"></span>
        </Title>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center gap-1"
        >
          <IconPlus size={20} />
        </button>
      </div>

      <div className="border border-gray-400 p-2 rounded w-[100%] space-y-6">
        {packageRates.length > 0 ? (
          packageRates.map((p, idx) => (
            <div key={idx} className="space-y-4">
              <div className="space-x-8">
                <label
                  htmlFor="hotelCategory"
                  className="font-medium text-[17px]"
                >
                  Hotel Category:
                </label>
                <select
                  className="border border-gray-400 p-1 rounded text-xl text-center w-[85%] outline-0"
                  value={p.hotelCategory}
                  onChange={(e) =>
                    handleUpdate(idx, "hotelCategory", e.target.value)
                  }
                  style={{ fontSize: "14px" }}
                >
                  <option value="">Select Category</option>
                  {hotelCategories.map((cat, i) => (
                    <option
                      key={i}
                      value={cat}
                      disabled={
                        selectedHotels.includes(cat) && p.hotelCategory !== cat
                      }
                    >
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h2 className="font-semibold text-[16px]">Rates:</h2>
                <Group grow justify="center">
                  {currencyFields.map(({ label, name }) => (
                    <TextInput
                      min={0}
                      key={name}
                      label={label}
                      type="number"
                      value={p[name] === 0 ? "" : p[name] || ""}
                      onChange={(e) =>{ 
                        const value = e.target.value; 
                      handleUpdate(idx, name, value === "" ? "" : Number(value))}}
                      placeholder={`Rate in ${label}`}
                      name={name}
                      required
                      labelProps={{
                        style: { fontSize: "13px", fontWeight: 500,  },
                      }}
                      className="placeholder:text-sm"
                      onWheel={e => e.target.blur()}
                      onKeyDown={e => {
                        if(["e", "E", "+", "-"].includes(e.key)){
                          e.preventDefault();;
                        }
                      }}
                    />
                  ))}

                  <div className="flex justify-end h-[35px] gap-2 mt-5">
                    <button
                      onClick={() => handleDelete(idx)}
                      className="bg-red-200 text-red-600 px-2 py-1 rounded hover:bg-red-300 flex items-center gap-1 text-xl"
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>
                </Group>
              </div>

              {packageRates.length > 1 && (
                <hr className="border-gray-400 w-[90%]" />
              )}
            </div>
          ))
        ) : (
          <span>No Package Rates yet.</span>
        )}
      </div>
    </div>
  );
};

export default PackageRate;
