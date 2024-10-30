import {createSlice} from '@reduxjs/toolkit';
import {fetchRewards} from "./RewardsThunksAction";

const initialState = {
    rewards: [],
    activities: [],
    points: null,
    isLogin: false,
    isOpen: false,
    type: null
};

const rewardsSlice = createSlice({
    name: 'rewardsSlice',
    initialState,
    reducers: {
        setType: (state) => {
            state.isOpen = false;
        },
    },
    extraReducers: {
        [fetchRewards.fulfilled]: (state, { payload }) => {
            state.rewards = payload.rewards;
            state.activities = payload.activities;
        }
    }
});

export const {} = rewardsSlice.actions;

export default rewardsSlice.reducer;
