const TitleDuration = () => {
  //duration days
  let durationDays = [];

  for (let i = 1; i <= 100; i++) {
    durationDays.push(i);
  }

  return (
    <div className="flex gap-30 pl-2">
      <div className="flex flex-col w-[600px] gap-2">
        <label htmlFor="title" className="text-xl font-bold">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="border border-gray-500 outline-0 rounded ml-1 h-[40px] pl-2"
          placeholder="Enter title"
        />
      </div>

      <div className="flex flex-col w-[300px] gap-2">
        <label htmlFor="duration" className="text-xl font-bold">
          Duration
        </label>
        <select
          name="duration"
          id="duration"
          className="border border-gray-500 outline-0 rounded ml-1 h-[40px] cursor-pointer "
        >
          <option value="">Max 100 Days</option>
          {durationDays.map((day) => (
            <option value="1" key={day}>
              {" "}
              {day} {day > 9 ? " Days" : "Day"}{" "}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TitleDuration;
