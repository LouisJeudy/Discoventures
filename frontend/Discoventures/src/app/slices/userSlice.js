import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: null,
        username:null,
        token: null
    },
    reducers: {
        userEmail: (state, action) => {
            state.email = action.payload;
        },
        username: (state, action) => {
            state.username = action.payload;
        },
        userToken: (state, action) => {
            state.token = action.payload;
        },
    },
})

export const { userEmail, username, userToken } = userSlice.actions

export default userSlice.reducer