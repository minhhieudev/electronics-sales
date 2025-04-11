import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import MESSAGES, { CONST } from "../../../../common/const";
import OrderService from "../../../services/user/order.service";
import { setLoading } from "../loading.slice";
import { updateTotalQuantity } from "../auth.slice";

// Thunk action to fetch order list
export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async ({ params, onSuccess }, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const response = await OrderService.getOrders(params);
            if (response.status === CONST.STATUS.SUCCESS) {
                onSuccess && onSuccess(response.data.items);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || MESSAGES.NETWORK_ERROR);
        }
        finally {
            dispatch(setLoading(false));
        }
    }
);

// Thunk action to get order detail
export const fetchOrderDetail = createAsyncThunk(
    "orders/fetchOrderDetail",
    async ({ orderId, onSuccess }, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const response = await OrderService.getOrderDetail(orderId);
            if (response.status === CONST.STATUS.SUCCESS) {
                onSuccess && onSuccess(response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || MESSAGES.NETWORK_ERROR);
        }
        finally {
            dispatch(setLoading(false));
        }
    }
);

// Thunk action to create order
export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async ({ orderData, onSuccess }, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const response = await OrderService.createOrder(orderData);
            if (response.status === CONST.STATUS.SUCCESS) {
                onSuccess && onSuccess(response.data);
                toast.success(MESSAGES.CREATE_ORDER_SUCCESS);
                
                // Update totalQuantity of cart
                dispatch(updateTotalQuantity(response?.data?.totalQuantity));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || MESSAGES.NETWORK_ERROR);
        }
        finally {
            dispatch(setLoading(false));
        }
    }
);

// Thunk action to update order address
export const updateOrderAddress = createAsyncThunk(
    "orders/updateOrderAddress",
    async ({ orderData, onSuccess }, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const updateData = {
                ...orderData,
                status: 'PENDING'
            };
            const response = await OrderService.updateOrder(updateData);
            if (response.status === CONST.STATUS.SUCCESS) {
                toast.success(MESSAGES.UPDATE_ORDER_SUCCESS);
                onSuccess && onSuccess(response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || MESSAGES.UPDATE_ORDER_ERROR);
        }
        finally {
            dispatch(setLoading(false));
        }
    }
);

// Thunk action to cancel order
export const cancelOrder = createAsyncThunk(
    "orders/cancelOrder",
    async ({ orderId, onSuccess }, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const response = await OrderService.updateOrder({
                id: orderId,
                status: 'CANCELED'
            });
            if (response.status === CONST.STATUS.SUCCESS) {
                toast.success(MESSAGES.DELETE_ORDER_SUCCESS);
                onSuccess && onSuccess();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || MESSAGES.DELETE_ORDER_ERROR);
        }
        finally {
            dispatch(setLoading(false));
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState: {},
    reducers: {},
});

export default orderSlice.reducer;
