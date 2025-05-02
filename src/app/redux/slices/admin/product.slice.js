import { createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../../../services/admin/product.service";
import { setLoading } from "../loading.slice";
import MESSAGES from "../../../../common/const";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ( params , { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await ProductService.fetchProduct(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.GET_PRODUCT_LIST_ERROR);
    }finally{
      dispatch(setLoading(false));
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async ({data }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await ProductService.postProduct(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
    }finally{
      dispatch(setLoading(false));
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async ( id , { rejectWithValue,dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await ProductService.fetchProductById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
    }finally{
      dispatch(setLoading(false));
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async({id,data}, {rejectWithValue}) =>{
    try {
      const response = await ProductService.putProduct(id,data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "category/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ProductService.deleteProduct(id);
      return response; 
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
    }
  }
);

