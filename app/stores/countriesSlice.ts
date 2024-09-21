import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './countreisStore'

export const CountryFromSlice = createSlice({
  name: 'countryFrom',
  initialState: {
    value: ''
  },
  reducers: {
    set: (state,action) => {
      state.value = action.payload
    },
    remove: state => {
      state.value = ''
    }
  }
})


export const CountryToSlice = createSlice({
    name: 'countryTo',
    initialState: {
      value: ''
    },
    reducers: {
      set: (state,action) => {
        state.value = action.payload
      },
      remove: state => {
        state.value = ''
      }
    }
  })
  


export const { set:setFrom, remove:removeFrom } = CountryFromSlice.actions
export const { set:setTo, remove:removeTo } = CountryToSlice.actions

export const selectCountryFrom = (state: RootState) => state.countryFrom
export const selectCountryTo = (state: RootState) => state.countryTo
export const CountryFromReducer = CountryFromSlice.reducer 
export const CountryToReducer = CountryToSlice.reducer 