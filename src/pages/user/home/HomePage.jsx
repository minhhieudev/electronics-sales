import React, { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchProductsAction } from '../../../app/redux/slices/user/product.slice';
import { CONST } from '../../../common/const';
import Pagination from "../../../components/user/pagination/Pagination";
import Categories from './Categories';
import ProductItem from './ProductItem';
import SortingOptions from './SortingOptions';

const ITEMS_PER_PAGE = CONST.ITEMS_PER_PAGE;

const HomePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [sortType, setSortType] = useState('');
    const [showCategories, setShowCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({ id: 0, name: "Tất cả sản phẩm" });
    const [currentPage, setCurrentPage] = useState(0);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    // Check if the screen is a narrow desktop
    const isNarrowDesktop = windowWidth >= 768 && windowWidth < 1024;

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Read query parameters from URL
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchFromUrl = searchParams.get('search');

        setSearch(searchFromUrl || '');
    }, [location.search]);

    // Fetch data
    useEffect(() => {
        const fetchData = () => {
            const categoryId = selectedCategory.id;

            dispatch(fetchProductsAction({
                params: {
                    search,
                    page: currentPage,
                    limit: ITEMS_PER_PAGE,
                    categoryId: categoryId !== 0 ? categoryId : '',
                    orderBy: sortType
                },
                onSuccess: (data) => {
                    setProducts(data.items || []);
                    setTotalPages(data.pageInfo?.totalPages || 0);
                }
            }));
        };

        fetchData();
    }, [dispatch, currentPage, sortType, selectedCategory, search]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle sorting change from SortingOptions component
    const handleSortChange = (newSortType) => {
        setSortType(newSortType);
        setCurrentPage(0);
    };

    const handleCategoryChange = (data) => {
        setSelectedCategory({ id: data.id, name: data.name });
        setCurrentPage(0);
    };

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    return (
        <div className="bg-gradient-to-r min-h-screen mt-5">
            <div className='mx-auto space-y-1'>
                {/* Mobile Header */}
                <div className="md:hidden flex justify-between items-center mb-4 px-4 md:px-8 lg:px-16">
                    <button
                        onClick={toggleCategories}
                        className="p-2 rounded-md bg-white shadow-sm"
                    >
                        <FiMenu className="h-6 w-6 text-gray-700" />
                    </button>
                    <h1 className="font-bold text-xl">{selectedCategory.name}</h1>
                    {/* Dropdown for Filters */}
                    <select
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="p-2 rounded-md bg-white shadow-sm focus:outline-none "
                    >
                        <option value="">Lọc</option>
                        <option value="newest">Mới nhất</option>
                        <option value="bestseller">Bán chạy</option>
                        <option value="priceAsc">Giá tăng dần</option>
                        <option value="priceDesc">Giá giảm dần</option>
                    </select>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 lg:gap-8 px-4 md:px-8 lg:px-16'>
                    {/* Mobile Categories */}
                    {showCategories && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleCategories}>
                            <div
                                className="absolute top-0 left-0 h-full w-64 bg-white p-4 overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-bold text-lg">Danh mục</h2>
                                    <button onClick={toggleCategories} className="p-1 hover:bg-gray-100 rounded-full">
                                        <IoMdClose className="h-6 w-6" />
                                    </button>
                                </div>
                                <Categories
                                    selectedIndex={selectedCategory}
                                    setSelectedIndex={(category) => {
                                        handleCategoryChange(category);
                                        toggleCategories();
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Desktop Categories */}
                    <div className="hidden md:block md:col-span-3 lg:col-span-2">
                        <div className="p-0">
                            <Categories
                                selectedIndex={selectedCategory}
                                setSelectedIndex={handleCategoryChange}
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-span-1 md:col-span-9 lg:col-span-10">
                        {/* Desktop Category Title and Sorting Options */}
                        <div className="hidden md:block py-2">
                            <div className="flex items-center justify-between flex-wrap">
                                <h1 className={`font-bold text-xl md:text-2xl ${isNarrowDesktop ? 'w-full text-center' : ''}`}>
                                    {selectedCategory.name}
                                </h1>

                                {/* Desktop Sorting Options */}
                                <div className={`${isNarrowDesktop ? 'w-full' : ''}`}>
                                    <SortingOptions
                                        onSortChange={handleSortChange}
                                        currentSort={sortType}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                            {products && products.length > 0 ? products.map(product => (
                                <div key={product.id} className="w-full">
                                    <ProductItem product={product} />
                                </div>
                            )) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500 text-lg">Không có sản phẩm nào được tìm thấy</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {products && products.length > 0 && (
                            <div className='mt-6 flex justify-center'>
                                <Pagination
                                    totalPage={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;