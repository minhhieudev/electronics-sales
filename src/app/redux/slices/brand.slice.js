import { createAsyncThunk } from "@reduxjs/toolkit";
import BrandService from "../../services/brand.service";

export const fetchBrands = createAsyncThunk(
    "brand/fetchBrands",
    async (params, { rejectWithValue }) => {
      try {
        const response = await BrandService.getBrand(params);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  );

  export const addBrand = createAsyncThunk(
    "brand/addBrand",
    async (data, { rejectWithValue }) => {
      try {
        const response = await BrandService.postBrand(data);
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  );


  
