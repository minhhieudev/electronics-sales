import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/user/UserLayout";
import HomePage from "../pages/user/home/HomePage";
import CheckoutPage from "../pages/user/checkout/CheckoutPage";
import OrderSuccess from "../pages/user/checkout/order-success/OrderSuccess";
import PageNotFound from "../pages/page-not-found/PageNotFoundPage";
import AuthForm from "../pages/auth/AuthForm";
import AccountPage from "../pages/user/account/AccountPage";
import ProfileContent from "../pages/user/account/pages/ProfilePage";
import OrdersContent from "../pages/user/account/pages/OrdersPage";
import DetailOrder from "../pages/user/account/pages/OrderDetailPage";
import ProductDetail from "../pages/user/product/ProductDetail";

const UserRoutes = () => {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetail />} />

                {/* Account Routes */}
                <Route path="/account" element={<AccountPage />}>
                    <Route index element={<ProfileContent />} />
                    <Route path="profile" element={<ProfileContent />} />
                    <Route path="orders" element={<OrdersContent />} />
                    <Route path="orders/:orderId" element={<DetailOrder />} />
                </Route>

                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/checkout/success" element={<OrderSuccess />} />
            </Route>
            <Route path="/auth" element={<AuthForm />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default UserRoutes;
