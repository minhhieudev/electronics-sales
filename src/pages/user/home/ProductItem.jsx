import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import defaultProduct from './product.png';

const ProductItem = ({ product }) => {
    const { name, price, discount, sold, image } = product;

    const handleClick = () => {
        alert(`Bạn đã chọn sản phẩm: ${name}\nGiá: ${price.toLocaleString()} đ\nGiảm giá: ${discount}`);
    };

    return (
        <div className="flex flex-col cursor-pointer rounded-lg overflow-hidden" onClick={handleClick}>
            <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                    src={image || defaultProduct}
                    alt={name}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="p-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-[#FF8900] text-base">{price.toLocaleString()}</span>
                        <span className="text-base text-gray-400">đ</span>
                    </div>
                    <span className="text-[#FF4943] text-[12px]">{discount}</span>
                </div>
                <h2 className="mt-2 text-base text-black line-clamp-2">{name}</h2>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                        <AiFillStar className="text-[#FF8900] h-5" />
                        <span className="font-bold text-[12px]">4.9/5</span>
                    </div>
                    <div className='flex gap-1 items-center text-gray-400 text-[12px] font-semibold'>
                        <p>Đã bán</p>
                        <p>{sold}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
