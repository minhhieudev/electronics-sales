import React, { useState, useEffect } from 'react';
import { CONST } from '../../../common/const';
import Pagination from "../../../components/user/pagination/Pagination";
import Sidebar from './Categories';
import data from './data';
import ProductItem from './ProductItem';
import SortingOptions from './SortingOptions';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

const ITEMS_PER_PAGE = CONST.ITEMS_PER_PAGE;

// Danh sách các danh mục
const CATEGORIES = [
    "Tất cả sản phẩm",
    "Điện thoại / Tablet",
    "Laptop",
    "Âm thanh",
    "Đồng hồ, Camera",
    "Tivi",
    "Phụ kiện",
    "Khuyến mãi"
];

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedData, setSortedData] = useState(data);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Kiểm tra xem màn hình có phải là desktop hẹp không
    const isNarrowDesktop = windowWidth >= 768 && windowWidth < 1024;

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const sortByPrice = (data, order) => {
        return [...data].sort((a, b) =>
            order === 'asc' ? a.price - b.price : b.price - a.price
        );
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle sorting change from SortingOptions component
    const handleSortChange = (sortType) => {
        if (sortType === 'price-asc') {
            setSortedData(sortByPrice(data, 'asc'));
        } else if (sortType === 'price-desc') {
            setSortedData(sortByPrice(data, 'desc'));
        } else if (sortType === 'popular') {
            setSortedData([...data].sort((a, b) => b.rating - a.rating));
        } else if (sortType === 'newest') {
            setSortedData([...data].sort((a, b) => 
                new Date(b.created_at) - new Date(a.created_at)
            ));
        } else if (sortType === 'best-selling') {
            setSortedData([...data].sort((a, b) => b.sold - a.sold));
        } else {
            setSortedData(data);
        }
    };

    const handleCategoryChange = (index) => {
        setSelectedCategory(index);
        setCurrentPage(1); // Reset về trang đầu tiên khi chuyển danh mục
        
        // Ở đây có thể thêm logic lọc sản phẩm theo danh mục
        // Ví dụ: const filteredData = data.filter(item => item.category === index);
        // setSortedData(filteredData);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="bg-gradient-to-r from-[#FFFAFA] to-[#f3faf3] min-h-screen">
            <div className='container mx-auto space-y-1 mt-10'>
                {/* Mobile Header */}
                <div className="md:hidden flex justify-between items-center px-4 mb-4">
                    <button 
                        onClick={toggleSidebar}
                        className="p-2 rounded-md bg-white shadow-sm"
                    >
                        <FiMenu className="h-6 w-6 text-gray-700" />
                    </button>
                    <h1 className="font-bold text-xl">{CATEGORIES[selectedCategory]}</h1>
                    {/* Dropdown for Filters */}
                    <select 
                        onChange={(e) => handleSortChange(e.target.value)} 
                        className="p-2 rounded-md bg-white shadow-sm"
                    >
                        <option value="">Lọc</option>
                        <option value="popular">Phổ biến</option>
                        <option value="newest">Mới nhất</option>
                        <option value="best-selling">Bán chạy</option>
                        <option value="price-asc">Giá tăng dần</option>
                        <option value="price-desc">Giá giảm dần</option>
                    </select>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 lg:gap-8 px-4 md:px-8 lg:px-16'>
                    {/* Mobile Sidebar */}
                    {showSidebar && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar}>
                            <div 
                                className="absolute top-0 left-0 h-full w-64 bg-white p-4 overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-bold text-lg">Danh mục</h2>
                                    <button onClick={toggleSidebar} className="p-1 hover:bg-gray-100 rounded-full">
                                        <IoMdClose className="h-6 w-6" />
                                    </button>
                                </div>
                                <Sidebar 
                                    selectedIndex={selectedCategory} 
                                    setSelectedIndex={(index) => {
                                        handleCategoryChange(index);
                                        toggleSidebar(); // Đóng sidebar sau khi chọn danh mục trên mobile
                                    }} 
                                />
                            </div>
                        </div>
                    )}

                    {/* Desktop Sidebar */}
                    <div className="hidden md:block md:col-span-3 lg:col-span-2">
                        <div className="rounded-lg shadow-sm p-0">
                            <Sidebar 
                                selectedIndex={selectedCategory} 
                                setSelectedIndex={handleCategoryChange} 
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-span-1 md:col-span-9 lg:col-span-10">
                        {/* Desktop Category Title and Sorting Options */}
                        <div className="hidden md:block px-4 py-2">
                            <div className="flex items-center justify-between flex-wrap">
                                <h1 className={`font-bold text-xl md:text-2xl ${isNarrowDesktop ? 'w-full text-center' : ''}`}>
                                    {CATEGORIES[selectedCategory]}
                                </h1>
                                
                                {/* Desktop Sorting Options */}
                                <div className={`${isNarrowDesktop ? 'w-full' : ''}`}>
                                    <SortingOptions onSortChange={handleSortChange} />
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                            {currentItems.map(product => (
                                <div key={product.id} className="w-full">
                                    <ProductItem product={product} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className='mt-6 flex justify-center'>
                            <Pagination
                                totalPage={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;