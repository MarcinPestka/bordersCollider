import { createSlice } from "@reduxjs/toolkit";
import { AlgoStep } from "../services/mapAlgorithms";
import { RootState } from "./countriesStore";

export const CountryFromSlice = createSlice({
  name: "countryFrom",
  initialState: {
    value: "Poland",
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
    value: "France",
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
  value: AlgoStep[];
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
    popRoute: (state) => {
      state.value = [...state.value.slice(0, -1)];
    },
    appendRoute: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    reset: (state) => {
      state.value = [];
    },
  },
});

export const VisitedSlice = createSlice({
  name: "routes",
  initialState: initialState,
  reducers: {
    appendVisited: (state, action) => {
      console.log(action.payload);
      state.value = [...state.value, ...action.payload];
    },
    resetVisited: (state) => {
      state.value = [];
    },
  },
});

export const { setFrom, removeFrom } = CountryFromSlice.actions;
export const { setTo, removeTo } = CountryToSlice.actions;
export const { setAdjacent, appendRoute, reset, popRoute } =
  AdjacentSlice.actions;
export const { appendVisited, resetVisited } = VisitedSlice.actions;

export const selectCountryFrom = (state: RootState) => state.countryFrom;
export const selectCountryTo = (state: RootState) => state.countryTo;
export const selectAdjacent = (state: RootState) => state.adjacent;
export const selectVisited = (state: RootState) => state.visited;

export const CountryFromReducer = CountryFromSlice.reducer;
export const CountryToReducer = CountryToSlice.reducer;
export const AdjacentReducer = AdjacentSlice.reducer;
export const VisitedReducer = VisitedSlice.reducer;
