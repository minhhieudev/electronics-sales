import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/user/header/Header";

const UserLayout = () => {
    return (
        <div className="user-layout">
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header />
            </div>
            <div className="user-content pt-12">
                <Outlet />
            </div>
        </div>
    );
};

export default UserLayout;
