import { createSlice } from "@reduxjs/toolkit";

export const selectedStudentSlice = createSlice({
  name: 'selectedStudent',
  initialState: {
    value: localStorage.getItem('selectedStudent') ? JSON.parse(localStorage.getItem('selectedStudent')) : null,
  },
  reducers: {
    setSelectedStudent(state, action) {
      state.value = action.payload;
      localStorage.setItem('selectedStudent', JSON.stringify(action.payload))
    },
    clearSelectedStudent(state) {
      state.value = null;
      localStorage.removeItem('selectedStudent');
    }
  },
});

export const { setSelectedStudent } = selectedStudentSlice.actions;
export default selectedStudentSlice.reducer;
