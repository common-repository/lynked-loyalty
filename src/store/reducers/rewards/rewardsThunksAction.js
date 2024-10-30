import {createAsyncThunk} from '@reduxjs/toolkit';
import DataProviderService from "../../../shared/services/dataProviderService";

export const fetchRewards = createAsyncThunk('rewardsSlice/fetchRewards', async (data) => {
    try {
        return await DataProviderService.getPoint(data);
    } catch (error) {
        console.log(error.message);
    }
});

export const fetchRewardCount = createAsyncThunk('rewardsSlice/fetchRewardCount', async (data) => {
    try {
        return await DataProviderService.getRewardCount(data);
    } catch (error) {
        console.log(error.message);
    }
});

export const fetchCreateDiscount = createAsyncThunk('rewardsSlice/fetchCreateDiscount', async (data) => {
    try {
        return await DataProviderService.createDiscount(data);
    } catch (error) {
        console.log(error.message);
    }
});
