import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    totalCourses: 0,
  },
  reducers: {
    setTotalCourses: (state, action) => {
      state.totalCourses = action.payload;
    },
  },
});

export const { setTotalCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
