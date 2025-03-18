import { createAsyncThunk } from "@reduxjs/toolkit";
import AccountService from "../../services/account.service";

export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await AccountService.getAccount(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

export const fetchAccountById = createAsyncThunk(
  "accounts/fetchAccountById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AccountService.getAccountById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "accounts/deleteAccount",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AccountService.deleteAccount(id);
      return response; 
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }
  }
);


