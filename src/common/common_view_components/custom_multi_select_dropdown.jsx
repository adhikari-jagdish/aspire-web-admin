import { Select } from "@mantine/core"

const CustomDropDown = ({
    name, 
    value, 
    placeholder,
    data=[],
    onChange,
}) => {
  return (
    <Select
        name={name}
        value={value}
        placeholder={placeholder || "Select..."}
        data={data}
        onChange={val => onChange({target: {name, value: val}})}
        searchable
        nothingFound="No Match"
        className="ml-1"
          styles={{
            input: {
              height: "42px",
              borderColor: "#4B5563",
            },
            dropdown: {
              borderColor: "#4B5563",
            },
          }}
     />

  )
}

export default CustomDropDown