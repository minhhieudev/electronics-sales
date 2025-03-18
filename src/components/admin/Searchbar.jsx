import React from "react";
import { FaSearch } from "react-icons/fa";
const SearchBar = ({ searchTerm, onSearch, placeholder }) => {
  return (
    <div>
      <label className="text-base font-bold">Tìm kiếm</label>
      <div className="relative w-[308px] mt-1">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
        <input
          type="text"
          className="w-full h-9 pl-10 pr-3 text-sm border border-indigo-500 rounded-2xl focus:outline-none focus:border-indigo-700 bg-white text-gray-900"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
