import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const CartFooter = ({
  selectedItems,
  selectAll,
  handleSelectAll,
  handleShowDeleteDialog,
  handleBuyNow,
  summary
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
      {/* Mobile Footer */}
      <div className="sm:hidden px-2 sm:px-4 md:px-8 lg:px-28 mx-auto py-4 md:py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="hidden sm:flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded accent-[#FF8900]"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <span className="text-sm text-gray-500">Chọn tất cả</span>
          </label>
        </div>
        <div className="flex items-center gap-4 justify-between w-full">
          <div className="flex sm:flex-row flex-col">
            {selectedItems.length > 0 && (
              <button
                onClick={() => handleShowDeleteDialog(null, true)}
                className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
              >
                <AiOutlineDelete className="w-4 h-4" />
                <span>Xóa ({selectedItems.length})</span>
              </button>
            )}
            <div className="text-sm">
              <span className="text-gray-500">Tổng cộng:</span>
              <span className="text-xl font-bold text-[#FF8900] ml-2">{summary.toLocaleString()} đ</span>
            </div>
          </div>
          <button
            className={`sm:px-6 sm:py-3 p-3 text-base text-white sm:text-lg font-medium rounded-lg transition-colors flex items-center gap-2
              ${selectedItems.length > 0 ? 'bg-[#FF8900] hover:bg-orange-500' : 'bg-gray-300 cursor-not-allowed'}`}
            onClick={handleBuyNow}
            disabled={selectedItems.length === 0}
          >
            <span>Mua hàng</span>
            {selectedItems.length > 0 && (
              <span className="text-sm">({selectedItems.length})</span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Footer */}
      <div className="px-2 sm:px-4 md:px-8 lg:px-24 mx-auto py-4 md:py-6 hidden sm:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded accent-[#FF8900]"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <span className="text-sm text-gray-500">Chọn tất cả</span>
          </label>
          {selectedItems.length > 0 && (
            <button
              onClick={() => handleShowDeleteDialog(null, true)}
              className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
            >
              <AiOutlineDelete className="w-4 h-4" />
              <span>Xóa ({selectedItems.length})</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-gray-500">Tổng cộng:</span>
            <span className="text-xl font-bold text-[#FF8900] ml-2">{summary.toLocaleString()} đ</span>
          </div>
          <button
            className={`px-6 py-3 text-white text-lg font-medium rounded-lg transition-colors flex items-center gap-2
              ${selectedItems.length > 0 ? 'bg-[#FF8900] hover:bg-orange-500' : 'bg-gray-300 cursor-not-allowed'}`}
            onClick={handleBuyNow}
            disabled={selectedItems.length === 0}
          >
            <span>Mua hàng</span>
            {selectedItems.length > 0 && (
              <span className="text-sm">({selectedItems.length})</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;