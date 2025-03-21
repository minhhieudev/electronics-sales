import React, { useEffect, useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../../app/redux/slices/user/category.slice';

const Categories = ({ selectedIndex, setSelectedIndex }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);

      dispatch(fetchCategories({
        onSuccess: (data) => {
          setCategories(data);
          setLoading(false);
        },
      }))
    };
    getCategories();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="bg-opacity-20 py-4 px-0 text-base">
        <h2 className="text-sm mb-4 text-gray-500 uppercase font-semibold">Danh mục</h2>
        <div className="text-center text-gray-500">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="bg-opacity-20 py-4 px-0 text-base">
      <h2 className="text-sm mb-4 text-gray-500 uppercase font-semibold">Danh mục</h2>
      <ul className="space-y-1">
        {categories.map((category, index) => (
          <li
            key={index}
            className={`flex justify-between items-center py-2 px-1 cursor-pointer rounded hover:bg-gray-50 ${selectedIndex === category.name ? "text-[#FF8900]" : "text-gray-700"
              }`}
            onClick={() => setSelectedIndex(category)}
          >
            <span className={`text-sm md:text-base font-medium truncate pr-2 ${selectedIndex === category.name ? "font-semibold" : ""
              }`}>
              {category.name}
            </span>
            <AiOutlineRight
              className={`h-3 w-3 flex-shrink-0 ${selectedIndex === category.name ? "text-[#FF8900]" : "text-gray-400"
                }`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;