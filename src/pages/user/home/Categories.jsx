import React, { useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const categories = [
    "Tất cả sản phẩm",
    "Điện thoại / Tablet",
    "Laptop",
    "Âm thanh",
    "Đồng hồ, Camera",
    "Tivi",
    "Phụ kiện",
    "Khuyến mãi"
  ];

  return (
    <div className="w-[268px] mt-3 bg-opacity-20 p-4 text-base h-[400px]">
      <h2 className="font-bold mb-4 text-gray-400">DANH MỤC</h2>
      <ul className="space-y-2 ">
        {categories.map((category, index) => (
          <div
            className='flex justify-between items-center font-bold py-2 cursor-pointer'
            key={index}
            onClick={() => setSelectedIndex(index)}
          >
            <li className={selectedIndex === index ? "text-[#FF8900]" : ""}>{category}</li>
            <AiOutlineRight
              className={`h-3 w-3 cursor-pointer ${selectedIndex === index ? "text-[#FF8900]" : "text-gray-400"}`}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;