import { createAsyncThunk } from "@reduxjs/toolkit";
import StatisticService from "../../../services/admin/statistics.service";
import { setLoading } from "../loading.slice";
import MESSAGES from "../../../../common/const";


export const fetchStatistics = createAsyncThunk(
    "statistic/fetchStatistics",
    async ( params , { dispatch, rejectWithValue }) => {
      try {
        dispatch(setLoading(true));
        const response = await StatisticService.getStatistics(params);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
      }finally{
        dispatch(setLoading(false));
      }
    }
  );


  export const fetchStatisticsTopProduct = createAsyncThunk(
    "statistic/fetchStatisticsTopProduct",
    async ({ limit, startDay, endDay }, { dispatch, rejectWithValue }) => {
      try {
        dispatch(setLoading(true));
        const response = await StatisticService.getStatisticsTopProduct(limit, startDay, endDay);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
      } finally {
        dispatch(setLoading(false));
      }
    }
  );

  
  export const fetchRevenue = createAsyncThunk(
    "statistic/fetchRevenue",
    async ({ limit, startDay, endDay }, { dispatch, rejectWithValue }) => {
      try {
        dispatch(setLoading(true));
        const response = await StatisticService.getRevenue(limit, startDay, endDay);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data.message || MESSAGES.NETWORK_ERROR);
      } finally {
        dispatch(setLoading(false));
      }
    }
  );