import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface salariesInputsState {
  location: string;
  jobTitle: string;
  radius: string;
}

// Define the initial state using that type
const initialState: salariesInputsState = {
  location: "",
  jobTitle: "",
  radius: "",
};

export const salariesInputsSlice = createSlice({
  name: "salariesInputs",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setJobTitle: (state, action: PayloadAction<string>) => {
      state.jobTitle = action.payload;
    },
    setRadius: (state, action: PayloadAction<string>) => {
      state.radius = action.payload;
    },
  },
});

export const { setLocation, setJobTitle, setRadius } =
  salariesInputsSlice.actions;

export default salariesInputsSlice.reducer;
