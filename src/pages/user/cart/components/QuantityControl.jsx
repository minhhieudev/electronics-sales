import React from 'react';

const QuantityControl = ({
    quantity,
    onIncrease,
    onDecrease,
    onInputChange,
    onFocus,
    onBlur,
    onKeyDown
}) => {
    return (
        <div className="flex items-center justify-center gap-1 quantity-control">
            <button
                className="px-1 md:px-2 py-0.5 sm:py-1 border rounded bg-gray-100 text-xs sm:text-sm"
                onClick={onDecrease}
            >
                -
            </button>
            <input
                type="text"
                className="w-4 sm:py-1 sm:w-8 text-center border rounded text-xs sm:text-sm"
                value={quantity}
                onChange={onInputChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
            />
            <button
                className="px-1 md:px-2 py-0.5 sm:py-1 border rounded bg-gray-100 text-xs sm:text-sm"
                onClick={onIncrease}
            >
                +
            </button>
        </div>
    );
};

export default QuantityControl;