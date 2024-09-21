import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './generalSlice'

export default configureStore({
  reducer: {
    countryFrom: counterReducer
  }
})