import { useEffect, useState } from 'react';
import { FaGreaterThan, FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import academicCap from './academic-cap.png';
import { productData } from './productData';

const ProductDetail = () => {
    const { id } = useParams();
    const [selectedColor, setSelectedColor] = useState('Xanh');
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        setProduct(productData);
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const handleQuantityChange = (type) => {
        if (type === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        } else if (type === 'increase' && quantity < 20) {
            setQuantity(quantity + 1);
        }
    };

    return (
        <div className="container mx-auto px-6 md:px-8 lg:px-16 py-6">
            {/* Breadcrumb */}
            <div className="text-gray-500 mb-4 text-xs md:text-sm mt-3 flex flex-wrap items-center gap-1 md:gap-2">
                <span className='text-black font-semibold'>Sản phẩm</span>
                <FaGreaterThan className='text-gray-400 h-3' />
                <span className='text-black font-semibold'>{product.category}</span>
                <FaGreaterThan className='text-gray-400 h-3' />
                <span className='font-semibold text-gray-400'>{product.name}</span>
            </div>

            {/* Main Product Section */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Images */}
                <div className="w-full lg:w-auto">
                    <div className="aspect-square rounded-lg overflow-hidden w-full lg:w-[400px] lg:h-[400px]">
                        <img
                            src={product.mainImage}
                            alt='product'
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex gap-2 mt-2 overflow-x-auto lg:overflow-x-hidden justify-between">
                        {product.images.map((image, index) => (
                            <div key={index} className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden cursor-pointer">
                                <img
                                    src={image}
                                    alt={`${product.name} ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex-1">
                    <h1 className="text-[18px] font-medium">{product.name}</h1>

                    <div className="flex flex-wrap gap-4 mt-2 text-gray-500 text-base">
                        <div className="flex items-center gap-1">
                            <FaStar className="text-[#FF8900]" />
                            <p>4.9/5</p>
                        </div>
                        <span>Mặt hàng <span className="font-bold">{product.stock}</span></span>
                        <span>Đã bán <span className="font-bold">{product.sold}</span></span>
                    </div>

                    <div className="mt-2">
                        <h2 className="text-[32px] font-bold">
                            <span className="text-[#FF8900]">{formatPrice(product.discountPrice)}</span><span className="text-gray-400 ml-2 text-lg">đ</span>
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-500 line-through text-[14px]">
                                {formatPrice(product.price)}đ
                            </span>
                            <span className="bg-[#FF8900] text-white px-2 py-0.5 rounded text-[12px]">
                                -{product.discount}
                            </span>
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div className="mt-4">
                        <h3 className="text-base mb-2 font-semibold">Màu sắc</h3>
                        <div className="flex flex-wrap gap-2 text-[14px] text-gray-500 font-semibold">
                            {product.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-3 py-1 rounded border ${selectedColor === color
                                        ? 'border-[#FF8900] text-[#FF8900]'
                                        : 'border-gray-300'
                                        }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity and Actions Section */}
                    <div className='w-full flex justify-end mt-6 sm:mt-0'>
                        <div className='w-full lg:w-[300px]'>
                            <div className="mt-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className='text-gray-500'>Phân loại:</span>
                                    <span className='font-bold'>{selectedColor}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <span className='text-gray-500'>Số lượng:</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleQuantityChange('decrease')}
                                            className="w-8 h-8 border bg-gray-100 flex items-center justify-center rounded-md"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="text"
                                            value={quantity}
                                            readOnly
                                            className="w-12 h-8 border text-center rounded-md"
                                        />
                                        <button
                                            onClick={() => handleQuantityChange('increase')}
                                            className="w-8 h-8 border bg-gray-200 flex items-center justify-center rounded-md"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <span className="text-gray-500 flex justify-end text-[14px]">
                                    Còn {product.stock} sản phẩm
                                </span>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-3 mt-3">
                                    <div className="flex gap-2 justify-center rounded-md p-2 border border-[#FF8900] items-center">
                                        <img src={academicCap} alt="academicCap" className="h-5" />
                                        <button className="text-[#FF8900] font-medium">
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                    <button className="w-full py-2 bg-[#FF8900] text-white rounded-md font-medium">
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details */}
            <div className="mt-6 flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-[45%]">
                    <h3 className="font-medium mb-3 text-xl lg:text-2xl">Chi tiết sản phẩm</h3>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center py-1">
                            <div className="w-32 lg:w-40 text-gray-400">Danh mục:</div>
                            <div className="flex-1 px-3">{product.category}</div>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <div className="w-32 lg:w-40 text-gray-400">Thương hiệu:</div>
                            <div className="flex-1 px-3">{product.brand}</div>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <div className="w-32 lg:w-40 text-gray-400">Bảo hành:</div>
                            <div className="flex-1 px-3">{product.warranty}</div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-[55%]">
                    <h3 className="font-medium mb-3 text-xl lg:text-2xl">Mô tả sản phẩm</h3>
                    <p className="text-gray-700 leading-relaxed">
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;