const BrandDetail = ({ brand }) => {
    if (!brand) {
        return <p className="text-center text-gray-400">Không có dữ liệu</p>;
    }

    return (
        <div>
            <h2 className="text-[28px] font-bold text-gray-900 mb-5">Chi tiết danh mục</h2>

            <p className="flex items-center gap-2 mb-5">
                <strong className="text-gray-400 w-32 font-normal">Tên:</strong>
                <span>{brand.name}</span>
            </p>

            <p className="flex items-start gap-2 mb-5">
                <strong className="text-gray-400 w-32 font-normal flex-shrink-0">Mô tả:</strong>
                <span className="flex-grow">{brand.description}</span>
            </p>
        </div>
    );
};

export default BrandDetail;