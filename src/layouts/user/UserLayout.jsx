import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/user/header/Header";

const UserLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/'; 

    return (
        <div className="user-layout min-h-screen">
            <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <div className="max-w-[1440px] mx-auto">
                    <Header />
                </div>
            </div>
            <div className="user-content pt-[60px] bg-gradient-to-r from-[#f9eeee] to-[#ecf9ec]">
                <div className="max-w-[1440px] mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
