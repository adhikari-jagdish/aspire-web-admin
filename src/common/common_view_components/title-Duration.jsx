import { Select, Title } from "@mantine/core";

const TitleDuration = ({
  titleName,
  durationName,
  titleValue,
  durationValue,
  onChange,
}) => {
  //duration days
  let durationDays = Array.from({ length: 100 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} ${i + 1 === 1 ? "Day" : "Days"}`,
  }));

  return (
    <div className="flex items-center justify-center gap-30">
      <div className="flex flex-col w-[750px] gap-2">
        <Title order={4} ta="left" c="dark" className="flex flex-col">
          Title
        </Title>
        <input
          type="text"
          name={titleName}
          value={titleValue}
          onChange={onChange}
          id="title"
          className="border border-gray-500 outline-0 rounded ml-1 h-[40px] pl-2"
          placeholder="Enter title"
        />
      </div>

      <div className="flex flex-col w-[500px] gap-2">
        <Title order={4} ta="left" c="dark" className="flex flex-col">
          Duration
        </Title>
        <Select
          placeholder="Max 100 Days"
          name={durationName}
          value={durationValue}
          onChange={(val) =>
            onChange({ target: { name: durationName, value: val } })
          }
          data={durationDays}
          searchable
          nothingFound="No match"
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
      </div>
    </div>
  );
};

export default TitleDuration;
