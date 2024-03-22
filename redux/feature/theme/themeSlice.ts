import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  value: string;
}

const initialState: ThemeState = {
  value: "light",
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setLight: (state) => {
      state.value = "light";
    },
    setDark: (state) => {
      state.value = "dark";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLight, setDark } = ThemeSlice.actions;

export default ThemeSlice.reducer;
