import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../../app/redux/slices/admin/product.slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const data = await dispatch(fetchProductById(id)).unwrap();

                setProduct(data);
            } catch (error) {
                toast.error(error)
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [id, dispatch]);

    if (loading) return <div>Đang tải dữ liệu...</div>;
    if (!product) return <div>Không tìm thấy sản phẩm</div>;
    return (
        <div className="bg-gray-100 min-h-screen ml-4">
            <h2 className="text-2xl text-indigo-600 font-bold mb-4">Sản phẩm</h2>

            <form className="max-w-6xl bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">
                <div className="flex gap-6">
                    <div className="w-3/4">
                        <h3 className="text-lg font-semibold mb-4">Xem chi tiết sản phẩm</h3>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Mã sản phẩm</label>
                                <input type="text" className="bg-gray-100 p-2 rounded-lg w-full" value={product.sku} readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Tên sản phẩm</label>
                                <input type="text" className="bg-gray-100 p-2 rounded-lg w-full" value={product.name} readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Số lượng</label>
                                <input type="number" className="bg-gray-100 p-2 rounded-lg w-full" value={product.stock} readOnly />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium">Loại sản phẩm</label>
                                <input type="text" className="bg-gray-100 p-2 rounded-lg w-full" value={product.category} readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Thương hiệu</label>
                                <input type="text" className="bg-gray-100 p-2 rounded-lg w-full" value={product.brand} readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Màu sắc</label>
                                <input type="text" className="bg-gray-100 p-2 rounded-lg w-full" value={product.colors ? product.colors.join(", ") : ""} readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Thời gian bảo hành</label>
                                <input type="text" className="bg-gray-100 p-2 rounded-lg w-full" value={product.warranty} readOnly />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium">Giá</label>
                                <input type="text" className="bg-gray-100 p-2 rounded-lg w-full" value={new Intl.NumberFormat("vi-VN").format(product.price)} readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Phần trăm giảm giá</label>
                                <input type="number" className="bg-gray-100 p-2 rounded-lg w-full" value={product.discount} readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Giá giảm</label>
                                <input type="text" className="bg-gray-300 p-2 rounded-lg w-full" value={new Intl.NumberFormat("vi-VN").format(product.discountPrice)} readOnly />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">Mô tả</label>
                            <textarea className="bg-gray-100 p-2 rounded-lg w-full min-h-[150px]" rows="4" value={product.description} readOnly />
                        </div>

                        {/* Hiển thị danh sách ảnh */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium">Ảnh</label>
                            <div className="grid grid-cols-5 gap-4 mt-2">
                                {product.images?.map((image, index) => (
                                    <img key={index} src={`${process.env.REACT_APP_CDN_URL}${image}`} alt={`Ảnh ${index + 1}`} className="h-20 w-40 object-fill bg-gray-100 rounded-lg" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-1/4">
                        <label className="block text-sm font-medium mb-2 mt-4">Ảnh đại diện</label>
                        <div className="relative pt-[100%]">
                            <img
                                src={product.mainImageUrl ? `${process.env.REACT_APP_CDN_URL}${product.mainImageUrl}` : "default_avatar.png"}
                                alt="Ảnh đại diện"
                                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        onClick={() => navigate(`/admin/product`)}
                    >
                        Quay lại
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductDetail;
