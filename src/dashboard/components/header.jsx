import { useState, useEffect, useRef } from "react";
import { HiCog, HiLogout } from "react-icons/hi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white text-black p-4 flex items-center justify-end shadow-md">
      {/* Settings and Logout Icons */}
      <div className="flex items-center space-x-4">
        <div className="border border-gray-300 rounded-md px-3 py-0.5">
          <span className="text-md font-small">Hello User</span>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="hover:text-gray-300 transition-colors cursor-pointer"
            aria-label="Settings"
            title="Settings"
          >
            <HiCog className="h-6 w-6" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50">
              <a
                href="#settings"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </a>
              <a
                href="#profile"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </a>
            </div>
          )}
        </div>
        <button
          className="hover:text-gray-300 transition-colors cursor-pointer"
          aria-label="Logout"
          title="Logout"
        >
          <HiLogout className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
