import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import product from './product.png';

const ProductItem = ({ name, price, discount, sold, image }) => {
    
    const handleClick = () => {
        alert(`Bạn đã chọn sản phẩm: ${name}\nGiá: ${price.toLocaleString()} đ\nGiảm giá: ${discount}`);
    };

    return (
        <div className="flex flex-col cursor-pointer" onClick={handleClick}>
            <img
                src={image || product}
                alt={name}
                className="object-cover w-full"
            />
            <div className="flex justify-between items-center mt-2 p-1">
                <div className="flex items-center gap-1">
                    <span className="font-bold text-[#FF8900] text-base">{price.toLocaleString()}</span>
                    <span className="text-base text-gray-400">đ</span>
                </div>
                <span className="text-[#FF4943] text-[12px]">{discount}</span>
            </div>
            <h2 className="mt-1 text-base text-black p-1">{name}</h2>
            <div className="flex items-center justify-between p-1">
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
    );
};

export default ProductItem;
