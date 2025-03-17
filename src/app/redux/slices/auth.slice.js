import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import MESSAGES from "../../../common/const";
import AuthService from "../../services/auth/auth.service";
import CONST from "../const";
import { setLoading } from "./loading.slice";

export const loginAction = createAsyncThunk(
  "auth/login",
  async ({ body, onSuccess }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const loginResponse = await AuthService.login({ body });
      const response = loginResponse.data

      if (response && response.status === 'success') {
        const { token, data } = response;

        localStorage.setItem(CONST.STORAGE.ACCESS_TOKEN, token);
        localStorage.setItem(CONST.STORAGE.USER_INFO, JSON.stringify(data || {}));

        onSuccess && onSuccess(data);
        toast.success(MESSAGES.LOGIN_SUCCESS);

        return data;
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || MESSAGES.LOGIN_ERROR;
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const registerAction = createAsyncThunk(
  "auth/register",
  async ({ body }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const registerResponse = await AuthService.register(body);
      const response = registerResponse.data

      if (response && response.status === 'success') {
        toast.success(MESSAGES.REGISTER_SUCCESS);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || MESSAGES.REGISTER_ERROR;
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const initialState = {
  userInfo: undefined,
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = undefined;
      state.isLogin = false;
      localStorage.clear();
    },
    updateUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.userInfo = payload;
        state.isLogin = true;
      })
  },
});

export const { logout, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;