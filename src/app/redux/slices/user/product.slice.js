import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import MESSAGES, { CONST } from "../../../../common/const";
import ProductService from "../../../services/user/product.service";
import { setLoading } from "../loading.slice";

// Thunk action to fetch products
export const fetchProductsAction = createAsyncThunk(
    "products/fetchProducts",
    async ({ params, onSuccess }, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const response = await ProductService.getProducts(params);
            const data = response.data;

            if (data && response.status === CONST.STATUS.SUCCESS) {
                onSuccess(data);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || MESSAGES.GET_PRODUCT_LIST_ERROR;
            toast.error(errorMessage);
        } finally {
            dispatch(setLoading(false));
        }
    }
);

// Thunk action to fetch product detail
export const fetchProductDetailAction = createAsyncThunk(
    "products/fetchProductDetail",
    async ({ id, onSuccess }, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const response = await ProductService.getProductDetail(id);
            const data = response.data;

            if (data && response.status === CONST.STATUS.SUCCESS) {
                onSuccess(data);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || MESSAGES.GET_PRODUCT_DETAIL_ERROR;
            toast.error(errorMessage);
        } finally {
            dispatch(setLoading(false));
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState: {},
    reducers: {},
});

export default productSlice.reducer;
