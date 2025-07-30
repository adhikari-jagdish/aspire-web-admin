import { Group, TextInput, Title } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const noOfPerson = [
  { label : "2-3 pax", value : 2 },
  { label : "4-7 pax", value : 4 },
  { label : "8-13 pax", value: 8 },
  { label: "14-21 pax", value : 14 },
  { label: "22-30 pax", value: 22 },
];
const initialRate = {
  noOfPerson: null,
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

const PackageRate = ({ name, value, onChange, isEditTour, isEditTrekking, isEditExpedition, isEditPeakClimbing }) => {
  const [packageRates, setPackageRates] = useState([]);
  useEffect(() => {
    if ((isEditTour || isEditTrekking || isEditExpedition || isEditPeakClimbing) && Array.isArray(value)) {
      const initialized = value?.map((v) => ({
        noOfPerson: v.noOfPerson || null,
        rateInNPR: v.rateInNPR || null,
        rateInEUR: v.rateInEUR || null,
        rateInUSD: v.rateInUSD || null,
        rateInINR: v.rateInINR || null,
      }));

      setPackageRates(initialized);
    }
  }, [isEditTour, isEditExpedition,isEditPeakClimbing,isEditTrekking, JSON.stringify(value)]);
  const handleAdd = () => {
    const updated = [...packageRates, { ...initialRate }];
    setPackageRates(updated);

    onChange({ target: { name, value: updated } });
  };

  const handleUpdate = (idx, field, value) => {
    const isNumericField = field.startsWith("rateIn");
    const parsedValue = isNumericField ? parseFloat(value) || 0 : value;
    setPackageRates((prev) => {
      const updated = prev.map((item, i) =>
        i === idx ? { ...item, [field]: parsedValue } : item
      );
      onChange({ target: { name: "packageRate", value: updated } });

      return updated;
    });
  };
  //disable selected hotel
  const selectedPax = packageRates
    ?.map((p) => p.noOfPerson)
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
        </Title>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center gap-1 cursor-pointer"
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
                  htmlFor="noOfPerson"
                  className="font-medium text-[17px]"
                >
                  No of Person:
                </label>
                <select
                  className="border border-gray-400t p-1 rounded text-xl text-center w-[85%] outline-0 cursor-pointer"
                  value={p.noOfPerson}
                  onChange={(e) =>
                    handleUpdate(idx, "noOfPerson", parseInt(e.target.value))
                  }
                  style={{ fontSize: "14px" }}
                >
                  <option value="">Select No of Person</option>
                  {noOfPerson.map((p, i) => {
                    return <option
                      key={i}
                      value={p.value}
                      disabled={
                        selectedPax.includes(p.value) 
                      }
                    >
                      {p.label}
                    </option>
                  })}
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
                      onChange={(e) => {
                        const value = e.target.value;
                        handleUpdate(
                          idx,
                          name,
                          value === "" ? "" : Number(value)
                        );
                      }}
                      placeholder={`Enter Rate in ${label}`}
                      name={name}
                      required
                      labelProps={{
                        style: { fontSize: "13px", fontWeight: 500 },
                      }}
                      className="placeholder:text-sm"
                      onWheel={(e) => e.target.blur()}
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-"].includes(e.key)) {
                          e.preventDefault();
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
