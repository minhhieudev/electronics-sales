import { createAsyncThunk } from "@reduxjs/toolkit";
import AccountService from "../../../services/admin/account.service";
import MESSAGES from "../../../../common/const";
import { setLoading } from "../loading.slice";

export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await AccountService.getAccount(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.GET_ACCOUNT_LIST_ERROR);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchAccountById = createAsyncThunk(
  "accounts/fetchAccountById",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await AccountService.getAccountById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "accounts/deleteAccount",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await AccountService.deleteAccount(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
    } finally {
      dispatch(setLoading(false));
    }
  }
);
