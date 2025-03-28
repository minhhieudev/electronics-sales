import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/user/UserLayout";
import HomePage from "../pages/user/home/HomePage";
import CheckoutPage from "../pages/user/checkout/CheckoutPage";
import OrderSuccess from "../pages/user/checkout/order-success/OrderSuccess";
import PageNotFound from "../pages/page-not-found/PageNotFoundPage";
import AuthForm from "../pages/auth/AuthForm";
import AccountPage from "../pages/user/account/AccountPage";
import ProductDetail from "../pages/user/product/ProductDetail";

const UserRoutes = () => {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/checkout" element={<CheckoutPage />}></Route>
                <Route path="/checkout/success" element={<OrderSuccess />} />
            </Route>
            <Route path="/auth" element={<AuthForm />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default UserRoutes;
