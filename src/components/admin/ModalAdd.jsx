const ModalAdd = ({ isOpen, onClose, title, children, onSave }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-[500px] h-auto shadow-2xl relative">
                <h2 className="text-[24px] font-bold text-gray-800 mb-2">{title}</h2>
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
                <div className="flex justify-end mt-6 gap-3">
                    <button
                        className="px-4 py-1 text-sm font-semibold border-gray-400 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300"
                        onClick={onClose}
                    >
                        Hủy
                    </button>
                    <button
                        className="px-6 py-2 text-sm font-semibold rounded-lg bg-indigo-500 text-white hover:bg-indigo-700 transition duration-300"
                        onClick={onSave}
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAdd;
