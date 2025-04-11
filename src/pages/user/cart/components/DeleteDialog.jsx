const DeleteDialog = ({ isOpen, onClose, onConfirm, itemCount }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4 z-50">
            <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm">
                <h3 className="text-lg font-semibold mb-4">
                    Xác nhận xóa sản phẩm
                </h3>
                <p className="text-gray-600 mb-6">
                    {itemCount > 1
                        ? `Bạn có chắc chắn muốn xóa ${itemCount} sản phẩm đã chọn?`
                        : 'Bạn có chắc chắn xóa sản phẩm khỏi giỏ hàng?'
                    }
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Xác nhận xóa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDialog;
