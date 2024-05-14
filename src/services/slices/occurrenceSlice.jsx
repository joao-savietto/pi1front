import { createSlice } from "@reduxjs/toolkit";

export const occurrenceSlice = createSlice({
  name: 'occurrence',
  initialState: {
    value: localStorage.getItem('selectedOccurrence') ? JSON.parse(localStorage.getItem('selectedOccurrence')) : null,
  },
  reducers: {
    setSelectedOccurrence(state, action) {
      state.value = action.payload;
      localStorage.setItem('selectedOccurrence', JSON.stringify(action.payload))
    },
    clearSelectedOccurrence(state) {
      state.value = null;
      localStorage.removeItem('selectedOccurrence');
    }
  },
});

export const { setSelectedOccurrence } = occurrenceSlice.actions;
export default occurrenceSlice.reducer;
