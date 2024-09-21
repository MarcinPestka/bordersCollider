import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './countreisStore'
import { Color } from '../services/mapAlgorythms';

export const CountryFromSlice = createSlice({
  name: 'countryFrom',
  initialState: {
    value: 'Spain'
  },
  reducers: {
    setFrom: (state,action) => {
      state.value = action.payload
    },
    removeFrom: state => {
      state.value = ''
    }
  }
})


export const CountryToSlice = createSlice({
    name: 'countryTo',
    initialState: {
      value: 'Canada'
    },
    reducers: {
      setTo: (state,action) => {
        state.value = action.payload
      },
      removeTo: state => {
        state.value = ''
      }
    }
  })
  
export interface IssueInitialState {
  value: Color[]
}
const initialState: IssueInitialState = {
  value: []
}

export const AdjecentSlice = createSlice({
  name: 'adjecent',
  initialState:initialState,
  reducers: {
    setAdjecent: (state,action) => {
      state.value = action.payload
    },
    reset: state => {
      state.value = []
    }
  }
})


export const { setFrom, removeFrom } = CountryFromSlice.actions
export const { setTo, removeTo } = CountryToSlice.actions
export const { setAdjecent, reset } = AdjecentSlice.actions

export const selectCountryFrom = (state: RootState) => state.countryFrom
export const selectCountryTo = (state: RootState) => state.countryTo
export const selectAdjecent = (state: RootState) => state.adjecent
export const CountryFromReducer = CountryFromSlice.reducer 
export const CountryToReducer = CountryToSlice.reducer 
export const AdjecentReducer = AdjecentSlice.reducer 