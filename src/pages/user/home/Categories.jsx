import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';

const Categories = ({ selectedIndex, setSelectedIndex }) => {
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
    <div className="bg-opacity-20 py-4 px-0 text-base">
      <h2 className="text-sm mb-4 text-gray-500 uppercase font-semibold">Danh mục</h2>
      <ul className="space-y-1">
        {categories.map((category, index) => (
          <li
            key={index}
            className={`flex justify-between items-center py-2 px-1 cursor-pointer rounded hover:bg-gray-50 ${selectedIndex === index ? "text-[#FF8900]" : "text-gray-700"
              }`}
            onClick={() => setSelectedIndex(index)}
          >
            <span className={`text-sm md:text-base font-medium truncate pr-2 ${selectedIndex === index ? "font-semibold" : ""
              }`}>
              {category}
            </span>
            <AiOutlineRight
              className={`h-3 w-3 flex-shrink-0 ${selectedIndex === index ? "text-[#FF8900]" : "text-gray-400"
                }`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;