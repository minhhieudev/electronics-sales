import { createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "../../../services/admin/order.service";
import { setLoading } from "../loading.slice";
import MESSAGES from "../../../../common/const";

export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async ( params , { dispatch, rejectWithValue }) => {
      try {
        dispatch(setLoading(true));
        const response = await OrderService.fetchOrders(params);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data.message || MESSAGES.GET_ORDER_LIST_ERROR);
      }finally{
        dispatch(setLoading(false));
      }
    }
  );

  export const fetchOrderById = createAsyncThunk(
    "order/fetchOrders",
    async ( id , { dispatch, rejectWithValue }) => {
      try {
        dispatch(setLoading(true));
        const response = await OrderService.fetchOrderById(id);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
      }finally {
        dispatch(setLoading(false));
      }
    }
  );


  export const updateOrderStatus = createAsyncThunk(
    "order/updateStatus",
    async (data, { dispatch, rejectWithValue }) => {
      try {
        dispatch(setLoading(true));
        const response = await OrderService.patchOrder(data);
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
      } finally {
        dispatch(setLoading(false));
      }
    }
  );
