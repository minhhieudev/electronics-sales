import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/user/UserLayout";
import HomePage from "../pages/user/home/HomePage";
import PageNotFound from "../pages/page-not-found/PageNotFoundPage";
import AuthForm from "../pages/auth/AuthForm";
import AccountPage from "../pages/user/account/AccountPage";

const UserRoutes = () => {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route path="/" element={<HomePage />} />


                <Route path="/account" element={<AccountPage />} />
            </Route>
            <Route path="/auth" element={<AuthForm />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default UserRoutes;
