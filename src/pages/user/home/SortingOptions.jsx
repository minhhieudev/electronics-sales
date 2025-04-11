import React, { useEffect, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';

const SORT_OPTIONS = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'bestseller', label: 'Bán chạy' }
];

const SortingOptions = ({ onSortChange, isMobile = false, currentSort }) => {
    const [selectedOption, setSelectedOption] = useState(currentSort || '');

    useEffect(() => {
        setSelectedOption(currentSort || '');
    }, [currentSort]);

    const handleButtonClick = (option) => {
        if (selectedOption === option) {
            setSelectedOption('');
            onSortChange('');
        } else {
            setSelectedOption(option);
            onSortChange(option);
        }
    };

    const handlePriceSelectChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        onSortChange(value);
    };

    if (isMobile) {
        return (
            <div className="flex flex-col">
                <div className="relative">
                    <select
                        value={selectedOption}
                        onChange={(e) => handleButtonClick(e.target.value)}
                        className={`w-full py-2 px-3 appearance-none cursor-pointer focus:outline-none rounded-md border ${selectedOption ? 'text-[#FF8900] border-[#FF8900] bg-orange-50 font-medium' : 'text-gray-700 border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <option value="">Chọn phương thức sắp xếp</option>
                        {SORT_OPTIONS.map((sortType) => (
                            <option key={sortType.value} value={sortType.value}>
                                {sortType.label}
                            </option>
                        ))}
                        <option value="priceAsc">Giá tăng dần</option>
                        <option value="priceDesc">Giá giảm dần</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                        <AiOutlineDown className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </div>
        );
    }

    // Desktop version
    return (
        <div className="py-2">
            <div className="flex items-center flex-wrap justify-between">
                <span className="font-medium text-base text-gray-700 whitespace-nowrap mb-1 mr-3">
                    Sắp xếp theo
                </span>

                <div className="flex flex-wrap gap-2">
                    {SORT_OPTIONS.map((sortType) => {
                        const isSelected = selectedOption === sortType.value;
                        return (
                            <button
                                key={sortType.value}
                                onClick={() => handleButtonClick(sortType.value)}
                                className={`border rounded-md px-3 py-1.5 flex items-center justify-center whitespace-nowrap text-sm transition-all ${isSelected
                                    ? 'border-[#FF8900] text-[#FF8900] bg-orange-50 font-medium'
                                    : 'border-gray-300 bg-white hover:bg-gray-50'
                                    }`}
                            >
                                {sortType.label}
                                {isSelected && (
                                    <IoMdClose
                                        className="ml-1 h-4 w-4"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleButtonClick('');
                                        }}
                                    />
                                )}
                            </button>
                        );
                    })}

                    <div className="relative min-w-[90px]">
                        <select
                            value={selectedOption}
                            onChange={handlePriceSelectChange}
                            className={`w-full bg-white border rounded-md px-3 py-1.5 pr-8 appearance-none cursor-pointer focus:outline-none text-sm transition-all ${selectedOption === 'priceAsc' || selectedOption === 'priceDesc'
                                ? 'border-[#FF8900] text-[#FF8900] bg-orange-50 font-medium'
                                : 'border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            <option value="">Giá</option>
                            <option value="priceAsc">Tăng dần</option>
                            <option value="priceDesc">Giảm dần</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                            {selectedOption === 'priceAsc' || selectedOption === 'priceDesc' ? (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePriceSelectChange({ target: { value: '' } });
                                    }}
                                    className="text-[#FF8900] hover:text-[#FF6900]"
                                >
                                    <IoMdClose className="h-4 w-4" />
                                </button>
                            ) : (
                                <AiOutlineDown className="h-4 w-4 text-gray-500" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortingOptions;