import { AiOutlineEdit, AiOutlineEnvironment } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../../app/redux/slices/user/order.slice';

const OrderSideInfo = (orderInfo) => {

    const { orderItems, summary, paymentMethod, shippingMethod } = orderInfo;
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.auth.userInfo);
    const dispatch = useDispatch();

    // Check if both phoneNumber and address are present in userInfo
    const isAddressComplete = userInfo?.phoneNumber && userInfo?.address;

    // Handle checkout action
    const handleCheckout = () => {
        // Data to create Order
        const orderData = {
            totalPrice: summary.total,
            feeDelivery: summary.shippingFee,
            address: userInfo.address,
            fullName: userInfo.fullName,
            phoneNumber: userInfo.phoneNumber,
            paymentMethod: paymentMethod,
            delivery: shippingMethod,
            items: orderItems.map(item => ({
                id: item.id,
                color: item.color,
                quantity: item.quantity,
                priceAtTime: item.price,
                totalPrice: item.price * item.quantity
            }))
        };

        // Dispatch action to create order
        dispatch(createOrder({
            orderData,
            onSuccess: (data) => {
                navigate('/checkout/success', { state: { data } });
            },
        }));
    };

    return (
        <div className="bg-white rounded-lg shadow-md">
            {/* Shipping Info Section */}
            <div className="p-4 border-b">
                <div className="mb-3 flex items-center justify-center gap-1">
                    <AiOutlineEnvironment className="h-5 w-5" />
                    <h2 className="font-semibold text-gray-500 text-lg">Ship đến</h2>
                </div>

                {isAddressComplete ? (
                    // Display information when is full
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-800">{userInfo.fullName}</span>
                            <span className="font-semibold text-gray-800">{userInfo.phoneNumber}</span>
                        </div>
                        <div>
                            <div className="text-gray-600 text-sm leading-relaxed">
                                {userInfo.address}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Display notification and button when missing information
                    <div className="text-center space-y-3">
                        <p className="text-gray-500">
                            Vui lòng cập nhật thông tin giao hàng
                        </p>
                        <button
                            onClick={() => navigate('/account')}
                            className="flex items-center gap-2 mx-auto px-4 py-2 bg-[#FF8900] text-white rounded-lg hover:bg-orange-500 transition-colors"
                        >
                            <AiOutlineEdit className="w-4 h-4" />
                            <span>Cập nhật thông tin</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Order Summary Section */}
            <div className="p-4">
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-base">
                        <span className="text-gray-600">Tạm tính</span>
                        <div className="flex items-center gap-1">
                            <span className="font-medium">{summary?.subtotal.toLocaleString() || 0}</span>
                            <span className="text-gray-500 underline">đ</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-base">
                        <span className="text-gray-600">Phí vận chuyển</span>
                        <div className="flex items-center gap-1">
                            <span className="font-medium">{summary?.shippingFee.toLocaleString() || 0}</span>
                            <span className="text-gray-500 underline">đ</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-lg">Tổng tiền</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-[#FF8900] text-2xl font-bold">
                                    {summary?.total.toLocaleString() || 0}
                                </span>
                                <span className="text-[#FF8900] underline">đ</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Button */}
                <div className="mt-6">
                    <button
                        onClick={handleCheckout}
                        disabled={!isAddressComplete}
                        className={`w-full py-4 text-white text-lg font-medium rounded-lg transition-colors ${isAddressComplete
                            ? 'bg-[#FF8900] hover:bg-orange-500'
                            : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {!isAddressComplete
                            ? 'Vui lòng cập nhật thông tin'
                            : orderItems?.length > 0
                                ? `Thanh toán (${orderItems?.length})`
                                : 'Thanh toán'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSideInfo;




