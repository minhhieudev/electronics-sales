import React from "react";

const FilterBar = ({ filters, onFilterChange}) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value, page: 1 });
  };

  return (
    <div className={`flex items-center flex-wrap gap-6`}>
      {filters.options?.map(({ label, key, options }) => (
        <div key={key} className="w-[calc(33.333%-1rem)]">
          <label className="text-base font-bold">{label}</label>
          <select
            value={filters[key] || ""}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full h-9 pl-3 pr-3 text-sm border border-gray-500 rounded-xl 
                      focus:outline-none focus:border-indigo-700 bg-white text-gray-900 mt-1"
          >
            <option value="">Tất cả {label.toLowerCase()}</option>
            {options?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
