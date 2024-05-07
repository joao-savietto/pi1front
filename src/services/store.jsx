import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import profileSlice from './slices/profileSlice'; // Assuming you have a profileSlice file

const rootReducer = combineReducers({
    auth: authSlice,
    profile: profileSlice, // Register the profileSlice in the store
});

export const store = configureStore({
    reducer: rootReducer,
});

export default store;