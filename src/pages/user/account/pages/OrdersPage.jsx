import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../../../../app/redux/slices/user/order.slice';
import OrderItem from '../components/OrderItem';

const OrdersContent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ordersList, setOrdersList] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [allOrdersStats, setAllOrdersStats] = useState({});

    const tabMapping = [
        { value: '', label: 'Tất cả' },
        { value: 'PENDING', label: 'Đang xử lý' },
        { value: 'SHIPPING', label: 'Đang vận chuyển' },
        { value: 'COMPLETED', label: 'Đã hoàn thành' },
        { value: 'CANCELED', label: 'Đã hủy' }
    ];

    // Function to fetch orders with filters
    const fetchOrdersData = (query = searchQuery) => {
        dispatch(fetchOrders({
            params: {
                status: activeTab,
                search: query,
            },
            onSuccess: (data) => {
                setOrdersList(data || []);

                // Update statistics when fetching all orders (empty tab)
                if (activeTab === '' && !query) {
                    const stats = {
                        '': data?.length || 0,
                        'PENDING': data?.filter(order => order.status === 'PENDING').length || 0,
                        'SHIPPING': data?.filter(order => order.status === 'SHIPPING').length || 0,
                        'COMPLETED': data?.filter(order => order.status === 'COMPLETED').length || 0,
                        'CANCELED': data?.filter(order => order.status === 'CANCELED').length || 0,
                    };
                    setAllOrdersStats(stats);
                }
            }
        }));
    };

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        fetchOrdersData(searchQuery);
    }, [activeTab]);

    // Handle search button click
    const handleSearch = () => {
        fetchOrdersData();
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    // Handle clear search input
    const handleClearSearch = () => {
        setSearchQuery('');
        fetchOrdersData('');
    };

    // Hàm này thay thế onOrderSelect
    const handleOrderSelect = (orderId) => {
        navigate(`/account/orders/${orderId}`);
    };

    const renderEmptyState = () => (
        <div className="text-center py-6 h-60 rounded-sm bg-white">
            <img src={`${process.env.REACT_APP_CDN_URL}kp1jvboylnoa6tsw3pzx.png`} alt="OrderEmty" className="mx-auto w-40" />
            <p className="text-gray-500 font-bold">Không tìm thấy đơn hàng</p>
        </div>
    );

    return (
        <div>
            <div className="space-y-2">
                {/* Search bar */}
                <div className="bg-white p-2 rounded-lg">
                    <div className="flex text-sm gap-2 rounded-lg border border-gray-200">
                        <div className="flex-1 flex items-center relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm đơn hàng"
                                className="w-full p-2 focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            {searchQuery && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-2 text-gray-400 hover:text-gray-600"
                                >
                                    <AiOutlineClose className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <button
                            className="bg-orange-500 px-4 text-white flex items-center justify-center"
                            onClick={handleSearch}
                        >
                            <AiOutlineSearch className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Tabs - Scrollable container */}
                <div className="bg-white rounded-lg">
                    <div className="overflow-x-auto scrollbar-hide">
                        <div className="flex whitespace-nowrap border-b min-w-max">
                            {tabMapping.map((tab) => (
                                <button
                                    key={tab.value}
                                    className={`px-4 py-3 text-sm font-medium ${activeTab === tab.value ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
                                    onClick={() => setActiveTab(tab.value)}
                                >
                                    {tab.label}
                                    {allOrdersStats[tab.value] > 0 && (
                                        <span className="ml-1 text-orange-500">({allOrdersStats[tab.value]})</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Orders list */}
                <div className="space-y-4">
                    {ordersList.length > 0 ? (
                        ordersList.map(order => (
                            <div key={order.orderCode || order.id} className="bg-white rounded-lg" onClick={() => handleOrderSelect(order.id)}>
                                <OrderItem order={order} onOrderSelect={handleOrderSelect} />
                            </div>
                        ))
                    ) : (
                        renderEmptyState()
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrdersContent;