import { createSlice } from '@reduxjs/toolkit'

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



export const { set, remove } = CountryFromSlice.actions

export default CountryFromSlice.reducer