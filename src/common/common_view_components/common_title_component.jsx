const CommonTitleComponent = ({ title }) => {
  return (
    <div className="inline-block relative mt-5">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div
        className="h-[3px] bg-blue-500 mt-1"
        style={{ width: "calc(20% + 4px)" }}
      />
    </div>
  );
};

export default CommonTitleComponent;
