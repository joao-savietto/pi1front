import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import profileSlice from './slices/profileSlice'; // Assuming you have a profileSlice file
import classroomSlice from './slices/classroomSlice'; // Added the selectedClassroom slice import

const rootReducer = combineReducers({
    auth: authSlice,
    profile: profileSlice, // Register the profileSlice in the store
    selectedClassroom: classroomSlice, // Added the slice registration for selectedClassroom
});

export const store = configureStore({
    reducer: rootReducer,
});

export default store;