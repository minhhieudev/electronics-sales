import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import AccountList from "../pages/admin/account/AccountList";
import CategoryList from "../pages/admin/category/CategoryList";
import BrandList from "../pages/admin/brand/BrandList";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "../pages/page-not-found/PageNotFoundPage";
import ProductList from "../pages/admin/product/ProductList";
import ProductDetail from "../pages/admin/product/ProductDetail";
import ProductAdd from "../pages/admin/product/ProductAdd";
import ProductUpdate from "../pages/admin/product/ProductUpdate";
import OrderList from "../pages/admin/order/OrderList";
import OrderDetail from "../pages/admin/order/OrderDetail";

const AdminRoutes = () => {
  return (
    <ProtectedRoute>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="accounts" element={<AccountList />} />
          <Route path="category" element={<CategoryList/>}/>
          <Route path="brand" element={<BrandList/>}/>
          <Route path="product" element={<ProductList/>}/>
          <Route path="productDetail/:id" element={<ProductDetail/>}/>
          <Route path="productAdd" element={<ProductAdd/>}/>
          <Route path="productUpdate/:id" element={<ProductUpdate/>}/>
          <Route path="order" element={<OrderList/>}/>
          <Route path="orderDetail/:id" element={<OrderDetail/>}/>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ProtectedRoute>
  );
};

export default AdminRoutes;
