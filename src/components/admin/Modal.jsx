import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[550px] relative">
                <button 
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl" 
                    onClick={onClose}
                >
                    &times;
                </button>
                <br />
                {children}
                <hr />
                <div className="flex justify-end mt-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-200"
                        onClick={onClose}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
