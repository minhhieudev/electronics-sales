import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import defaultProduct from './product.png';

const ProductItem = ({ product }) => {
    const { name, price, discount, sold, image } = product;

    const handleClick = () => {
        alert(`Bạn đã chọn sản phẩm: ${name}\nGiá: ${price.toLocaleString()} đ\nGiảm giá: ${discount}`);
    };

    return (
        <div className="flex flex-col h-full cursor-pointer rounded-lg hover:shadow-md transition-shadow" onClick={handleClick}>
            <div className="relative pt-[100%]"> {/* 1:1 aspect ratio */}
                <img
                    src={image || defaultProduct}
                    alt={name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
            </div>
            <div className="p-2 sm:p-3 flex flex-col flex-grow">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-[#FF8900] text-sm sm:text-base">{price.toLocaleString()}</span>
                        <span className="text-sm sm:text-base text-gray-400">đ</span>
                    </div>
                    <span className="text-[#FF4943] text-[10px] sm:text-[12px]">{discount}</span>
                </div>
                <h2 className="mt-1 sm:mt-2 text-sm sm:text-base text-black line-clamp-2 flex-grow">{name}</h2>
                <div className="flex items-center justify-between mt-1 sm:mt-2">
                    <div className="flex items-center gap-1">
                        <AiFillStar className="text-[#FF8900] h-4 sm:h-5" />
                        <span className="font-bold text-[10px] sm:text-[12px]">4.9/5</span>
                    </div>
                    <div className='flex gap-1 items-center text-gray-400 text-[10px] sm:text-[12px] font-semibold'>
                        <p>Đã bán</p>
                        <p>{sold}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
