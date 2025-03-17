import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import ProfileContent from './ProfileContent';
import Sidebar from './Sidebar';

const AccountPage = () => {
    const [currentPage, setCurrentPage] = useState('profile');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const renderContent = () => {
        switch (currentPage) {
            case 'profile':
                return <ProfileContent />;
            // case 'orders':
            //     return <OrdersContent />;
            // case 'detailOrder':
            //     return <DetailOrder />;
            // case 'help':
            //     return <HelpPage />;
            // case 'terms':
            //     return <TermsPage />;
            default:
                return <ProfileContent />;
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setIsSidebarOpen(false);
    };

    return (
        <div className="mt-4">
            <div className="mx-auto px-4 py-6 md:px-8 lg:px-16">
                {/* Mobile Header */}
                <div className="flex items-center gap-3 lg:hidden mb-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                    >
                        <AiOutlineMenu className="h-6 w-6" />
                    </button>
                    <h1 className="text-xl font-bold">Tài khoản</h1>
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
                        `}>
                            <Sidebar
                                activePage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-10">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage; 