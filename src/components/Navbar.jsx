import React, { useState } from "react";
import { FaBell, FaSearch, FaPlus, FaBars, FaTimes } from "react-icons/fa";
import useNavbar from "../hooks/useNavbar";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    activeDropdown,
    searchQuery,
    setSearchQuery,
    filteredResults,
    dropdownArray,
    handleDropdownEnter,
    handleDropdownLeave,
    handleOptionClick,
    handleSearchSubmit,
    navigate,
    setSearchResults,
  } = useNavbar();

  return (
    <div className="w-full">
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-4 md:px-8 py-3 bg-gradient-to-r from-[#0d253f] to-[#221548] relative z-[1000]">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="TMDB Logo"
            className="w-[120px] sm:w-[140px] md:w-[154px] cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex gap-8 list-none text-white font-semibold text-[15px] xl:text-[16px]">
          {dropdownArray.map(({ key, label, options }) => (
            <li
              key={key}
              className="relative cursor-pointer py-2 hover:text-[#01b4e4]"
              onMouseEnter={() => handleDropdownEnter(key)}
              onMouseLeave={handleDropdownLeave}
            >
              {label}
              {activeDropdown === key && (
                <div className="absolute top-full left-0 bg-white rounded-lg shadow-xl min-w-[200px] mt-2 z-[1001] transition-all duration-200">
                  <div className="absolute -top-2 left-5 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white" />
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="px-5 py-3 text-[#0d253f] font-medium hover:bg-gray-100 hover:text-[#01b4e4] whitespace-nowrap"
                      onClick={() => handleOptionClick(option.path)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-white">
          <FaPlus className="hidden sm:block cursor-pointer text-[18px] hover:text-[#01b4e4]" />
          <div className="hidden sm:block px-3 py-1 border-2 border-white rounded font-semibold text-[13px] cursor-pointer hover:border-[#01b4e4] hover:text-[#01b4e4]">
            EN
          </div>
          <FaBell className="hidden sm:block cursor-pointer text-[18px] hover:text-[#01b4e4]" />
          <div className="hidden sm:flex w-8 h-8 bg-[#01b4e4] rounded-full items-center justify-center font-bold text-[14px] cursor-pointer hover:bg-[#0099cc]">
            A
          </div>
          <FaSearch className="sm:hidden text-[18px] cursor-pointer hover:text-[#01b4e4]" />
          <div
            className="lg:hidden cursor-pointer text-[22px]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden bg-[#0d253f] text-white transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-[400px] py-4" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col gap-3 px-6 font-semibold">
          {dropdownArray.map(({ key, label, options }) => (
            <li key={key} className="cursor-pointer">
              <div
                className="py-2 hover:text-[#01b4e4] flex justify-between items-center"
                onClick={() =>
                  handleDropdownEnter(activeDropdown === key ? null : key)
                }
              >
                {label}
                <span className="text-sm">
                  {activeDropdown === key ? "▲" : "▼"}
                </span>
              </div>
              {activeDropdown === key && (
                <div className="bg-white text-[#0d253f] rounded-md shadow-md mt-1">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 hover:text-[#01b4e4]"
                      onClick={() => {
                        handleOptionClick(option.path);
                        setMenuOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Search Section */}
      <div className="w-full bg-white relative">
        <form
          onSubmit={handleSearchSubmit}
          className="relative max-w-full"
        >
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black text-[18px]" />
          <input
            type="text"
            placeholder="Search for a movie, tv show, person..."
            className="w-full py-3 pl-11 pr-4 bg-[#f5f5f5] text-[#0d253f] text-[15px] outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Search Results */}
        {searchQuery && filteredResults.length > 0 && (
          <div className="absolute bg-white border border-gray-300 max-h-[300px] overflow-y-auto w-full z-[1000] shadow-lg">
            {filteredResults.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className="p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100 font-medium"
                onClick={() => {
                  navigate(
                    `/details/${item.media_type}/${item.id}/${item.name}`
                  );
                  setSearchQuery("");
                  setSearchResults([]);
                }}
              >
                <FaSearch className="text-gray-500" />{" "}
                {item.title || item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
