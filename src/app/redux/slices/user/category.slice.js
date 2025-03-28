import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CONST } from "../../../../common/const";
import CategoryService from "../../../services/user/category.service";

// Thunk action to fetch categories
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async ({ onSuccess }) => {
        try {
            const response = await CategoryService.getCategories();
            if (response.status === CONST.STATUS.SUCCESS) {
                onSuccess && onSuccess(response.data.items);
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            }
        }
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState: {},
    reducers: {},
});

export default categorySlice.reducer;



