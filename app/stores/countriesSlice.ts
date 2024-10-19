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
    appendAdjacent: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    reset: (state) => {
      state.value = [];
    },
  },
});

export const RouteSlice = createSlice({
  name: "route",
  initialState: initialState,
  reducers: {
    appendRoute: (state, action) => {
      state.value = [...state.value, ...action.payload];
    },
    resetRoute: (state) => {
      state.value = [];
    },
  },
});

export const { setFrom, removeFrom } = CountryFromSlice.actions;
export const { setTo, removeTo } = CountryToSlice.actions;
export const { setAdjacent, appendAdjacent, reset, popRoute } =
  AdjacentSlice.actions;
export const { appendRoute, resetRoute } = RouteSlice.actions;

export const selectCountryFrom = (state: RootState) => state.countryFrom;
export const selectCountryTo = (state: RootState) => state.countryTo;
export const selectAdjacent = (state: RootState) => state.adjacent;
export const selectRoute = (state: RootState) => state.route;

export const CountryFromReducer = CountryFromSlice.reducer;
export const CountryToReducer = CountryToSlice.reducer;
export const AdjacentReducer = AdjacentSlice.reducer;
export const RouteReducer = RouteSlice.reducer;
