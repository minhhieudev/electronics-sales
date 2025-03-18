import React from "react";

const ModalDelete = ({ isOpen, onClose, onConfirm, children, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[450px] relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl"
          onClick={onClose}
        >
          &times;
        </button>

        {children}
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            onClick={onConfirm}
          >
            {loading ? "Đang xóa..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
