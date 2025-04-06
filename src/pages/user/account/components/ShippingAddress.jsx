// src/pages/user/account/components/ShippingAddress.jsx
import React from 'react';
import { AiOutlineEnvironment, AiOutlineEdit, AiOutlineClose, AiOutlineSave, AiOutlinePhone } from 'react-icons/ai';

const ShippingAddress = ({ orderData, isAddressEditable, setIsAddressEditable, editedInfo, handleInputChange, handleAddressUpdate }) => {
    return (
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
    );
};

export default ShippingAddress;