import React, { useEffect, useState } from 'react';
import {
    AiOutlineArrowLeft,
    AiOutlineAudit,
    AiOutlineCar,
    AiOutlineCheckCircle,
    AiOutlineClose,
    AiOutlineEdit,
    AiOutlineEnvironment,
    AiOutlineHeart,
    AiOutlinePhone,
    AiOutlineSave,
    AiOutlineShoppingCart
} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { fetchOrderDetail } from '../../../../app/redux/slices/user/order.slice';
import OrderItem from '../components/OrderItem';

const DetailOrder = ({ orderId, handleGoBack }) => {

    const dispatch = useDispatch();

    const [orderData, setOrderData] = useState(null);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [editedAddress, setEditedAddress] = useState({
        fullName: '',
        phoneNumber: '',
        address: ''
    });

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrderDetail({
                orderId,
                onSuccess: (data) => {
                    setOrderData(data);
                    setEditedAddress({
                        fullName: data.fullName,
                        phoneNumber: data.phoneNumber,
                        address: data.address
                    });
                },
            }));
        }
    }, [dispatch, orderId]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle address update
    const handleAddressUpdate = () => {
        console.log('Updated delivery address:', editedAddress);
        // Here you would call your API to update the address
        // For now, just update the local state
        setOrderData(prev => ({
            ...prev,
            ...editedAddress
        }));
        setIsEditingAddress(false);
    };

    if (!orderData) {
        return <div className="text-center py-6">Đang tải...</div>;
    }

    return (
        <div className="bg-white rounded-md mx-auto p-3 sm:p-6 sm:max-h-[600px] overflow-y-auto">
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
                        <p>Mã đơn hàng:</p>
                        <p className='font-bold'>{orderData.orderCode}</p>
                    </div>
                    <button className="text-[#FF8900] text-xs sm:text-sm border border-[#FF8900] rounded-full px-3 py-2 font-semibold">
                        {orderData.status === 'PENDING' ? 'CHỜ XỬ LÝ' :
                            orderData.status === 'SHIPPING' ? 'ĐANG GIAO HÀNG' :
                                orderData.status === 'COMPLETED' ? 'ĐÃ GIAO' : 'ĐÃ HỦY'}
                    </button>
                </div>
            </div>

            {/* Tình trạng đơn hàng */}
            <div className="mt-4">
                <div className="grid grid-cols-4 gap-4 text-center">
                    {(() => {
                        let currentStep = 0;

                        if (orderData.status === 'PENDING') currentStep = 1;
                        else if (orderData.status === 'SHIPPING') currentStep = 2;
                        else if (orderData.status === 'COMPLETED') currentStep = 3;

                        const steps = [
                            {
                                icon: AiOutlineShoppingCart,
                                label: "Đơn hàng đã đặt",
                                time: "11:24 18/10/2023",
                                status: 0
                            },
                            {
                                icon: AiOutlineAudit,
                                label: "Chờ xác nhận",
                                time: "11:24 18/10/2023",
                                status: 1
                            },
                            {
                                icon: AiOutlineCar,
                                label: "Đang giao tới bạn",
                                time: "11:24 18/10/2023",
                                status: 2
                            },
                            {
                                icon: AiOutlineCheckCircle,
                                label: "Giao hàng thành công",
                                time: "11:24 18/10/2023",
                                status: 3
                            },
                        ];

                        return steps.map((step, index) => {
                            // Determine step state
                            const isPassed = step.status < currentStep;
                            const isCurrent = step.status === currentStep;
                            const isFuture = step.status > currentStep;

                            return (
                                <div key={index} className="flex flex-col items-center relative">
                                    {/* Connecting line to previous step */}
                                    {index > 0 && (
                                        <div className="absolute" style={{ top: '13px', right: '50%', width: '100%', height: '6px' }}>
                                            <div
                                                className={`w-full h-full rounded-full
                                                    ${steps[index - 1].status < currentStep - 1 || orderData.status === 'COMPLETED' ? 'bg-green-500' :
                                                        step.status === currentStep && steps[index - 1].status === currentStep - 1 ? 'bg-gray-200 overflow-hidden' :
                                                            'bg-gray-300'}`}
                                            >
                                                {step.status === currentStep && steps[index - 1].status === currentStep - 1 && orderData.status !== 'COMPLETED' && (
                                                    <div className="relative w-full h-full">
                                                        <div className="absolute h-full w-3 bg-green-600 rounded-full animate-[loadingDot1_2.5s_ease-in-out_infinite]"></div>
                                                        <div className="absolute h-full w-5 bg-green-500 rounded-full animate-[loadingDot2_2.5s_ease-in-out_infinite_0.2s]"></div>
                                                        <div className="absolute h-full w-3 bg-green-400 rounded-full animate-[loadingDot3_2.5s_ease-in-out_infinite_0.4s]"></div>
                                                        <div className="absolute h-full w-4 bg-green-500 rounded-full animate-[loadingDot4_2.5s_ease-in-out_infinite_0.6s]"></div>
                                                        <div className="absolute h-full w-2 bg-green-600 rounded-full animate-[loadingDot5_2.5s_ease-in-out_infinite_0.8s]"></div>
                                                        <div className="absolute h-full w-3 bg-green-400 rounded-full animate-[loadingDot1_2.5s_ease-in-out_infinite_1s]"></div>
                                                        <div className="absolute h-full w-2 bg-green-500 rounded-full animate-[loadingDot2_2.5s_ease-in-out_infinite_1.2s]"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {/* Step icon */}
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2
                                            ${isPassed ? 'bg-green-500' :
                                                isCurrent ? 'bg-white border-green-500 shadow-lg animate-[bounce_2s_ease-in-out_infinite] ring-2 ring-green-500 ring-opacity-50' :
                                                    'bg-gray-300'}`}
                                    >
                                        <step.icon
                                            className={`text-lg ${isPassed ? 'text-white' :
                                                isCurrent ? 'text-green-500 animate-[spin_3s_linear_infinite]' :
                                                    'text-gray-500'}`}
                                        />
                                    </div>

                                    {/* Step label */}
                                    <span className={`text-base font-bold ${isPassed || isCurrent ? '' : 'text-gray-500'}`}>
                                        {step.label}
                                    </span>

                                    {/* Step time */}
                                    <span className="text-gray-500 text-sm">{step.time}</span>
                                </div>
                            );
                        });
                    })()}
                </div>
            </div>

            <div className='w-full sm:h-[70px] h-10 bg-gray-100 flex justify-end items-center mt-2'>
                {orderData.status === 'SHIPPING' && (
                    <div className="flex gap-1 rounded-md h-[40%] bg-[#FF8900] p-5 items-center text-white mr-5">
                        <AiOutlineHeart className='h-4 w-4' />
                        <button className=''>Đã nhận được hàng</button>
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
                    {orderData.status === 'PENDING' && !isEditingAddress && (
                        <button
                            onClick={() => setIsEditingAddress(true)}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 
                                transition-colors duration-200 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full"
                        >
                            <AiOutlineEdit className="h-4 w-4" />
                            <span>Thay đổi</span>
                        </button>
                    )}
                </div>

                {!isEditingAddress ? (
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
                                    value={editedAddress.fullName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={editedAddress.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                                <textarea
                                    name="address"
                                    value={editedAddress.address}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex gap-2 justify-end mt-4">
                            <button
                                onClick={() => setIsEditingAddress(false)}
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

            {/* Thông tin sản phẩm */}
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
                        isShow={true}
                        isDetailView={false}
                    //onOrderSelect={handleItemClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailOrder;