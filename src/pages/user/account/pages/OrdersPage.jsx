import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { fetchOrders } from '../../../../app/redux/slices/user/order.slice';
import OrderItem from '../components/OrderItem';

const OrdersContent = ({ onOrderSelect }) => {
    const dispatch = useDispatch();
    const [ordersList, setOrdersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Tab mapping for displaying user-friendly labels
    const tabMapping = [
        { value: '', label: 'Tất cả' },
        { value: 'PENDING', label: 'Đang xử lý' },
        { value: 'SHIPPING', label: 'Đang vận chuyển' },
        { value: 'COMPLETED', label: 'Đã hoàn thành' },
        { value: 'CANCELED', label: 'Đã hủy' }
    ];

    // Function to fetch orders with filters
    const fetchOrdersData = useCallback((query = searchQuery) => {
        setLoading(true);
        dispatch(fetchOrders({
            params: {
                status: activeTab,
                search: query,
            },
            onSuccess: (data) => {
                console.log('Orders loaded successfully', data);
                setOrdersList(data || []);
                setLoading(false);
            }
        }));
    }, [dispatch, activeTab, searchQuery]);

    // Initial load and tab change handler
    useEffect(() => {
        fetchOrdersData(searchQuery);
    }, [activeTab]);

    // Order counts calculation
    const orderCounts = {
        '': ordersList.length,
        'PENDING': ordersList.filter(order => order.status === 'PENDING').length,
        'SHIPPING': ordersList.filter(order => order.status === 'SHIPPING').length,
        'COMPLETED': ordersList.filter(order => order.status === 'COMPLETED').length,
        'CANCELLED': ordersList.filter(order => order.status === 'CANCELLED').length,
    };

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

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
        fetchOrdersData(''); // Search with empty query
    };

    const renderEmptyState = () => (
        <div className="text-center py-6 h-60 rounded-sm bg-white">
            <img src={`${process.env.REACT_APP_CDN_URL}kp1jvboylnoa6tsw3pzx.png`} alt="OrderEmty" className="mx-auto w-40" />
            <p className="text-gray-500 font-bold">Không tìm thấy đơn hàng</p>
        </div>
    );

    if (loading) {
        return <div className="text-center py-6">Đang tải...</div>;
    }

    return (
        <div className="">
            <div className="space-y-2">
                <h1 className="text-xl font-bold">Đơn hàng của tôi</h1>

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
                                    onClick={() => handleTabChange(tab.value)}
                                >
                                    {tab.label}
                                    {orderCounts[tab.value] > 0 && (
                                        <span className="ml-1 text-orange-500">({orderCounts[tab.value]})</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Orders list with scroll */}
                <div className="space-y-4 max-h-[450px] overflow-y-auto">
                    {ordersList.length > 0 ? (
                        ordersList.map(order => (
                            <div key={order.orderCode || order.id} className="bg-white rounded-lg" onClick={() => onOrderSelect(order.id)}>
                                <OrderItem order={order} onOrderSelect={onOrderSelect} />
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