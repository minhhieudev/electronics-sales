import React, { useEffect, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';

const SORT_OPTIONS = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'best-selling', label: 'Bán chạy' }
];

const SortingOptions = ({ onSortChange, isMobile = false, currentSort }) => {
    const [selectedOption, setSelectedOption] = useState(currentSort || '');
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        if (value) {
            setSelectedOption(`price-${value}`);
            onSortChange(`price-${value}`);
        } else {
            setSelectedOption('');
            onSortChange('');
        }
    };

    if (isMobile) {
        return (
            <div className="flex flex-col">
                <div className="relative">
                    <select
                        value={selectedOption}
                        onChange={(e) => handleButtonClick(e.target.value)}
                        className={`w-full py-2 px-3 text-sm appearance-none cursor-pointer focus:outline-none rounded-md border ${selectedOption ? 'text-[#FF8900] border-[#FF8900] bg-orange-50 font-medium' : 'text-gray-700 border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <option value="">Chọn phương thức sắp xếp</option>
                        {SORT_OPTIONS.map((sortType) => (
                            <option key={sortType.value} value={sortType.value}>
                                {sortType.label}
                            </option>
                        ))}
                        <option value="price-asc">Giá tăng dần</option>
                        <option value="price-desc">Giá giảm dần</option>
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
            <div className="flex items-center flex-wrap justify-center">
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
                            </button>
                        );
                    })}

                    <div className="relative min-w-[90px]">
                        <select
                            value={selectedOption.startsWith('price-') ? selectedOption.replace('price-', '') : ''}
                            onChange={handlePriceSelectChange}
                            className={`w-full bg-white border rounded-md px-3 py-1.5 pr-8 appearance-none cursor-pointer focus:outline-none text-sm transition-all ${selectedOption.startsWith('price-')
                                ? 'border-[#FF8900] text-[#FF8900] bg-orange-50 font-medium'
                                : 'border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            <option value="">Giá</option>
                            <option value="asc">Tăng dần</option>
                            <option value="desc">Giảm dần</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                            <AiOutlineDown className={`h-4 w-4 ${selectedOption.startsWith('price-') ? 'text-[#FF8900]' : 'text-gray-500'
                                }`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortingOptions;