import React from "react";
import { HiChevronDown } from "react-icons/hi";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-6 py-1.5 h-[68px]">
      <div className="ml-auto flex items-center space-x-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrONw29HVxpH0QxAyvhzzJwzlGVBDag619Zw&s"
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-gray-700 font-medium">Minh Quang</span>
        <HiChevronDown className="text-gray-500 hover:text-gray-700 cursor-pointer text-xl" />
      </div>
    </nav>
  );
};

export default Navbar;
