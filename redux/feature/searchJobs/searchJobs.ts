import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface searchJobsState {
  searchQuery: string;
  employmentType: string;
}

// Define the initial state using that type
const initialState: searchJobsState = {
  searchQuery: "",
  employmentType: "",
};

export const searchJobsSlice = createSlice({
  name: "searchJobs",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setEmploymentType: (state, action: PayloadAction<string>) => {
      state.employmentType = action.payload;
    },
  },
});

export const { setSearchQuery, setEmploymentType } = searchJobsSlice.actions;

export default searchJobsSlice.reducer;
