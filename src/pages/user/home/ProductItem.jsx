import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ product }) => {
    const navigate = useNavigate();
    const { id, name, price, discount, quantitySold, mainImageUrl } = product;
    const defaultProduct = `${process.env.REACT_APP_CDN_URL}gztjzjluvsltezze9fan.png`

    const handleClick = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="flex flex-col h-full cursor-pointer rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300" onClick={handleClick}>
            <div className="relative pt-[100%]">
                <img
                    src={`${process.env.REACT_APP_CDN_URL}${mainImageUrl}` || defaultProduct}
                    alt={name}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow bg-white rounded-b-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-[#FF8900] text-lg">{price.toLocaleString()}</span>
                        <span className="text-lg text-gray-400">đ</span>
                    </div>
                    <span className="text-[#FF4943] text-sm font-semibold">{discount}%</span>
                </div>
                <h2 className="mt-2 text-base text-black line-clamp-2 flex-grow font-medium">{name}</h2>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                        <AiFillStar className="text-[#FF8900] h-5" />
                        <span className="font-bold text-sm">4.9/5</span>
                    </div>
                    <div className='flex gap-1 items-center text-gray-400 text-sm font-semibold'>
                        <p>Đã bán</p>
                        <p>{quantitySold}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
