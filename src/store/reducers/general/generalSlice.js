import {createSlice} from '@reduxjs/toolkit';
import {fetchShopName} from "./generalThunksAction";

const initialState = {
    isLogin: false,
    isOpen: false,
    type: null,
    shopName: localStorage.getItem('shopName') || null,
    currency: localStorage.getItem('currency') || null,
    user: null
};

const generalSlice = createSlice({
    name: 'rewardsSlice',
    initialState,
    reducers: {
        setType: (state, {payload}) => {
            state.type = payload;
        },
        openCloseModal: (state, {payload}) => {
            state.isOpen = payload;
        },
    },
    extraReducers: {
        [fetchShopName.fulfilled]: (state, {payload: {currency, shop_name,user}}) => {
            const numberFormat = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 0,
            });

            state.currency = numberFormat.formatToParts()[0].value;
            state.shopName = shop_name;
            state.user = user.data.user_email;

            localStorage.setItem('shopName', state.shopName);
            localStorage.setItem('currency', state.currency);
        }
    }
});

export const {setType, openCloseModal} = generalSlice.actions;

export default generalSlice.reducer;
