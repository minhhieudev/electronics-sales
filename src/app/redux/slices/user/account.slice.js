import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import MESSAGES, { CONST } from "../../../../common/const";
import AccountService from "../../../services/user/account.service";
import { updateUserInfo } from '../auth.slice';
import { setLoading } from "../loading.slice";

// Thunk action to update profile
export const updateProfileAction = createAsyncThunk(
    "accounts/updateProfile",
    async ({ body, onSuccess }, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const response = await AccountService.updateProfile(body);
            const data = response.data;

            if (data && response.status === CONST.STATUS.SUCCESS) {
                toast.success(MESSAGES.UPDATE_PROFILE_SUCCESS);
                dispatch(updateUserInfo(data));
                onSuccess && onSuccess();
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || MESSAGES.UPDATE_PROFILE_ERROR;
            toast.error(errorMessage);
        } finally {
            dispatch(setLoading(false));
        }
    }
);

// Thunk action to change password
export const changePasswordAction = createAsyncThunk(
    "accounts/changePassword",
    async ({ currentPassword, newPassword, onSuccess }, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const response = await AccountService.changePassword({
                oldPassword: currentPassword,
                newPassword: newPassword
            });

            if (response && response.status === CONST.STATUS.SUCCESS) {
                toast.success(MESSAGES.CHANGE_PASSWORD_SUCCESS);
                onSuccess && onSuccess();
            }

        } catch (error) {
            const errorMessage = error?.response?.data?.message || MESSAGES.CHANGE_PASSWORD_ERROR;
            toast.error(errorMessage);
        } finally {
            dispatch(setLoading(false));
        }
    }
);

const accountSlice = createSlice({
    name: "account",
    initialState: {},
    reducers: {}
});

export default accountSlice.reducer;

