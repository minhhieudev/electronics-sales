import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import MESSAGES, { CONST } from "../../../../common/const";
import OrderService from "../../../services/user/order.service";
import { setLoading } from "../loading.slice";

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
            console.log(error)
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
            }
        } catch (error) {
            toast.error(error.response?.data?.message || MESSAGES.NETWORK_ERROR);
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
