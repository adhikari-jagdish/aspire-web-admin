import { useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", icon: "🏠" },
  { name: "Destinations", icon: "🥾" },
  { name: "TravelThemes", icon: "🌍" },
  { name: "Tours", icon: "🗺️" },
  { name: "TripHighlights", icon: "✨" },
  { name: "Trekkings", icon: "🥾" },
  { name: "Expeditions", icon: "🗺️" },
  { name: "PeakClimbings", icon: "⛰️" },
  { name: "Adventures", icon: "🧗" },
  { name: "About", icon: "ℹ️" },
  { name: "Contact", icon: "📞" },
  { name: "Gallery", icon: "📸" },
  { name: "Hotels", icon: "🏨" },
  { name: "Hotel Category", icon: "⭐" },
  { name: "Carousels", icon: "🔁" },
  { name: "Vehicles", icon: "🚗" },
  { name: "Menu", icon: "📋" },
  { name: "FAQTitles", icon: "❓" },
  { name: "Top-Rated-Packages", icon: "📦" },
  { name: "Trending-Packages", icon: "🔥" },
  { name: "Reviews", icon: "⭐" },
  { name: "Blogs", icon: "⭐" },
  { name: "Faqs", icon: "⭐" },
];

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleNavbar}
        className="md:hidden p-4 text-gray-400 focus:outline-none z-50"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 overflow-y-scroll left-0 bg-white text-white shadow-md transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-4">
          <img
            src="https://i.ibb.co/N2WHzdZv/aspiration-logo-2.png" // <-- replace with your actual logo path
            alt="Logo"
            className="w-25 h-25 object-contain text-center mx-auto"
          />
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={`${item.name.toLowerCase()}`}
              className="flex items-center px-4 py-3 text-black hover:bg-gray-500 hover:text-white transition-colors"
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={toggleNavbar}
        ></div>
      )}
    </div>
  );
};

export default SideNav;
