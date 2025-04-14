import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const AccountPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState('');
    const location = useLocation();

    // Determine the current page from the URL
    const getActivePage = () => {
        const path = location.pathname;
        if (path.includes('/orders/')) {
            return 'orders';
        }
        if (path.includes('/orders')) {
            return 'orders';
        };
        if (path.includes('/profile')) {
            return 'profile';
        }
        if (path.includes('/help')) {
            return 'help';
        }
        if (path.includes('/terms')) {
            return 'terms';
        }
        return 'profile';
    };

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        const activePage = getActivePage();
        // Update title based on activePage
        switch (activePage) {
            case 'orders':
                setPageTitle('Đơn hàng của tôi');
                break;
            case 'profile':
                setPageTitle('Thông tin cá nhân');
                break;
            case 'help':
                setPageTitle('Trung tâm trợ giúp');
                break;
            case 'terms':
                setPageTitle('Điều khoản sử dụng');
                break;
            default:
                setPageTitle('Thông tin cá nhân');
        }
    }, [location.pathname]);

    return (
        <div className="sm:mt-3 mt-1">
            <div className="mx-auto px-4 sm:py-6 py-2 md:px-8 lg:px-16">
                {/* Mobile Header */}
                <div className="flex items-center gap-3 lg:hidden mb-1">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                    >
                        <AiOutlineMenu className="h-6 w-6" />
                    </button>
                    <h1 className='text-xl sm:text-2xl font-bold'>{pageTitle}</h1>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 relative">
                    <div className={`
                        lg:col-span-2
                        lg:block
                        ${isSidebarOpen ? 'block' : 'hidden'}
                        lg:static fixed inset-0 z-20
                    `}>
                        {/* Overlay for mobile */}
                        <div
                            className={`
                                lg:hidden fixed inset-0 bg-black bg-opacity-50
                                ${isSidebarOpen ? 'block' : 'hidden'}
                            `}
                            onClick={() => setIsSidebarOpen(false)}
                        />

                        {/* Sidebar content */}
                        <div className={`
                            lg:w-auto w-64 h-full lg:h-auto
                            lg:relative fixed top-0 left-0
                            transform transition-transform duration-300 ease-in-out
                            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                            lg:shadow-none shadow-lg
                            overflow-y-auto
                            lg:bg-transparent bg-white
                            ${isSidebarOpen ? 'p-4 pt-20' : ''}
                        `}>
                            <Sidebar
                                activePage={getActivePage()}
                                setIsSidebarOpen={setIsSidebarOpen}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-10">
                        <h1 className="text-xl sm:text-2xl font-bold mb-2 hidden lg:block">{pageTitle}</h1>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage; 