import React, { useState } from 'react';
import { CONST } from '../../../common/const';
import Pagination from "../../../components/user/pagination/Pagination";
import Sidebar from './Categories';
import data from './data';
import ProductItem from './ProductItem';
import SortingOptions from './SortingOptions';

const ITEMS_PER_PAGE = CONST.ITEMS_PER_PAGE;

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedData, setSortedData] = useState(data);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    // Helper function to sort data by price
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
        } else {
            setSortedData(data);
            console.log('Will handle sorting with API later:', sortType);
        }
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="bg-gradient-to-r from-[#FFFAFA] to-[#f3faf3] min-h-screen">
            <div className='px-4 md:px-16 mx-auto space-y-1 mt-10'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-20'>
                    <div className="col-span-1">
                        <Sidebar />
                    </div>
                    <div className="col-span-3">
                        <SortingOptions onSortChange={handleSortChange} />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 w-full">
                            {currentItems.map(product => (
                                <div key={product.id}>
                                    <ProductItem
                                        name={product.name}
                                        price={product.price}
                                        discount={product.discount}
                                        rating={product.rating}
                                        sold={product.sold}
                                        image={product.image}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className='mt-5 flex justify-center'>
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