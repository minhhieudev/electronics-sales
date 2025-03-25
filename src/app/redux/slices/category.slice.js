import { createAsyncThunk } from "@reduxjs/toolkit";
import CategoryService from "../../services/category.service";

export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async (params, { rejectWithValue }) => {
      try {
        const response = await CategoryService.getCategory(params);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  );

  export const addCategory = createAsyncThunk(
    "category/addCategory",
    async (categoryData, { rejectWithValue }) => {
        try {
            const response = await CategoryService.postCategory(categoryData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data.message);
        }
    }
);

  
