import { createAsyncThunk } from "@reduxjs/toolkit";
import CategoryService from "../../../services/admin/category.service";
import MESSAGES from "../../../../common/const";
import { setLoading } from "../loading.slice";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await CategoryService.getCategory(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.GET_CATEGORY_LIST_ERROR);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchCategoryFilter = createAsyncThunk(
  "category/fetchCategoryFilter",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await CategoryService.fetchCategoryOption();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryData, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await CategoryService.postCategory(categoryData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await CategoryService.putCategory(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await CategoryService.deleteCategory(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
    } finally {
      dispatch(setLoading(false));
    }
  }
);
