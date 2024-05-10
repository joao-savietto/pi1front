import { createSlice } from "@reduxjs/toolkit";

export const selectedClassroomSlice = createSlice({
  name: 'selectedClassroom',
  initialState: {
    value: localStorage.getItem('selectedClassroom') ? JSON.parse(localStorage.getItem('selectedClassroom')) : null,
  },
  reducers: {
    setSelectedClassroom(state, action) {
      state.value = action.payload;
      localStorage.setItem('selectedClassroom', JSON.stringify(action.payload))
    },
    clearSelectedClassroom(state) {
      state.value = null;
      localStorage.removeItem('selectedClassroom');
    }
  },
});

export const { setSelectedClassroom } = selectedClassroomSlice.actions;
export default selectedClassroomSlice.reducer;
