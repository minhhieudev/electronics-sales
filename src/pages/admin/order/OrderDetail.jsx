import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchOrderById } from "../../../app/redux/slices/admin/order.slice";
import { toast } from "react-toastify";
import {
    OrderStatus,
    OrderStatusOptions,
    PaymentMethodOptions,
    DeliveryMethodOptions
} from "../../../common/enum";

const OrderDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const [order, setOrder] = useState(null);

    const header = ["Mã sản phẩm", "Tên sản phẩm", "Màu sắc", "Đơn giá", "Số lượng", "Thành tiền"];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dispatch(fetchOrderById(id)).unwrap();
                setOrder(data);
            } catch (error) {
                toast.error(error);
            }
        };

        fetchData();
    }, [id, dispatch]);

    const getStatusLabel = (status) => {
        const statusClassMap = {
            [OrderStatus.PENDING]: "bg-gray-100 text-gray-800",
            [OrderStatus.SHIPPING]: "bg-blue-100 text-blue-600",
            [OrderStatus.COMPLETED]: "bg-green-100 text-green-600",
            [OrderStatus.CANCELED]: "bg-red-100 text-red-600"
        };

        const statusOption = OrderStatusOptions.find(opt => opt.id === status);
        const className = statusClassMap[status];

        return <span className={`px-2 py-1 rounded-md ${className}`}>{statusOption.name}</span>;
    };

    const getPaymentMethodLabel = (method) => {
        const methodOption = PaymentMethodOptions.find(opt => opt.id === method);
        return methodOption.name;
    };

    const getDeliveryLabel = (method) => {
        const deliveryOption = DeliveryMethodOptions.find(opt => opt.id === method);
        return deliveryOption.name;
    };

    if (!order) return <div>Đang tải đơn hàng...</div>;

    const {
        orderCode,
        phoneNumber,
        totalPrice,
        status,
        paymentMethod,
        delivery,
        address,
        items = [],
    } = order;

    return (
        <div className="mt-4">
            <h2 className="text-2xl text-indigo-600 font-bold mb-2">Đơn hàng</h2>
            <div className="p-6 bg-white rounded-md shadow-md max-w mt-4 border border-gray-200">
                <div className="text-sm text-gray-800 space-y-3 mb-6">
                    <h3 className="font-bold mb-2 text-l">Thông tin đơn hàng</h3>
                    <div className="gap-y-1">
                        <div className="flex mt-4">
                            <div className="w-40 font-medium text-l">Mã đơn hàng:</div>
                            <div className="text-l font-bold  ">{orderCode}</div>
                        </div>
                        <div className="flex mt-4">
                            <div className="w-40 font-medium text-l">Số điện thoại:</div>
                            <div className="text-l font-medium ">{phoneNumber}</div>
                        </div>
                        <div className="flex mt-4">
                            <div className="w-40 font-medium text-l">Tổng tiền:</div>
                            <div className="text-l font-medium ">{Number(totalPrice).toLocaleString()}</div>
                        </div>
                        <div className="flex mt-4">
                            <div className="w-40 font-medium text-l">Trạng thái:</div>
                            <div className="text-l font-medium">{getStatusLabel(status)}</div>
                        </div>
                        <div className="flex  mt-4">
                            <div className="w-40 font-medium text-l">Loại giao dịch:</div>
                            <div className="text-l font-medium" >{getPaymentMethodLabel(paymentMethod)}</div>
                        </div>
                        <div className="flex  mt-4">
                            <div className="w-40 font-medium text-l">Đơn vị vận chuyển:</div>
                            <div className="text-l font-medium ">{getDeliveryLabel(delivery)}</div>
                        </div>
                        <div className="col-span-2 flex mt-4">
                            <div className="w-40 font-medium text-l">Địa chỉ:</div>
                            <div className="text-l font-medium">{address}</div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-bold mb-2 text-l mt-4">Chi tiết đơn hàng</h3>

                    <div className="flex text-sm font-semibold text-gray-700 mb-2">
                        {header.map((title, idx) => (
                            <div key={idx} className="w-1/6 text-l font-medium mt-4">{title}</div>
                        ))}
                    </div>

                    {items.map((item, index) => (
                        <div key={index} className="flex text-sm text-gray-800 mb-1">
                            {[
                                item.sku,
                                item.name,
                                item.color || "-",
                                Number(item.priceAtTime).toLocaleString(),
                                item.quantity,
                                Number(item.totalPrice).toLocaleString()
                            ].map((value, idx) => (
                                <div key={idx} className="w-1/6 text-l font-medium mt-4">{value}</div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        onClick={() => navigate(`/admin/order`)}
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        </div>
    );

};

export default OrderDetail;
