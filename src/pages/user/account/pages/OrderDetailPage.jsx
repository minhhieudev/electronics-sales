import React, { useEffect, useRef, useState } from 'react';
import {
    AiOutlineArrowLeft,
    AiOutlineCar,
    AiOutlineCheckCircle,
    AiOutlineClockCircle,
    AiOutlineCloseCircle,
    AiOutlineCopy,
    AiOutlineHeart,
    AiOutlineShoppingCart
} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchOrderDetail, updateOrderAddress } from '../../../../app/redux/slices/user/order.slice';
import MESSAGES from '../../../../common/const';
import OrderItem from '../components/OrderItem';
import OrderStatusTracker from '../components/OrderStatusTracker';
import ShippingAddress from '../components/ShippingAddress';
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
    const [copyMessage, setCopyMessage] = useState({ show: false, id: null });

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

    // Function to get order status class and text
    const getOrderStatus = (status) => {
        switch (status) {
            case 'PENDING':
                return { className: 'bg-orange-400 text-white', text: 'CHỜ XỬ LÝ', icon: <AiOutlineClockCircle className="h-5 w-5" /> };
            case 'SHIPPING':
                return { className: 'bg-blue-500 text-white', text: 'ĐANG GIAO HÀNG', icon: <AiOutlineCar className="h-5 w-5" /> };
            case 'COMPLETED':
                return { className: 'bg-green-500 text-white', text: 'ĐÃ GIAO HÀNG', icon: <AiOutlineCheckCircle className="h-5 w-5" /> };
            case 'CANCELED':
                return { className: 'bg-red-500 text-white', text: 'ĐÃ HỦY', icon: <AiOutlineCloseCircle className="h-5 w-5" /> };
            default:
                return { className: '', text: '', icon: null };
        }
    };

    // Check if orderData is available before destructuring
    const { className, text, icon } = orderData ? getOrderStatus(orderData.status) : { className: '', text: '', icon: null };

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

    const handleCopy = (orderCode, e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(orderCode);
        setCopyMessage({ show: true, id: orderCode });

        setTimeout(() => {
            setCopyMessage({ show: false, id: null });
        }, 2000);
    };

    if (!orderData) {
        return <div className="text-center py-6">Đang tải...</div>;
    }

    return (
        <div ref={containerRef} className="bg-white rounded-md mx-auto p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className='flex justify-between items-center'>
                    <button
                        onClick={handleGoBack}
                        className="flex items-center gap-2 text-base py-2 px-3 rounded-md transition-all duration-300 
                        bg-green-50 text-green-600 hover:bg-green-100 hover:shadow-md w-fit"
                    >
                        <AiOutlineArrowLeft className="h-5 w-5" />
                        <span className="font-medium">Trở lại</span>
                    </button>
                    {/* Mobile */}
                    <div className={`flex sm:hidden items-center gap-2 text-xs sm:text-sm sm:px-4 px-3 py-2 rounded-lg shadow-md font-bold ${className}`}>
                        {icon}
                        <span>{text}</span>
                    </div>
                </div>
                <div className="flex gap-4 items-center justify-between mt-2 sm:mt-0">
                    <div className="flex items-center gap-1">
                        <div className="flex sm:gap-2 gap-3 items-center">
                            <p className='text-sm'>Mã đơn hàng:</p>
                            <p className='font-bold'>{orderData.orderCode}</p>
                        </div>
                        <div className="relative">
                            <AiOutlineCopy
                                className={`h-4 cursor-pointer transition-colors duration-200 ${copyMessage.show && copyMessage.id === orderData.orderCode ? 'text-green-500' : 'text-gray-400 hover:text-gray-600'}`}
                                onClick={(e) => handleCopy(orderData.orderCode, e)}
                                title="Sao chép mã đơn hàng"
                            />
                            {copyMessage.show && copyMessage.id === orderData.orderCode && (
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                                    Đã copy!
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`hidden sm:flex items-center gap-2 text-xs sm:text-sm sm:px-4 px-3 py-2 rounded-lg shadow-md font-bold ${className}`}>
                        {icon}
                        <span>{text}</span>
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

            <ShippingAddress
                orderData={orderData}
                isAddressEditable={isAddressEditable}
                setIsAddressEditable={setIsAddressEditable}
                editedInfo={editedInfo}
                handleInputChange={handleInputChange}
                handleAddressUpdate={handleAddressUpdate}
            />

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