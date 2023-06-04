import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import activityReducer from '../slices/activitySlice'

export default configureStore({
  reducer: {
    user: userReducer,
    activity: activityReducer
  },
})