import {createSlice} from '@reduxjs/toolkit';
import {fetchCreateDiscount, fetchRewardCount, fetchRewards} from "./rewardsThunksAction";

const initialState = {
    vouchers: [],
    activities: [],
    points: 0,
    activeReward: null,
    isShow: false,
    isSuccessAdd: false,
    rewardCount: null,
    lynkedLogin: false
};

const rewardsSlice = createSlice({
    name: 'rewardsSlice',
    initialState,
    reducers: {
        setActiveReward: (state, {payload}) => {
            state.activeReward = payload;
        },
        setIsSuccessAdd: (state, {payload}) => {
            state.isSuccessAdd = false;
        },
        setIsShow: (state, {payload}) => {
            state.isShow = payload;
        },
    },
    extraReducers: {
        [fetchRewards.fulfilled]: (state, {payload}) => {
            if (payload) {
                const {vouchers, activities, points} = payload;
                state.vouchers = vouchers;
                state.activities = activities;
                state.points = points;
                state.lynkedLogin = true;
            } else {
                state.lynkedLogin = false
            }
        },
        [fetchCreateDiscount.fulfilled]: (state, {payload}) => {
            state.isShow = false;
            state.isSuccessAdd = true;
        },
        [fetchRewardCount.fulfilled]: (state, {payload}) => {
            state.rewardCount = payload.vouchersCount;
        }
    }
});

export const {setActiveReward, setIsSuccessAdd, setIsShow} = rewardsSlice.actions;

export default rewardsSlice.reducer;
