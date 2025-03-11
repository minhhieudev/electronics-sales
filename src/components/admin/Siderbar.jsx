import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../Images/logo.png";
import { MdDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdBrandingWatermark } from "react-icons/md";
import { PiTrashSimpleBold } from "react-icons/pi";
import { BsBox2 } from "react-icons/bs";
import { RiListOrdered2 } from "react-icons/ri";
import { FiBarChart2 } from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard />, link: "/admin/dashboard" },
    { name: "Tài khoản", icon: <FaRegUser />, link: "/admin/accounts" },
    { name: "Thương hiệu", icon: <MdBrandingWatermark />, link: "/brands" },
    { name: "Loại", icon: <PiTrashSimpleBold />, link: "/categories" },
    { name: "Sản phẩm", icon: <BsBox2 />, link: "/products" },
    { name: "Đơn hàng", icon: <RiListOrdered2 />, link: "/orders" },
    { name: "Thống kê", icon: <FiBarChart2 />, link: "/statistics" },
  ];

  return (
    <div className="h-screen bg-white shadow-lg flex flex-col">
      {/* Logo */}
      <div className="flex flex-col px-2 mt-3 mb-5">
        <a href="/admin">
          <img src={logo} alt="Logo" className="w-[120px] h-[40px] object-cover" />
        </a>
      </div>

      {/* Menu */}
      <ul className="flex flex-col px-2 space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.link}
              onClick={() => setActiveLink(item.link)}
              className={`flex items-center w-full h-12 px-4 rounded-lg transition-colors duration-200
                ${activeLink === item.link ? "bg-indigo-600 text-white font-bold" : "text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 font-semibold"}`}
              
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
