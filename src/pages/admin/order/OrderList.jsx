import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchOrders } from "../../../app/redux/slices/admin/order.slice";
import { FaEye } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import SearchBar from "../../../components/admin/Searchbar";
import Pagination from "../../../components/admin/Pagination";
import DataTable from "../../../components/admin/DataTable";
import FilterBar from "../../../components/admin/FilterBar";
import OrderUpdateStatus from "./OrderUpdateStatus";
import {
    OrderStatus,
    OrderStatusOptions,
    PaymentMethods,
    PaymentMethodOptions,
    DeliveryMethods,
    DeliveryMethodOptions
} from "../../../common/enum";
import { toast } from "react-toastify";



const OrderList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [orders, setOrders] = useState([]);
    const [pageInfo, setPageInfo] = useState({ total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ status: "", transaction: "", delivery: "" });

    const [selectedOder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const searchTerm = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page")) || 1;

    const statusOptions = OrderStatusOptions;
    const paymentMethodOptions = PaymentMethodOptions;
    const deliveryOptions = DeliveryMethodOptions;

    useEffect(() => {
        const params = Object.fromEntries(searchParams);
        
        const status = params.status || "";
        const transaction = params.transaction || ""; 
        const delivery = params.delivery || "";
        
        setFilters({
            status,
            transaction,
            delivery
        });
        
        const fetchData = async () => {
            setLoading(true);    
            try {
                const filtersForAPI = {
                    status,
                    transaction,
                    delivery
                };
                
                const response = await dispatch(
                    fetchOrders({ search: searchTerm, page, ...filtersForAPI })
                ).unwrap();
                
                setOrders(response.items || []);
                setPageInfo({
                    total: response.pageInfo?.totalElements || 0,
                    totalPages: response.pageInfo?.totalPages || 0,
                });
            } catch (error) {
                toast.error(error);
            } finally {
                setLoading(false);
            }
        };        
        fetchData();
    }, [dispatch, searchTerm, page, searchParams, refresh]);

    const handleSearch = (value) => {
        setSearchParams((prev) => ({ ...Object.fromEntries(prev), search: value, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        setSearchParams((prev) => {
            return { ...Object.fromEntries(prev), page: newPage };
        });
    };
    const handleIsOpenModal = (order) => {
        setIsModalOpen(true);
        setSelectedOrder(order);
    }

    const handleIsCloseModal = () => {
        setIsModalOpen(false);
        setRefresh(!refresh);
    }
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        
        setSearchParams((prev) => {
            const newParams = { ...Object.fromEntries(prev), page: 1 };
            
            if (newFilters.status && newFilters.status !== "") {
                newParams.status = newFilters.status;
            } else {
                delete newParams.status;
            }
            
            if (newFilters.transaction && newFilters.transaction !== "") {
                newParams.transaction = newFilters.transaction;
            } else {
                delete newParams.transaction;
            }
            
            if (newFilters.delivery && newFilters.delivery !== "") {
                newParams.delivery = newFilters.delivery;
            } else {
                delete newParams.delivery;
            }
            
            return newParams;
        });
    };

    const getStatusLabel = (status) => {
        const statusMap = {
            [OrderStatus.PENDING]: { label: "Đang chờ", className: "bg-gray-100 text-gray-800" },
            [OrderStatus.SHIPPING]: { label: "Đang giao", className: "bg-blue-100 text-blue-600" },
            [OrderStatus.COMPLETED]: { label: "Hoàn thành", className: "bg-green-100 text-green-600" },
            [OrderStatus.CANCELED]: { label: "Đã hủy", className: "bg-red-100 text-red-600" }
        };

        const statusInfo = statusMap[status] || { label: status, className: "bg-gray-100 text-gray-800" };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}>
                {statusInfo.label}
            </span>
        );
    };

    const getDeliveryLabel = (delivery) => {
        const deliveryMap = {
            [DeliveryMethods.STANDARD]: "Standard",
            [DeliveryMethods.VIETTEL_POST]: "Viettel Post",
            [DeliveryMethods.FAST_DELIVERY]: "Giao hàng nhanh",
            [DeliveryMethods.JT_EXPRESS]: "J&T Express"
        };

        return deliveryMap[delivery] || delivery;
    };

    const getPaymentMethodLabel = (paymentMethod) => {
        const paymentMap = {
            [PaymentMethods.COD]: "COD",
            [PaymentMethods.MOMO]: "MoMo E-Wallet",
            [PaymentMethods.ZALOPAY]: "ZaloPay E-Wallet"
        };

        return paymentMap[paymentMethod] || paymentMethod;
    };

    const filterOptions = [
        { label: "Trạng thái", key: "status", options: statusOptions },
        { label: "Loại giao dịch", key: "transaction", options: paymentMethodOptions },
        { label: "Đơn vị vận chuyển", key: "delivery", options: deliveryOptions }
    ];

    const columns = [
        {
            header: "Mã đơn hàng",
            accessor: "orderCode",
            render: (order) => <strong className="font-bold">{order.orderCode}</strong>,
        },
        {
            header: "Số điện thoại khách hàng",
            accessor: "phoneNumber",
        },
        {
            header: "Tổng tiền",
            accessor: "totalPrice",
            render: (order) => (
                <span className="text-gray-700 font-medium">
                    {new Intl.NumberFormat("vi-VN").format(order.totalPrice)} đ
                </span>
            ),
        },
        {
            header: "Trạng thái",
            accessor: "status",
            render: (order) => getStatusLabel(order.status),
        },
        {
            header: "Loại giao dịch",
            accessor: "paymentMethod",
            render: (order) => getPaymentMethodLabel(order.paymentMethod),
        },
        {
            header: "Phương thức vận chuyển",
            accessor: "delivery",
            render: (order) => getDeliveryLabel(order.delivery),
        },

        {
            header: "Hành động",
            render: (order) => (
                <div className="flex gap-2">
                    <button
                        className="text-indigo-600 text-lg hover:scale-110 transition mr-3"
                        onClick={() => navigate(`/admin/orderDetail/${order.id}`)}
                    >
                        <FaEye />
                    </button>
                    {order.status !== OrderStatus.COMPLETED && order.status !== OrderStatus.CANCELED && (
                        <button
                            className="text-yellow-500 text-lg hover:scale-110 transition mr-3"
                            onClick={() => handleIsOpenModal(order)}
                        >
                            <MdOutlineModeEdit />
                        </button>
                    )}

                </div>
            ),
        },
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl text-indigo-600 font-bold mb-9">Đơn hàng</h2>

            <div className="mb-4">
                <div className="flex flex-col md:flex-row gap-6 mb-4">
                    <div className="w-full md:w-[300px] flex-shrink-0">
                        <SearchBar
                            searchTerm={searchParams.get("search") || ""}
                            onSearch={handleSearch}
                            placeholder="Nhập mã đơn hàng hoặc SĐT..."
                            className="w-full"
                        />
                    </div>
                    <div className="flex-grow">
                        <FilterBar
                            filters={{ ...filters, options: filterOptions }}
                            onFilterChange={handleFilterChange}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            {loading && <p className="text-center text-gray-600 mt-1">Đang tải dữ liệu...</p>}
            <DataTable columns={columns} data={orders} />

            <Pagination
                total={pageInfo.total}
                totalPages={pageInfo.totalPages}
                page={page}
                onPageChange={handlePageChange}
            />
            <OrderUpdateStatus isOpen={isModalOpen} onClose={handleIsCloseModal} order={selectedOder} />
        </div>
    );
};

export default OrderList;