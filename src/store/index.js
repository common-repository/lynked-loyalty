import { configureStore } from '@reduxjs/toolkit';
import rewardsReducer from './reducers/rewards/rewardsSlice';
import generalReducer from "./reducers/general/generalSlice";

export const store = configureStore({
    reducer: {
        rewards: rewardsReducer,
        general: generalReducer
    }
})