import { AiFillStar } from 'react-icons/ai';
import React from 'react';
import product from './product.png';

const ProductItem = ({ name, price, discount, sold, image }) => {
    
    const handleClick = () => {
        alert(`Bạn đã chọn sản phẩm: ${name}\nGiá: ${price.toLocaleString()} đ\nGiảm giá: ${discount}`);
    };

    return (
        <div className="w-[232px] h-[341px]" onClick={handleClick}>
            <img
                src={product}
                alt={name}
                className="object-cover"
            />
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                    <span className="font-bold text-[#FF8900] text-base">{price.toLocaleString()}</span>
                    <span className="text-base text-gray-400">đ</span>
                </div>
                <span className="text-red-500 text-[12px] font-bold">{discount}</span>
            </div>
            <h2 className="mt-1 text-base font-semibold">{name}</h2>
            <div className="flex items-center mt-1 justify-between">
                <div className="flex items-center gap-1">
                    <AiFillStar className="text-[#FF8900] text-[12px]" />
                    <span className="font-bold text-[12px]">4.9/5</span>
                </div>
                <div className='flex gap-1 items-center mt-1 text-gray-400 text-[12px] font-semibold'>
                    <p>Đã bán</p>
                    <p>{sold}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
