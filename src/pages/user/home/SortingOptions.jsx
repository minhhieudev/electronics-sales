import React, { useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';

const SORT_OPTIONS = [
    { value: 'popular', label: 'Phổ biến' },
    { value: 'newest', label: 'Mới nhất' },
    { value: 'best-selling', label: 'Bán chạy' }
];

const SortingOptions = ({ onSortChange }) => {
    const [selectedSort, setSelectedSort] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSortChange = (sortType) => {
        setSelectedSort(sortType);
        onSortChange(sortType);
    };

    const handlePriceSortChange = (order) => {
        const sortType = `price-${order}`;
        setSelectedSort(sortType);
        onSortChange(sortType);
        setShowDropdown(false);
    };

    return (
        <div className="flex gap-4 items-center justify-between mt-7">
            <div className='font-bold text-[24px]'>
                Tất cả sản phẩm
            </div>
            <div className='flex justify-between gap-4 items-center text-[16px]'>
                <span className='font-bold'>Sắp xếp theo</span>
                <div className='flex gap-2 text-gray-600 font-bold'>
                    {SORT_OPTIONS.map((sortType) => (
                        <button
                            key={sortType.value}
                            onClick={() => handleSortChange(sortType.value)}
                            className={`border rounded px-3 py-1 flex items-center ${selectedSort === sortType.value ? 'border-[#FF8900] text-[#FF8900]' : 'border-gray-300'}`}
                        >
                            {sortType.label}
                        </button>
                    ))}
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className={`border rounded px-3 py-1 flex items-center ${selectedSort.startsWith('price') || showDropdown ? 'border-[#FF8900] text-[#FF8900]' : 'border-gray-300'}`}
                        >
                            Giá
                            <AiOutlineDown className="h-4 w-3 cursor-pointer ml-3" />
                        </button>
                        {showDropdown && (
                            <div className="absolute bg-white border border-gray-300 rounded mt-1 z-10 w-18">
                                <button onClick={() => handlePriceSortChange('asc')} className="block px-2 py-2 text-gray-700 hover:bg-gray-100">Tăng dần</button>
                                <button onClick={() => handlePriceSortChange('desc')} className="block px-2 py-2 text-gray-700 hover:bg-gray-100">Giảm dần</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortingOptions;