import React, { useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';

const SORT_OPTIONS = [
    { value: 'popular', label: 'Phổ biến' },
    { value: 'newest', label: 'Mới nhất' },
    { value: 'best-selling', label: 'Bán chạy' }
];

const SortingOptions = ({ onSortChange }) => {
    const [sortOption, setSortOption] = useState({
        popular: false,
        newest: false,
        bestSelling: false,
        price: ''
    });

    const handleButtonClick = (option) => {
        // Reset 
        const newSortOption = {
            popular: false,
            newest: false,
            bestSelling: false,
            price: ''
        };

        switch (option) {
            case 'popular':
                newSortOption.popular = true;
                break;
            case 'newest':
                newSortOption.newest = true;
                break;
            case 'best-selling':
                newSortOption.bestSelling = true;
                break;
            default:
                break;
        }

        setSortOption(newSortOption);
        onSortChange(option);
    };

    const handlePriceSelectChange = (e) => {
        const value = e.target.value;

        const newSortOption = {
            popular: false,
            newest: false,
            bestSelling: false,
            price: value
        };

        setSortOption(newSortOption);

        if (value) {
            onSortChange(`price-${value}`);
        }
    };

    return (
        <div className="flex items-center justify-between mb-6">
            <div className='font-bold text-[24px]'>
                Tất cả sản phẩm
            </div>
            <div className='flex items-center gap-3 text-[16px]'>
                <span className='font-semibold whitespace-nowrap'>Sắp xếp theo</span>
                <div className='flex gap-4'>
                    {SORT_OPTIONS.map((sortType) => {
                        const isSelected = sortOption[sortType.value === 'best-selling' ? 'bestSelling' : sortType.value];
                        return (
                            <button
                                key={sortType.value}
                                onClick={() => handleButtonClick(sortType.value)}
                                className={`border bg-white rounded px-2 py-1 flex items-center whitespace-nowrap ${isSelected ? 'border-[#FF8900] text-[#FF8900]' : 'border-gray-300'
                                    }`}
                            >
                                {sortType.label}
                            </button>
                        );
                    })}
                    <div className="relative">
                        <select
                            value={sortOption.price}
                            onChange={handlePriceSelectChange}
                            className={`bg-white border rounded px-3 py-1 pr-8 min-w-[120px] appearance-none cursor-pointer focus:outline-none ${
                                sortOption.price ? 'border-[#FF8900]' : 'border-gray-300'
                            }`}
                            style={{
                                color: sortOption.price ? '#FF8900' : 'inherit'
                            }}
                        >
                            <option value="" style={{ color: 'inherit' }}>Giá</option>
                            <option 
                                value="asc" 
                                style={{ color: sortOption.price === 'asc' ? '#FF8900' : 'inherit' }}
                            >
                                Tăng dần
                            </option>
                            <option 
                                value="desc" 
                                style={{ color: sortOption.price === 'desc' ? '#FF8900' : 'inherit' }}
                            >
                                Giảm dần
                            </option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                            <AiOutlineDown className={`h-4 w-3 ${
                                sortOption.price ? 'text-[#FF8900]' : 'text-gray-500'
                            }`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortingOptions;