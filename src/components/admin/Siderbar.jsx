import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdBrandingWatermark } from "react-icons/md";
import { PiTrashSimpleBold } from "react-icons/pi";
import { BsBox2 } from "react-icons/bs";
import { RiListOrdered2 } from "react-icons/ri";

const Sidebar = () => {
  const location = useLocation();
  const [, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard />, link: "/admin/dashboard" },
    { name: "Tài khoản", icon: <FaRegUser />, link: "/admin/accounts" },
    { name: "Loại", icon: <PiTrashSimpleBold />, link: "/admin/category" },
    { name: "Thương hiệu", icon: <MdBrandingWatermark />, link: "/admin/brand" },
    { name: "Sản phẩm", icon: <BsBox2 />, link: "/admin/product" },
    { name: "Đơn hàng", icon: <RiListOrdered2 />, link: "/admin/order" },
  ];

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Logo */}
      <Link to="/admin" className="flex items-center gap-2 group mt-2 mb-2 ml-5">
        <div className="relative overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          <img
            src={`${process.env.REACT_APP_CDN_URL}wozgukimzz5rg8g3xxr0.png`}
            alt="Logo"
            className="w-[50px] h-[50px] object-cover transition-transform duration-500 hover:rotate-6"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/30 to-orange-400/30 opacity-0 transition-opacity duration-300"></div>
        </div>
        <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400 relative">
          <span className="animate-glow font-black">PHQ Shop</span>
        </span>
      </Link>

      {/* Menu */}
      <ul className="flex flex-col px-2 space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.link}
              onClick={() => setActiveLink(item.link)}
              className={`flex items-center w-full h-12 px-4 rounded-lg transition-colors duration-200
                ${location.pathname.startsWith(item.link) ? "bg-indigo-600 text-white font-bold" : "text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 font-semibold"}`}
            >
              <span className="w-8 h-8 mr-4 flex items-center justify-center text-xl">
                {item.icon}
              </span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;