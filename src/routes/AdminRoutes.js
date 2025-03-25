import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import AccountList from "../pages/admin/account/AccountList";
import CategoryList from "../pages/admin/category/CategoryList";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "../pages/page-not-found/PageNotFoundPage";

const AdminRoutes = () => {
  return (
    <ProtectedRoute>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="accounts" element={<AccountList />} />
          <Route path="category" element={<CategoryList/>}/>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ProtectedRoute>
  );
};

export default AdminRoutes;
