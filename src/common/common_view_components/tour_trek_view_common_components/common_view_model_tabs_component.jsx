import { useState } from "react";

const CommonViewModelTabsComponent = ({
  buttonGroupRef,
  buttons,
  sectionsRef,
}) => {
  const [activeSection, setActiveSection] = useState("overview");
  const scrollToSection = (key) => {
    const ref = sectionsRef[key];


    ref?.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


  return (
    <div
      ref={buttonGroupRef}
      className={`mt-15 gap-3 flex flex-wrap justify-between rounded w-full border-1 border-solid border-blue-200 my-5 p-1 `}
    >
      {buttons.map((b) => (
        <button
          key={b.name}
          onClick={() => {
            scrollToSection(b.name.toLowerCase()),
              setActiveSection(b.name.toLowerCase());
          }}
          className={`text-black font-black flex items-center justify-center gap-2 rounded px-4 py-2 cursor-pointer hover:bg-blue-300  outline-0 ${
            activeSection === b.name.toLowerCase() && "bg-blue-300"
          }`}
        >
          {/* Render the icon */}
          {b.icon && <b.icon className="w-5 h-5" />} {b.name}
        </button>
      ))}
    </div>
  );
};

export default CommonViewModelTabsComponent;
