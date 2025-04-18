import { useEffect, useRef, useState } from 'react';
import { FaGreaterThan, FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addProductToCart } from '../../../app/redux/slices/user/cart.slice';
import { fetchProductDetailAction } from '../../../app/redux/slices/user/product.slice';
import AddToCartAnimation from './AddToCartAnimation';
import AddToCartNotification from './AddToCartNotification';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);

    // Animation states
    const [showAnimation, setShowAnimation] = useState(false);
    const [animationConfig, setAnimationConfig] = useState({
        startElement: null,
        endElement: null,
        imageUrl: ''
    });

    // Notification state
    const [showNotification, setShowNotification] = useState(false);
    const [notificationProduct, setNotificationProduct] = useState(null);

    // References
    const addToCartBtnRef = useRef(null);
    const cartIconRef = useRef(null);
    const mainImageRef = useRef(null);

    // Fetch data
    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetailAction({
                id,
                onSuccess: (data) => {
                    setProduct(data);
                    if (data.colors && data.colors.length > 0) {
                        setSelectedColor(data.colors[0]);
                    }
                }
            }));
        }
    }, [id, dispatch]);

    // Set the cart icon reference based on screen size
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const cartIcon = document.getElementById(isMobile ? 'mobile-cart-icon' : 'desktop-cart-icon');

        if (cartIcon) {
            cartIconRef.current = cartIcon;
        }

        // Add event listener to handle screen resize
        const handleResize = () => {
            const isMobile = window.innerWidth < 768;
            const icon = document.getElementById(isMobile ? 'mobile-cart-icon' : 'desktop-cart-icon');
            if (icon) {
                cartIconRef.current = icon;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle quantity change
    const handleQuantityChange = (type) => {
        if (type === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        } else if (type === 'increase' && quantity < (product.stock || 20)) {
            setQuantity(quantity + 1);
        }
    };

    // Handle add to cart action
    const handleAddToCart = () => {
        // Check if animation is already running
        if (showAnimation) {
            return;
        }

        if (!cartIconRef.current || !mainImageRef.current) {
            return;
        }

        const imageUrl = `${process.env.REACT_APP_CDN_URL}${product.mainImageUrl}`;

        // Set animation config
        setAnimationConfig({
            startElement: mainImageRef.current,
            endElement: cartIconRef.current,
            imageUrl: imageUrl
        });

        setShowAnimation(true);

        // Create data object to add in cart
        const data = {
            id: product?.id,
            quantity,
            color: selectedColor
        };

        // Dispatch add to cart action
        dispatch(addProductToCart({
            data,
            onSuccess: () => {
                // Prepare notification data
                const notificationData = {
                    name: product.name,
                    color: selectedColor,
                    imageUrl: imageUrl
                };

                // Wait for animation to complete before showing notification
                setTimeout(() => {
                    setShowAnimation(false);
                    setNotificationProduct(notificationData);
                    setShowNotification(true);
                }, 800);
            }
        }));
    };

    // Handle buy now action
    const handleBuyNow = () => {
        // Create orderItem object for the current product
        const orderItem = {
            id: product.id,
            sku: product.sku,
            name: product.name,
            price: product.price,
            quantity: quantity,
            color: selectedColor,
            mainImage: product.mainImageUrl
        };

        // Redirect to the checkout page and pass the product data
        navigate('/checkout', { state: { orderItems: [orderItem], isFromCart: false } });
    };

    // Format price function
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    // Update handleCloseNotification
    const handleCloseNotification = () => {
        setShowNotification(false);
        setNotificationProduct(null);
    };

    if (!product) {
        return <div className="container mx-auto py-20 text-center">
            <p className="mt-4 text-gray-600">Đang tải thông tin sản phẩm...</p>
        </div>;
    }

    return (
        <div className="container mx-auto px-6 md:px-8 lg:px-16 sm:py-6 py-3 ">
            {/* Add to Cart Animation */}
            {showAnimation && (
                <AddToCartAnimation
                    startElement={animationConfig.startElement}
                    endElement={animationConfig.endElement}
                    imageUrl={animationConfig.imageUrl}
                    onAnimationComplete={() => setShowAnimation(false)}
                />
            )}

            {/* Add to Cart Notification */}
            {showNotification && (
                <AddToCartNotification
                    product={notificationProduct}
                    onClose={handleCloseNotification}
                />
            )}

            {/* Breadcrumb */}
            <div className="text-gray-500 sm:mb-4 mb-2 text-xs md:text-sm mt-2 flex flex-wrap items-center gap-1 md:gap-2">
                <span className='text-black font-semibold cursor-pointer' onClick={() => navigate('/')}>Sản phẩm</span>
                <FaGreaterThan className='text-gray-400 h-3' />
                <span className='text-black font-semibold cursor-pointer' onClick={() => navigate('/')}>{product.category}</span>
                <FaGreaterThan className='text-gray-400 h-3' />
                <span className='font-semibold text-gray-400'>{product.name}</span>
            </div>

            {/* Main Product Section */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Images */}
                <div className="w-full lg:w-auto flex justify-center">
                    <div>
                        <div
                            ref={mainImageRef}
                            className="aspect-square rounded-lg overflow-hidden w-full md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] relative"
                        >
                            <img
                                src={`${process.env.REACT_APP_CDN_URL}${product.mainImageUrl}`}
                                alt='product'
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex gap-2 mt-2 overflow-x-auto lg:overflow-x-hidden justify-between">
                            {product.images.map((image, index) => (
                                <div key={index} className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden cursor-pointer">
                                    <img
                                        src={`${process.env.REACT_APP_CDN_URL}${image}`}
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
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
                        <span>Mặt hàng: <span className="font-bold">{product.category}</span></span>
                        <span>Đã bán <span className="font-bold">{product.quantitySold}</span></span>
                    </div>

                    <div className="mt-2">
                        <h2 className="text-[32px] font-bold">
                            <span className="text-[#FF8900]">{formatPrice(product.discountPrice)}</span><span className="text-gray-400 ml-2 text-lg">VND</span>
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-500 line-through text-[14px]">
                                {formatPrice(product.price)}đ
                            </span>
                            <span className="bg-[#FF8900] text-white px-2 py-0.5 rounded text-[12px]">
                                -{product.discount}%
                            </span>
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div className="mt-4">
                        <h3 className="text-base mb-2 font-semibold">Màu sắc</h3>
                        <div className="flex flex-wrap gap-2 text-[14px] text-gray-500 font-semibold">
                            {product.colors.length > 0 ? (
                                product.colors.map((color) => (
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
                                ))
                            ) : (
                                <span className="text-gray-500">Không có</span>
                            )}
                        </div>
                    </div>

                    {/* Quantity and Actions Section */}
                    <div className='w-full flex justify-end mt-6 sm:mt-0'>
                        <div className='w-full lg:w-[300px]'>
                            <div className="mt-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className='text-gray-500'>Phân loại:</span>
                                    <span className='font-bold'>{selectedColor || 'Không'}</span>
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
                                            className="w-12 h-8 border text-center rounded-md"
                                            onChange={(e) => {
                                                const value = Math.max(1, Math.min(product.stock || 20, parseInt(e.target.value) || 1));
                                                setQuantity(value);
                                            }}
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
                                    <div
                                        ref={addToCartBtnRef}
                                        className="flex gap-2 justify-center rounded-md p-2 border border-[#FF8900] items-center hover:bg-orange-50 transition-colors cursor-pointer active:bg-orange-100"
                                        onClick={handleAddToCart}
                                    >
                                        <img src={`${process.env.REACT_APP_CDN_URL}ysjihfviu9geiom0kmpb.png`} alt="academicCap" className="h-5" />
                                        <button className="text-[#FF8900] font-medium">
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleBuyNow}
                                        className="w-full py-2 bg-[#FF8900] text-white rounded-md font-medium hover:bg-[#e07800] transition-colors active:bg-[#cc6c00]"
                                    >
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