import React, { useState } from 'react';
import { AiOutlineCar, AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineClose, AiOutlineCloseCircle, AiOutlineCopy, AiOutlineDollar, AiOutlineDown, AiOutlineRight, AiOutlineTag, AiOutlineUp } from 'react-icons/ai';
import { paymentMethods, shippingMethods } from '../data/checkoutData';
import CancelConfirmationModal from '../components/CancelConfirmationModal';

const OrderItem = ({ order, isShow = false, onOrderSelect, isDetailView = false }) => {
    const [showAll, setShowAll] = useState(false);
    const [copyMessage, setCopyMessage] = useState({ show: false, id: null });
    const [showCancelModal, setShowCancelModal] = useState(false);
    const displayedProducts = showAll ? order.items : order.items?.slice(0, 3);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + ' ';
    };

    // Find the corresponding payment method
    const paymentMethod = paymentMethods.find(
        method => method.id === order.paymentMethod
    );

    // Find the corresponding shipping method
    const shippingMethod = shippingMethods.find(
        method => method.id === order.delivery
    );

    const handleCopy = (sku, e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(sku);

        // Hiển thị thông báo cho SKU được copy
        setCopyMessage({ show: true, id: sku });

        // Tự động ẩn thông báo sau 2 giây
        setTimeout(() => {
            setCopyMessage({ show: false, id: null });
        }, 2000);
    };

    // Hàm hiển thị trạng thái đơn hàng
    const renderOrderStatus = () => {
        const status = order.status || 'PENDING';

        // Cấu hình hiển thị cho từng trạng thái
        const statusConfig = {
            'PENDING': {
                label: 'CHỜ XỬ LÝ',
                color: 'text-orange-500 border-orange-500 bg-orange-50',
                bgHover: 'hover:bg-orange-100',
                icon: <AiOutlineClockCircle className="h-4 w-4 mr-1" />
            },
            'SHIPPING': {
                label: 'ĐANG GIAO HÀNG',
                color: 'text-blue-500 border-blue-500 bg-blue-50',
                bgHover: 'hover:bg-blue-100',
                icon: <AiOutlineCar className="h-4 w-4 mr-1" />
            },
            'COMPLETED': {
                label: 'ĐÃ GIAO HÀNG',
                color: 'text-green-500 border-green-500 bg-green-50',
                bgHover: 'hover:bg-green-100',
                icon: <AiOutlineCheckCircle className="h-4 w-4 mr-1" />
            },
            'CANCELED': {
                label: 'ĐÃ HỦY',
                color: 'text-red-500 border-red-500 bg-red-50',
                bgHover: 'hover:bg-red-100',
                icon: <AiOutlineCloseCircle className="h-4 w-4 mr-1" />
            }
        };

        // Lấy cấu hình cho trạng thái hiện tại hoặc mặc định
        const currentStatus = statusConfig[status] || statusConfig['PENDING'];

        return (
            <div className={`flex items-center sm:text-sm text-[11px] border rounded-full sm:px-4 py-1.5 px-2 font-semibold ${currentStatus.color} ${currentStatus.bgHover} transition-colors shadow-sm`}>
                {currentStatus.icon}
                <span>{currentStatus.label}</span>
            </div>
        );
    };

    // Add function to handle order cancellation
    const handleCancelOrder = () => {
        // Here you would call your API to cancel the order
        console.log('Cancelling order', order.orderCode);
        // Example API call:
        // orderService.cancelOrder(order.orderCode)
        //   .then(() => {
        //     toast.success('Đơn hàng đã được hủy thành công');
        //     // Optionally refresh order list or update UI
        //   })
        //   .catch(error => {
        //     toast.error('Không thể hủy đơn hàng. Vui lòng thử lại sau.');
        //     console.error(error);
        //   });

        // Close the modal after processing
        setShowCancelModal(false);
    };

    return (
        <div>
            <div className="p-4 space-y-4 cursor-pointer" onClick={isDetailView ? () => onOrderSelect(order.orderCode) : undefined}>
                {/* Header */}
                {isShow ? (
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <AiOutlineTag className="h-5 w-5 text-orange-500" />
                            </div>
                            <h3 className="font-bold text-gray-800">Sản phẩm trong đơn hàng</h3>
                        </div>
                        <div className="text-sm text-gray-500">
                            {order.items?.length || 0} sản phẩm
                        </div>
                    </div>
                ) : (
                    <div className="flex sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <AiOutlineTag className="h-4 w-4 text-blue-500" />
                            </div>
                            <div className="inline-flex items-center gap-2 border border-gray-200 rounded-md p-1 sm:p-2 bg-gray-50">
                                <span className="font-bold text-sm">{order.orderCode}</span>
                                <AiOutlineRight className="h-4 text-gray-400" />
                            </div>
                        </div>
                        {renderOrderStatus()}
                    </div>
                )}

                {/* Products */}
                <div className="divide-y divide-gray-100">
                    {displayedProducts?.map((product) => (
                        <div key={product.id} className="py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                            <div className="flex gap-4">
                                {/* Image */}
                                <div className="w-20 h-20 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200 group-hover:border-orange-300 transition-all shadow-sm">
                                    <img
                                        src={product.mainImageUrl ? `${process.env.REACT_APP_CDN_URL}${product.mainImageUrl}` : `${process.env.REACT_APP_CDN_URL}xgpotizuns7tjuumljcr.png`}
                                        alt={product.name}
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 min-w-0 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1 relative">
                                            <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-100 rounded-full">
                                                <p className="text-orange-700 text-xs font-bold">{product.sku}</p>
                                            </div>
                                            <div className="relative">
                                                <AiOutlineCopy
                                                    className={`h-4 cursor-pointer transition-colors duration-200 ${copyMessage.show && copyMessage.id === product.sku ? 'text-green-500' : 'text-gray-400 hover:text-gray-600'}`}
                                                    onClick={(e) => handleCopy(product.sku, e)}
                                                    title="Sao chép mã sản phẩm"
                                                />
                                                {copyMessage.show && copyMessage.id === product.sku && (
                                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                                                        Đã copy!
                                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <h3 className="text-base font-medium text-gray-800 group-hover:text-orange-600 transition-colors truncate">{product.name}</h3>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-1">
                                        {product.color && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-600">{product.color}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-1 text-gray-500">
                                            <span className="font-semibold text-gray-700">x{product.quantity}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex flex-col items-end justify-center">
                                    <div className="flex items-center gap-1">
                                        <AiOutlineDollar className="text-orange-500" />
                                        <div className="text-right">
                                            <span className="font-bold text-gray-800">{formatPrice(product.priceAtTime || product.price)}</span>
                                            <span className="text-gray-500">đ</span>
                                        </div>
                                    </div>
                                    {product.discount > 0 && (
                                        <div className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}đ</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More Button */}
                {order.items?.length > 3 && (
                    <div className="bg-gray-50 py-3 text-center rounded-b-lg">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowAll(!showAll);
                            }}
                            className="text-sm font-medium flex items-center justify-center mx-auto hover:text-orange-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 transition-all hover:shadow"
                        >
                            {showAll ? 'Thu gọn' : 'Xem thêm'} {order.items.length - 3} sản phẩm
                            {showAll ? <AiOutlineUp className="ml-2" /> : <AiOutlineDown className="ml-2" />}
                        </button>
                    </div>
                )}

                {/* Footer */}
                <div className="pt-6 sm:pt-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        {/* Payment & Shipping Info */}
                        <div className="w-full sm:w-auto flex flex-wrap items-center gap-4 border border-dashed border-orange-300 rounded-lg p-3 bg-orange-50">
                            {/* Payment Method */}
                            {paymentMethod && (
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-white p-1 shadow-sm flex items-center justify-center">
                                        <img src={`${process.env.REACT_APP_CDN_URL}${paymentMethod.icon}`} alt={paymentMethod.name} className="w-6 h-6 object-contain" />
                                    </div>
                                    <span className="text-sm font-medium">{paymentMethod.name}</span>
                                </div>
                            )}

                            <div className="hidden sm:block h-8 w-px bg-orange-300" />

                            {/* Shipping Method */}
                            {shippingMethod && (
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-white p-1 shadow-sm flex items-center justify-center">
                                        <img src={`${process.env.REACT_APP_CDN_URL}${shippingMethod.logo}`} alt={shippingMethod.name} className="w-6 h-6 object-contain" />
                                    </div>
                                    <span className="text-sm font-medium">{shippingMethod.name}</span>
                                </div>
                            )}
                        </div>

                        {/* Total Price */}
                        <div className="flex flex-col items-end self-end sm:self-auto">
                            <span className="text-sm text-gray-500">Thành tiền:</span>
                            <div className="text-orange-500 flex items-center gap-1">
                                <span className="text-xl font-bold">{formatPrice(order.totalPrice)}</span>
                                <span>đ</span>
                            </div>
                        </div>
                    </div>

                    {/* Cancel Button - Only show for PENDING orders */}
                    {!isShow && order.status === 'PENDING' && (
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowCancelModal(true); // Show modal instead of window.confirm
                                }}
                                className="group relative overflow-hidden rounded-lg bg-white px-4 py-2 text-red-500 shadow-sm transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg border border-red-500"
                            >
                                <span className="relative z-10 flex items-center gap-2 font-semibold">
                                    <AiOutlineClose className="h-4 w-4" />
                                    Hủy đơn hàng
                                </span>
                                <span className="absolute bottom-0 left-0 h-0 w-full bg-red-100 transition-all duration-300 group-hover:h-full"></span>
                            </button>
                        </div>
                    )}
                </div>


            </div>
            {/* Cancel Confirmation Modal */}
            {showCancelModal && (
                <CancelConfirmationModal
                    orderCode={order.orderCode}
                    onCancel={handleCancelOrder}
                    onClose={() => setShowCancelModal(false)}
                />
            )}
        </div>
    );
};

export default OrderItem;