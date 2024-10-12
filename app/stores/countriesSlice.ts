import { createSlice } from "@reduxjs/toolkit";
import { Color } from "../services/mapAlgorithms";
import { RootState } from "./countriesStore";

export const CountryFromSlice = createSlice({
  name: "countryFrom",
  initialState: {
    value: "Spain",
  },
  reducers: {
    setFrom: (state, action) => {
      state.value = action.payload;
    },
    removeFrom: (state) => {
      state.value = "";
    },
  },
});

export const CountryToSlice = createSlice({
  name: "countryTo",
  initialState: {
    value: "Canada",
  },
  reducers: {
    setTo: (state, action) => {
      state.value = action.payload;
    },
    removeTo: (state) => {
      state.value = "";
    },
  },
});

export interface IssueInitialState {
  value: Color[];
}
const initialState: IssueInitialState = {
  value: [],
};

export const AdjacentSlice = createSlice({
  name: "adjacent",
  initialState: initialState,
  reducers: {
    setAdjacent: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = [];
    },
  },
});

export const { setFrom, removeFrom } = CountryFromSlice.actions;
export const { setTo, removeTo } = CountryToSlice.actions;
export const { setAdjacent, reset } = AdjacentSlice.actions;

export const selectCountryFrom = (state: RootState) => state.countryFrom;
export const selectCountryTo = (state: RootState) => state.countryTo;
export const selectAdjacent = (state: RootState) => state.adjacent;
export const CountryFromReducer = CountryFromSlice.reducer;
export const CountryToReducer = CountryToSlice.reducer;
export const AdjacentReducer = AdjacentSlice.reducer;
