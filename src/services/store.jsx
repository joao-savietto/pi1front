import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import profileSlice from './slices/profileSlice'; // Assuming you have a profileSlice file
import occurrenceSlice from './slices/occurrenceSlice'; // Import and register occurrenceSlice here
import classroomSlice from './slices/classroomSlice'; // Added the selectedClassroom slice import
import studentSlice from './slices/studentSlice'; // Added the import and registration for studentSlice

const rootReducer = combineReducers({
    auth: authSlice,
    profile: profileSlice, // Register the profileSlice in the store
    selectedClassroom: classroomSlice, // Added the slice registration for selectedClassroom
    student: studentSlice, // Added the registration of the studentSlice
    occurrence: occurrenceSlice, // Import and register occurrenceSlice here
});

export const store = configureStore({
    reducer: rootReducer,
});

export default store;