const Pagination = ({ total, totalPages, page, onPageChange }) => {
    if (totalPages < 1) return null;

    let pageNumbers = [];

    if (totalPages <= 4) {

        pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
        if (page <= 2) {
            pageNumbers = [1, 2, 3, 4];
        } else if (page >= totalPages - 1) {
            pageNumbers = [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
            pageNumbers = [page - 1, page, page + 1, page + 2];
        }
    }

    return (
        <div className="flex justify-between items-center mt-5">
            <p className="text-gray-700">{total} kết quả</p>

            <div className="flex gap-2">
                <button
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                        page === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => onPageChange(1)}
                    disabled={page === 1}
                >
                    «
                </button>

                <button
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                        page === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                >
                    ‹
                </button>

                {pageNumbers.map((p, index) => (
                    <button
                        key={index}
                        className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                            p === page ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => onPageChange(p)}
                    >
                        {p}
                    </button>
                ))}

                <button
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                        page === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                >
                    ›
                </button>

                <button
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                        page === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => onPageChange(totalPages)}
                    disabled={page === totalPages}
                >
                    »
                </button>
            </div>
        </div>
    );
};

export default Pagination;
