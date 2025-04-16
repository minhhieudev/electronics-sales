import React from 'react';
import { AiOutlineCopy, AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import QuantityControl from './QuantityControl';

const CartItem = ({
    item,
    isSelected,
    onSelectItem,
    onQuantityChange,
    onDelete,
    copyMessage,
    onCopy,
}) => {
    const navigate = useNavigate();

    // Handle blur event 
    const handleQuantityBlur = (e) => {
        let newQuantity = parseInt(e.target.value, 10);

        // If the value is invalid or 0, display the delete dialog
        if (isNaN(newQuantity) || newQuantity === 0) {
            onDelete(item.id);
            return;
        }

        // Ensure the quantity does not exceed the stock
        if (newQuantity > item.stock) {
            newQuantity = item.stock;
        }

        // Ensure the quantity is not less than 1
        if (newQuantity < 1) {
            newQuantity = 1;
        }

        if (item.quantity === newQuantity) return

        onQuantityChange(item, newQuantity);
    };

    // Handle keydown event 
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    };

    // Handle click event on item to navigate to product detail page
    const handleProductClick = () => {
        if (!item.isDeleted) {
            navigate(`/product/${item.productId}`);
        }
    };

    // QuantityControl component
    const renderQuantityControl = () => (
        <div className="relative">
            <QuantityControl
                quantity={item.quantity}
                onIncrease={(e) => {
                    e.stopPropagation();
                    if (item.quantity < item.stock) {
                        onQuantityChange(item, item.quantity + 1);
                    }
                }}
                onDecrease={(e) => {
                    e.stopPropagation();
                    if (item.quantity === 1) {
                        onDelete(item.id);
                    } else {
                        onQuantityChange(item, item.quantity - 1);
                    }
                }}
                onInputChange={(e) => {
                    e.stopPropagation();
                    const value = e.target.value;
                    if (value === '' || /^\d*$/.test(value)) {
                        onQuantityChange(item, value || '');
                    }
                }}
                onFocus={(e) => {
                    e.stopPropagation();
                    e.target.select();
                }}
                onKeyDown={(e) => {
                    e.stopPropagation();
                    handleKeyDown(e);
                }}
                onBlur={(e) => {
                    e.stopPropagation();
                    handleQuantityBlur(e);
                }}
            />
        </div>
    );

    const renderDeleteButton = (additionalClass = "") => (
        <button
            className={`text-gray-400 hover:text-red-500 p-1 rounded-full transition-all duration-200 hover:bg-red-50 hover:scale-110 ${additionalClass}`}
            onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
            }}
            title="Xóa sản phẩm"
        >
            <AiOutlineDelete className="w-5 h-5" />
        </button>
    );

    const renderCopyComponent = () => (
        <div className="relative">
            <AiOutlineCopy
                className={`h-4 cursor-pointer transition-all duration-200 hover:scale-110 ${copyMessage.show && copyMessage.id === item.id ? 'text-green-500' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={(e) => onCopy(item.sku, item.id, e)}
                title="Copy mã sản phẩm"
            />
            {copyMessage.show && copyMessage.id === item.id && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                    Đã sao chép!
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                </div>
            )}
        </div>
    );

    const renderColorDisplay = (additionalClass = "") => (
        <div className={`text-sm text-gray-500 ${additionalClass}`}>
            <span className="font-medium bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{item.color}</span>
        </div>
    );

    return (
        <div className={`p-3 sm:p-4 md:p-5 border-b last:border-b-0 ${item.isDeleted ? 'opacity-50' : ''} hover:bg-gray-50 transition-colors duration-200`}>
            {/* Mobile View */}
            <div className="block sm:hidden">
                <div className='flex justify-between'>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded accent-[#FF8900]"
                            checked={isSelected}
                            onChange={() => !item.isDeleted && onSelectItem(item.id)}
                            disabled={item.isDeleted}
                        />
                        <div className="flex items-center gap-3">
                            <div
                                onClick={handleProductClick}
                                className="cursor-pointer overflow-hidden rounded-md hover:shadow-md transition-shadow duration-200"
                            >
                                <img
                                    src={`${process.env.REACT_APP_CDN_URL}${item.mainImageUrl}`}
                                    alt={item.name}
                                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover flex-shrink-0 transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                            <div className="min-w-0 cursor-pointer" onClick={handleProductClick}>
                                <p className="text-sm md:text-base font-medium truncate pr-2 hover:text-[#FF8900] transition-colors">{item.name}</p>
                                <div className="flex-1 font-medium mt-1">
                                    <div className="flex items-center text-[12px] gap-1 text-gray-700">
                                        <span className="truncate">#{item.sku}</span>
                                        {renderCopyComponent()}
                                    </div>
                                </div>
                                {renderColorDisplay("mt-1")}
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col justify-around'>
                        <div className='flex justify-end'>
                            {renderDeleteButton("text-sm")}
                        </div>
                        <div className="text-center quantity-control mt-2">
                            {renderQuantityControl()}
                            {item.stock < 50 && (
                                <p className='text-[10px] font-semibold text-red-400 mt-1'>Chỉ còn {item.stock} sản phẩm</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className={`flex ${item.isDeleted ? 'justify-between' : 'justify-end'} mt-2`}>
                    {/* Message for deleted items */}
                    {item.isDeleted && (
                        <p className="text-red-500 text-xs mt-1">Sản phẩm không còn</p>
                    )}
                    <div className="text-right text-gray-400 text-sm md:text-base font-bold">
                        {item.price.toLocaleString()} đ
                    </div>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block">
                <div className="grid grid-cols-8 md:grid-cols-12 gap-3 md:gap-4 items-center">
                    <div className="col-span-4 md:col-span-5">
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded accent-[#FF8900]"
                                checked={isSelected}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    if (!item.isDeleted) onSelectItem(item.id);
                                }}
                                disabled={item.isDeleted}
                            />
                            <div
                                onClick={handleProductClick}
                                className="cursor-pointer overflow-hidden rounded-md hover:shadow-md transition-shadow duration-200"
                            >
                                <img
                                    src={`${process.env.REACT_APP_CDN_URL}${item.mainImageUrl}`}
                                    alt={item.name}
                                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover flex-shrink-0 transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                            <div className="min-w-0 cursor-pointer hover:text-[#FF8900]" onClick={handleProductClick}>
                                <p className="text-sm md:text-base font-medium truncate pr-2 transition-colors">{item.name}</p>
                                <div className="flex-1 font-medium mt-1">
                                    <div className="flex items-center text-[12px] gap-1 text-gray-500">
                                        <span className="truncate">#{item.sku}</span>
                                        {renderCopyComponent()}
                                    </div>
                                </div>
                                {renderColorDisplay("mt-2")}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block md:col-span-2 text-center text-gray-600 text-sm md:text-base font-medium">
                        {item.price.toLocaleString()} đ
                    </div>
                    <div className="col-span-2 text-center quantity-control">
                        {renderQuantityControl()}
                        {item.stock < 50 && (
                            <p className='text-xs font-semibold text-red-400 mt-1'>Chỉ còn {item.stock} sản phẩm</p>
                        )}
                    </div>
                    <div className="col-span-2 text-center font-bold text-sm text-gray-600 sm:text-base md:text-lg">
                        <span>{(item.price * item.quantity).toLocaleString()}</span>
                        <span className='underline ml-1'>đ</span>
                    </div>
                    <div className="hidden md:flex md:col-span-1 justify-center">
                        {renderDeleteButton()}
                    </div>
                </div>
                <div className="md:hidden mt-2 text-right">
                    {renderDeleteButton("text-sm")}
                </div>

                {/* Message for deleted items */}
                {item.isDeleted && (
                    <p className="text-red-500 text-sm mt-2 text-center">Sản phẩm không còn</p>
                )}
            </div>
        </div>
    );
};

export default CartItem;