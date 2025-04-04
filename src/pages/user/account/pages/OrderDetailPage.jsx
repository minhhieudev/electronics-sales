import React, { useEffect, useRef, useState } from 'react';
import {
    AiOutlineArrowLeft,
    AiOutlineCar,
    AiOutlineCheckCircle,
    AiOutlineClockCircle,
    AiOutlineClose,
    AiOutlineCloseCircle,
    AiOutlineEdit,
    AiOutlineEnvironment,
    AiOutlineHeart,
    AiOutlinePhone,
    AiOutlineSave,
    AiOutlineShoppingCart
} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchOrderDetail, updateOrderAddress } from '../../../../app/redux/slices/user/order.slice';
import MESSAGES from '../../../../common/const';
import OrderItem from '../components/OrderItem';
import OrderStatusTracker from '../components/OrderStatusTracker';
import ThankYouModal from '../components/ThankYouModal';

const DetailOrder = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const containerRef = useRef(null);

    const [orderData, setOrderData] = useState(null);
    const [isAddressEditable, setIsAddressEditable] = useState(false);
    const [editedInfo, setEditedInfo] = useState({
        fullName: '',
        phoneNumber: '',
        address: ''
    });
    const [showThankYouModal, setShowThankYouModal] = useState(false);

    const handleGoBack = () => {
        navigate('/account/orders');
    };

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrderDetail({
                orderId,
                onSuccess: (data) => {
                    setOrderData(data);
                    if (data.status === 'PENDING') {
                        setEditedInfo({
                            fullName: data.fullName,
                            phoneNumber: data.phoneNumber,
                            address: data.address
                        });
                    }
                },
            }));
        }
    }, [dispatch, orderId]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Validate phone number
    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    // Handle address update
    const handleAddressUpdate = () => {
        if (!validatePhoneNumber(editedInfo.phoneNumber)) {
            toast.error(MESSAGES.INVALID_PHONE_FORMAT);
            return;
        }

        const updateData = {
            id: orderId,
            fullName: editedInfo.fullName,
            phoneNumber: editedInfo.phoneNumber,
            address: editedInfo.address
        };

        dispatch(updateOrderAddress({
            orderData: updateData,
            onSuccess: () => {
                setOrderData(prev => ({
                    ...prev,
                    ...updateData
                }));
                setIsAddressEditable(false);
            }
        }));
    };

    // Function to update order status
    const handleOrderStatusChange = (newStatus) => {
        setOrderData(prevData => ({
            ...prevData,
            status: newStatus
        }));

        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    };

    if (!orderData) {
        return <div className="text-center py-6">Đang tải...</div>;
    }

    return (
        <div ref={containerRef} className="bg-white rounded-md mx-auto p-3 sm:p-6 sm:max-h-[600px] overflow-y-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <button
                    onClick={handleGoBack}
                    className="flex items-center gap-2 text-base py-2 px-3 rounded-md transition-all duration-300 
                        bg-green-50 text-green-600 hover:bg-green-100 hover:shadow-md w-fit"
                >
                    <AiOutlineArrowLeft className="h-5 w-5" />
                    <span className="font-medium">Trở lại</span>
                </button>
                <div className="flex gap-4 items-center justify-between">
                    <div className="flex gap-1">
                        <p>Mã đơn:</p>
                        <p className='font-bold'>{orderData.orderCode}</p>
                    </div>
                    <div className={`
                        flex items-center gap-2 text-xs sm:text-sm sm:px-4 px-3 py-2 rounded-lg shadow-md font-bold
                        ${orderData.status === 'PENDING' ? 'bg-orange-400 text-white' :
                            orderData.status === 'SHIPPING' ? 'bg-blue-500 text-white' :
                                orderData.status === 'COMPLETED' ? 'bg-green-500 text-white' :
                                    'bg-red-500 text-white'}
                    `}>
                        {orderData.status === 'PENDING' ?
                            <AiOutlineClockCircle className="h-5 w-5" /> :
                            orderData.status === 'SHIPPING' ?
                                <AiOutlineCar className="h-5 w-5" /> :
                                orderData.status === 'COMPLETED' ?
                                    <AiOutlineCheckCircle className="h-5 w-5" /> :
                                    <AiOutlineCloseCircle className="h-5 w-5" />
                        }
                        <span>
                            {orderData.status === 'PENDING' ? 'CHỜ XỬ LÝ' :
                                orderData.status === 'SHIPPING' ? 'ĐANG GIAO HÀNG' :
                                    orderData.status === 'COMPLETED' ? 'ĐÃ GIAO HÀNG' : 'ĐÃ HỦY'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Display either status tracker or canceled notification */}
            {orderData.status === 'CANCELED' ? (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <AiOutlineCloseCircle className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-lg font-medium text-red-800">Đơn hàng đã bị hủy</h3>
                            <div className="mt-2 text-red-700 sm:text-sm text-xs">
                                <p>Đơn hàng này đã bị hủy và không thể tiếp tục xử lý.</p>
                                <p className="mt-1">Nếu bạn vẫn muốn mua các sản phẩm này, vui lòng tạo đơn hàng mới.</p>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    onClick={() => navigate('/')}
                                >
                                    Tiếp tục mua sắm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <OrderStatusTracker status={orderData.status} />
            )}

            <div className='w-full sm:h-[70px] h-10 bg-gray-100 flex justify-end items-center mt-2'>
                {orderData.status === 'COMPLETED' && (
                    <div className="flex gap-1 rounded-md h-[40%] bg-[#FF8900] p-5 items-center text-white mr-5">
                        <AiOutlineHeart className='h-4 w-4' />
                        <button onClick={() => setShowThankYouModal(true)} >Đã nhận được hàng</button>
                    </div>
                )}
            </div>

            <div className='w-full mt-2'>
                <img
                    src={`${process.env.REACT_APP_CDN_URL}elfycmvzwocraxwxdrvg.png`}
                    alt="location"
                    className="object-cover h-2"
                />
            </div>

            {/* Địa chỉ nhận hàng */}
            <div className="w-full mt-4 p-4 border border-gray-100 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <div className='flex items-center gap-2'>
                        <AiOutlineEnvironment className='h-5 w-5 text-gray-500' />
                        <h2 className="text-base font-medium">Địa chỉ nhận hàng</h2>
                    </div>
                    {orderData.status === 'PENDING' && !isAddressEditable && (
                        <button
                            onClick={() => setIsAddressEditable(true)}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 
                                transition-colors duration-200 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full"
                        >
                            <AiOutlineEdit className="h-4 w-4" />
                            <span>Thay đổi</span>
                        </button>
                    )}
                </div>

                {!isAddressEditable ? (
                    <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{orderData.fullName}</span>
                                {orderData.status === 'PENDING' && (
                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                                        Có thể thay đổi
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <AiOutlinePhone className="h-4 w-4 text-gray-500" />
                                <span className="text-gray-700">{orderData.phoneNumber}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <AiOutlineEnvironment className="h-4 w-4 text-gray-500 mt-1" />
                            <div className="flex-1">
                                <p className='text-gray-700 text-sm sm:text-base leading-relaxed'>
                                    {orderData.address}
                                </p>
                                {orderData.status === 'PENDING' && (
                                    <p className="text-xs text-gray-500 mt-2 italic">
                                        * Bạn có thể thay đổi địa chỉ nhận hàng khi đơn hàng đang ở trạng thái chờ xử lý
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="font-medium text-blue-800">Cập nhật địa chỉ nhận hàng</h3>

                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Họ tên người nhận</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={editedInfo.fullName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={editedInfo.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                                <textarea
                                    name="address"
                                    value={editedInfo.address}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex gap-2 justify-end mt-4">
                            <button
                                onClick={() => setIsAddressEditable(false)}
                                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1"
                            >
                                <AiOutlineClose className="h-4 w-4" />
                                Hủy
                            </button>
                            <button
                                onClick={handleAddressUpdate}
                                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1"
                            >
                                <AiOutlineSave className="h-4 w-4" />
                                Cập nhật
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Information */}
            <div className='mt-8'>
                <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-orange-100 to-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center text-white">
                            <AiOutlineShoppingCart className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Chi tiết sản phẩm</h2>
                            <p className="text-sm text-gray-500">Đơn hàng {orderData.orderCode}</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-orange-600 bg-orange-50 py-1.5 px-3 rounded-full">
                        <span>{orderData.items?.length || 0} sản phẩm</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                    <OrderItem
                        key={orderData.orderCode}
                        order={orderData}
                        isDetailView={true}
                        onOrderStatusChange={handleOrderStatusChange}
                    />
                </div>
            </div>

            {/* Show Thank You Modal */}
            {showThankYouModal && (
                <ThankYouModal onClose={() => setShowThankYouModal(false)} />
            )}
        </div>
    );
};

export default DetailOrder;