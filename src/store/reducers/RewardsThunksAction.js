import { createAsyncThunk } from '@reduxjs/toolkit';
import DataProviderService from "../../shared/services/dataProviderService";

export const fetchRewards = createAsyncThunk('rewardsSlice/fetchRewards', async () => {
    try {
        const response = await DataProviderService.getOrders();

        return response.data;
    } catch (error) {
        console.log(error.message);
    }
});
