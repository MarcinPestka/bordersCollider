import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  AdjacentReducer,
  CountryFromReducer,
  CountryToReducer,
  RouteReducer,
} from "./countriesSlice";
const rootReducer = combineReducers({
  countryFrom: CountryFromReducer,
  countryTo: CountryToReducer,
  adjacent: AdjacentReducer,
  route: RouteReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
