import {createAsyncThunk} from '@reduxjs/toolkit';
import DataProviderService from "../../../shared/services/dataProviderService";

export const fetchShopName = createAsyncThunk('generalSlice/fetchShopName', async () => {
    try {
        return await DataProviderService.getShopName({'X-WP-Nonce': wpApiSettings.nonce, "withCredentials": true});
    } catch (error) {
        console.log(error.message);
    }
});