import React from 'react';
import { Navigate } from 'react-router-dom';
import CONST from '../app/redux/const';

const ProtectedRoute = ({ children }) => {
    const userInfo = JSON.parse(localStorage.getItem(CONST.STORAGE.USER_INFO));

    const isAdmin = userInfo && userInfo.role === true;

    return isAdmin ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
