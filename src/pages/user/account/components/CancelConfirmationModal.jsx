// src/pages/user/account/components/CancelConfirmationModal.jsx
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { cancelOrder } from '../../../../app/redux/slices/user/order.slice';

const CancelConfirmationModal = ({ orderCode, orderId, onClose, onOrderStatusChange }) => {
    const dispatch = useDispatch();

    const handleCancelClick = () => {
        dispatch(cancelOrder({
            orderId,
            onSuccess: () => {
                if (onOrderStatusChange) {
                    onOrderStatusChange('CANCELED');
                }
                onClose();
            }
        }));
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 h-[100vh]"
            onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}
        >
            <div
                className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <AiOutlineClose className="h-6 w-6" />
                    </div>
                </div>
                <h3 className="text-lg font-bold text-center text-gray-900 mb-2">Xác nhận hủy đơn hàng</h3>
                <p className="text-gray-600 text-center mb-6">
                    Bạn có chắc chắn muốn hủy đơn hàng {orderCode}? Hành động này không thể hoàn tác.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex-1"
                    >
                        Quay lại
                    </button>
                    <button
                        onClick={handleCancelClick}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex-1"
                    >
                        Xác nhận hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelConfirmationModal;