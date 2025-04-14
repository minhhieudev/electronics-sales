import React from 'react';
import { AiOutlineCopy, AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import QuantityControl from './QuantityControl';

const CartItem = ({
    item,
    isSelected,
    onSelectItem,
    onQuantityChange,
    onColorChange,
    onDelete,
    copyMessage,
    onCopy,
    originalQuantity,
    setOriginalQuantity,
    isQuantityUpdated,
    setIsQuantityUpdated
}) => {
    const navigate = useNavigate();

    // Handle blur event 
    const handleQuantityBlur = (e) => {
        let newQuantity = parseInt(e.target.value, 10);

        // If the value is not a valid number, restore to the original value
        if (isNaN(newQuantity)) {
            onQuantityChange(item, originalQuantity, true);
            return;
        }

        // If the quantity is 0, display a confirmation dialog for deletion
        if (newQuantity === 0) {
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

        // If the new value is different from the original value, update and record the change
        if (newQuantity !== originalQuantity) {
            onQuantityChange(item, newQuantity);
            setIsQuantityUpdated(true);
        } else if (!isQuantityUpdated && item.quantity !== originalQuantity) {
            // If the value does not change but is different from the current value, restore
            onQuantityChange(item, originalQuantity, true);
        }
    };

    // Handle keydown event 
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    };

    // Handle click event on item to navigate to product detail page
    const handleItemClick = (e) => {
        // Check conditional
        if (
            item.isDeleted ||
            e.target.type === 'checkbox' ||
            e.target.closest('button') ||
            e.target.tagName === 'SELECT' ||
            e.target.tagName === 'INPUT' ||
            e.target.closest('.quantity-control')
        ) {
            return;
        }

        // Navigate to product detail page
        navigate(`/product/${item.productId}`);
    };

    return (
        <div
            className={`p-2 sm:p-3 cursor-pointer md:p-4 border-b last:border-b-0 ${item.isDeleted ? 'opacity-50' : ''}`}
            onClick={handleItemClick}
        >
            {/* Mobile View */}
            <div className="block sm:hidden">
                <div className='flex justify-between'>
                    <div className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            className="w-3 h-3 sm:w-4 sm:h-4 rounded accent-[#FF8900]"
                            checked={isSelected}
                            onChange={() => !item.isDeleted && onSelectItem(item.id)}
                            disabled={item.isDeleted}
                        />
                        <div className="flex items-center gap-3">
                            <img
                                src={`${process.env.REACT_APP_CDN_URL}${item.mainImageUrl}`}
                                alt={item.mainImageUrl}
                                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover flex-shrink-0"
                            />
                            <div className="min-w-0">
                                <p className="text-sm md:text-base truncate pr-2">{item.name}</p>
                                <div className="flex-1 font-medium">
                                    <div className="flex items-center text-[12px] gap-1 text-gray-700">
                                        <span className="truncate">#{item.sku}</span>
                                        <div className="relative">
                                            <AiOutlineCopy
                                                className={`h-4 cursor-pointer transition-colors duration-200 ${copyMessage.show && copyMessage.id === item.sku ? 'text-green-500' : 'text-gray-400 hover:text-gray-600'}`}
                                                onClick={(e) => onCopy(item.sku, e)}
                                                title="Copy product code"
                                            />
                                            {copyMessage.show && copyMessage.id === item.sku && (
                                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                                                    Copied!
                                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <select
                                    className="text-sm border rounded max-w-full h-[27px]"
                                    value={item.color}
                                    onChange={(e) => onColorChange(item, e.target.value)}
                                    disabled={item.isDeleted}
                                >
                                    {item?.colors?.map((color, idx) => (
                                        <option key={idx} value={color} className="truncate">
                                            {color}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col justify-around'>
                        <div className='flex justify-end'>
                            <button
                                className="text-sm text-gray-500 hover:text-red-500"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(item.id);
                                }}
                            >
                                <AiOutlineDelete className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="text-center quantity-control">
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
                                    onQuantityChange(item, item.quantity - 1);
                                }}
                                onInputChange={(e) => {
                                    e.stopPropagation();
                                    if (e.target.value === '') {
                                        onQuantityChange(item, '', true);
                                    } else {
                                        onQuantityChange(item, e.target.value, true);
                                    }
                                }}
                                onFocus={(e) => {
                                    e.stopPropagation();
                                    setOriginalQuantity(item.quantity);
                                    setIsQuantityUpdated(false);
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
                            {item.stock < 50 && (
                                <p className='text-[10px] font-semibold text-red-400'>Chỉ còn {item.stock} sản phẩm</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className={`flex ${item.isDeleted ? 'justify-between' : 'justify-end'}`}>
                    {/* Message for deleted items */}
                    {item.isDeleted && (
                        <p className="text-red-500 text-xs mt-1">Sản phẩm không còn</p>
                    )}
                    <div className="text-right text-gray-400 text-sm md:text-base">
                        {item.price.toLocaleString()} đ
                    </div>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block">
                <div className="grid grid-cols-8 md:grid-cols-12 gap-2 md:gap-3 items-center">
                    <div className="col-span-4 md:col-span-5">
                        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                            <input
                                type="checkbox"
                                className="w-3 h-3 sm:w-4 sm:h-4 rounded accent-[#FF8900]"
                                checked={isSelected}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    if (!item.isDeleted) onSelectItem(item.id);
                                }}
                                disabled={item.isDeleted}
                            />
                            <img
                                src={`${process.env.REACT_APP_CDN_URL}${item.mainImageUrl}`}
                                alt={item.mainImageUrl}
                                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover flex-shrink-0"
                            />
                            <div className="min-w-0">
                                <p className="text-xs sm:text-sm md:text-base truncate pr-2">{item.name}</p>
                                <div className="flex-1 font-medium">
                                    <div className="flex items-center text-[12px] gap-1 text-gray-500">
                                        <span className="truncate">#{item.sku}</span>
                                        <div className="relative">
                                            <AiOutlineCopy
                                                className={`h-4 cursor-pointer transition-colors duration-200 ${copyMessage.show && copyMessage.id === item.sku ? 'text-green-500' : 'text-gray-400 hover:text-gray-600'}`}
                                                onClick={(e) => onCopy(item.sku, e)}
                                                title="Copy product code"
                                            />
                                            {copyMessage.show && copyMessage.id === item.sku && (
                                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                                                    Copied!
                                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <select
                                    className="mt-2 text-sm border rounded p-1 max-w-full"
                                    value={item.color}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        onColorChange(item, e.target.value);
                                    }}
                                    disabled={item.isDeleted}
                                >
                                    {item?.colors?.map((color, idx) => (
                                        <option key={idx} value={color} className="truncate">
                                            {color}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block md:col-span-2 text-center text-gray-400 text-sm md:text-base">
                        {item.price.toLocaleString()} đ
                    </div>
                    <div className="col-span-2 text-center quantity-control">
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
                                onQuantityChange(item, item.quantity - 1);
                            }}
                            onInputChange={(e) => {
                                e.stopPropagation();
                                if (e.target.value === '') {
                                    onQuantityChange(item, '', true);
                                } else {
                                    onQuantityChange(item, e.target.value, true);
                                }
                            }}
                            onFocus={(e) => {
                                e.stopPropagation();
                                setOriginalQuantity(item.quantity);
                                setIsQuantityUpdated(false);
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
                        {item.stock < 50 && (
                            <p className='text-xs font-semibold text-red-400'>Chỉ còn {item.stock} sản phẩm</p>
                        )}
                    </div>
                    <div className="col-span-2 text-center font-bold text-xs text-gray-400 sm:text-sm md:text-base">
                        <span>{(item.price * item.quantity).toLocaleString()}</span>
                        <span className='underline ml-1'>đ</span>
                    </div>
                    <div className="hidden md:block md:col-span-1 text-center">
                        <button
                            className="text-gray-500 hover:text-red-500"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(item.id);
                            }}
                        >
                            <AiOutlineDelete className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="md:hidden mt-2 text-right">
                    <button
                        className="text-sm text-gray-500 hover:text-red-500"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item.id);
                        }}
                    >
                        <AiOutlineDelete className="w-5 h-5" />
                    </button>
                </div>

                {/* Message for deleted items */}
                {item.isDeleted && (
                    <p className="text-red-500 text-sm mt-1 text-center">Sản phẩm không còn</p>
                )}
            </div>
        </div>
    );
};

export default CartItem;