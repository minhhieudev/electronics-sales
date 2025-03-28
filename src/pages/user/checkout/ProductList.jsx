import React, { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';

const ProductList = ({ items = [] }) => {
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopy = (sku) => {
        navigator.clipboard.writeText(sku).then(() => {
            setCopySuccess(`Đã sao chép: ${sku}`);
            setTimeout(() => {
                setCopySuccess('');
            }, 2000);
        });
    };

    const renderProductItem = (item, isMobile = false) => {
        return isMobile ? (
            // Mobile view item rendering
            <div className="p-4">
                <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img
                            src={item.mainImage}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="text-sm text-[#FF8900]  mb-1">
                            #{item.sku}
                        </div>
                        <h4 className="font-medium mb-1 line-clamp-2">
                            {item.name}
                        </h4>
                        <div className="text-sm text-gray-500">
                            Phân loại: {item.color}
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                            <div className="text-gray-600">
                                SL: {item.quantity}
                            </div>
                            <div className="font-medium">
                                {item.price.toLocaleString()} đ
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            // Desktop view item rendering  
            <div className="grid grid-cols-12 gap-4 border-b p-2">
                <div className="col-span-5 flex gap-3 items-center">
                    <div className="w-16 h-16 rounded-md overflow-hidden">
                        <img
                            src={item.mainImage}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 font-medium">
                        <div className="flex items-center gap-1 text-[#FF8900] ">
                            <span>#{item.sku}</span>
                            <button className="text-gray-400" onClick={() => handleCopy(item.sku)}>
                                <FaRegCopy className="w-3 h-3" />
                            </button>
                        </div>
                        <h3 className="mb-1">{item.name}</h3>
                    </div>
                </div>
                <div className="col-span-2 flex items-center justify-center">{item.color}</div>
                <div className="col-span-2 flex items-center justify-center gap-1">
                    {item.price.toLocaleString()} <span className="text-gray-500 underline">đ</span>
                </div>
                <div className="col-span-1 flex items-center justify-center">{item.quantity}</div>
                <div className="col-span-2 flex items-center justify-end gap-1">
                    {(item.price * item.quantity).toLocaleString()} <span className="text-gray-500 underline">đ</span>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-md">
            {/* Copy notification */}
            {copySuccess && (
                <div className="fixed bottom-4 right-4 bg-gray-700 text-white p-2 rounded-md shadow-md">
                    {copySuccess}
                </div>
            )}

            {/* Desktop View */}
            <div className="hidden md:block">
                <div className="p-4">
                    <div className="max-h-[280px] overflow-y-auto">
                        <div className="grid grid-cols-12 gap-4 sticky top-0 bg-white border-b">
                            <div className="col-span-5 font-bold">Sản phẩm ({items.length})</div>
                            <div className="col-span-2 text-gray-500 text-center">Phân loại</div>
                            <div className="col-span-2 text-gray-500 text-center">Đơn giá</div>
                            <div className="col-span-1 text-gray-500 text-center">SL</div>
                            <div className="col-span-2 text-gray-500 text-right">Thành tiền</div>
                        </div>
                        {items.map(item => renderProductItem(item, false))}
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
                <h3 className="p-4 font-semibold border-b">
                    Sản phẩm ({items.length})
                </h3>
                <div className="divide-y max-h-[50vh] overflow-y-auto">
                    {items.map(item => renderProductItem(item, true))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;