// src/pages/user/account/components/ThankYouModal.jsx
import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const ThankYouModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <AiOutlineCheckCircle className="text-green-500 h-12 w-12 mx-auto mb-4" />
                <h2 className="text-lg font-semibold">Cảm ơn bạn!</h2>
                <p className="mt-2">Đơn hàng của bạn đã được xác nhận là đã nhận.</p>
                <div className="mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThankYouModal;