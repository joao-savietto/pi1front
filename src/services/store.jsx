import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';

const rootReducer = combineReducers({
    auth: authSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

export default store;