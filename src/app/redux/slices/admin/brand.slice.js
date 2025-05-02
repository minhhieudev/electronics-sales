import { createAsyncThunk } from "@reduxjs/toolkit";
import BrandService from "../../../services/admin/brand.service";
import MESSAGES from "../../../../common/const";
import { setLoading } from "../loading.slice";

export const fetchBrands = createAsyncThunk(
  "brand/fetchBrands",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await BrandService.getBrand(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.GET_BRAND_LIST_ERROR);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const addBrand = createAsyncThunk(
  "brand/addBrand",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await BrandService.postBrand(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchBrandFilter = createAsyncThunk(
  "brand/fetchBrandFilter",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await BrandService.fetchBrandOption();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await BrandService.putBrand(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await BrandService.deleteBrand(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);
