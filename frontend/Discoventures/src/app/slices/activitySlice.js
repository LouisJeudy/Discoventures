import { createSlice } from "@reduxjs/toolkit";

export const activitySlice = createSlice({
    name: 'activity',
    initialState: {
        type: null,
    },
    reducers: {
        setType: (state, action) => {
            state.type = action.payload;
        },
    },
})

export const { setType } = activitySlice.actions

export default activitySlice.reducer