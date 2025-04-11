import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import MESSAGES, { CONST } from "../../../../common/const";
import CartService from "../../../services/user/cart.service";
import { setLoading } from "../loading.slice";
import { updateTotalQuantity } from "../auth.slice";

// Thunk action to fetch user cart
export const fetchUserCart = createAsyncThunk(
    "cart/fetchUserCart",
    async ({ onSuccess }, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const response = await CartService.getUserCart();
            if (response.status === CONST.STATUS.SUCCESS) {
                onSuccess && onSuccess(response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || MESSAGES.COMMON_ERROR);
        }
        finally {
            dispatch(setLoading(false));
        }
    }
);

// Thunk action to add product to cart
export const addProductToCart = createAsyncThunk(
    "cart/addProductToCart",
    async ({ data, onSuccess }, { dispatch }) => {
        try {
            const response = await CartService.addProductToCart(data);
            if (response.status === CONST.STATUS.SUCCESS) {
                onSuccess && onSuccess(response.data);

                // Update totalQuantity of cart
                dispatch(updateTotalQuantity(response?.data?.totalQuantity));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || MESSAGES.COMMON_ERROR);
        }
    }
);

// Thunk action to update product in cart
export const updateProductInCart = createAsyncThunk(
    "cart/updateProductInCart",
    async ({ updateData, onSuccess, onError }) => {
        try {
            const response = await CartService.updateProductInCart(updateData);
            if (response.status === CONST.STATUS.SUCCESS) {
                onSuccess && onSuccess(response.data);
            }
        } catch (error) {
            onError && onError();
            toast.error(error.response?.data?.message || MESSAGES.COMMON_ERROR);
        }
    }
);

// Thunk action to remove product from cart
export const removeProductFromCart = createAsyncThunk(
    "cart/removeProductFromCart",
    async ({ cartIds, onSuccess }, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const data = {
                "items": cartIds
            };

            const response = await CartService.removeProductFromCart(data);
            if (response.status === CONST.STATUS.SUCCESS) {
                onSuccess && onSuccess();

                // Update totalQuantity of cart
                dispatch(updateTotalQuantity(response?.data?.totalQuantity));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || MESSAGES.NETWORK_ERROR);
        } finally {
            dispatch(setLoading(false));
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {},
    reducers: {},
});

export default cartSlice.reducer;