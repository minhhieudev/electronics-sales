import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/user/header/Header";

const UserLayout = () => {
    return (
        <div className="user-layout min-h-screen bg-gradient-to-r from-[#FFFAFA] to-[#f3faf3]">
            <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <div className="max-w-[1440px] mx-auto ">
                    <Header />
                </div>
            </div>
            <div className="user-content pt-[60px]">
                <div className="max-w-[1440px] mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
