import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {AdjecentReducer, CountryFromReducer,CountryToReducer} from './countriesSlice'
const rootReducer = combineReducers({
    countryFrom: CountryFromReducer,
    countryTo: CountryToReducer,
    adjecent: AdjecentReducer
  })

export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
      })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']