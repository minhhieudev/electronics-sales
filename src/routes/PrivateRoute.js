import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const isLogin = useSelector((state) => state.auth.isLogin);
    const location = useLocation();
    const currentPath = location.pathname;

    // Allows access to the home page, product detail page, and login page
    const isPublicPath = 
        currentPath === '/' || 
        currentPath.match(/^\/product\/[^/]+$/) || 
        currentPath === '/auth';

    // If the user is not logged in and the path is not public
    if (!isLogin && !isPublicPath) {
        // Redirects to the login page with information about where they were trying to access
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;