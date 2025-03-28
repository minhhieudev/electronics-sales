import React, { useState, useRef, useEffect } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { HiChevronDown } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../app/redux/slices/auth.slice';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-6 py-2 h-[68px] relative">
      <div className="ml-auto relative">
        <div
          className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrONw29HVxpH0QxAyvhzzJwzlGVBDag619Zw&s"
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-gray-700 font-medium whitespace-nowrap">
            {userInfo?.fullName || "Người dùng"}
          </span>
          <HiChevronDown className="text-gray-500 hover:text-gray-700 cursor-pointer text-xl" />
        </div>

        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
          >
            {/* Mũi nhọn có viền */}
            <div className="absolute -top-2 right-6 w-4 h-4 rotate-45 bg-white border border-gray-300"></div>

            <div className="relative bg-white rounded-lg z-10">
              <div
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
              >
                <IoLogOutOutline />
                <span className="text-sm ml-2">Đăng xuất</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
