import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        email: null,
        username:null,
        token: null,
        isAdmin: null
    },
    reducers: {
        setUserId: (state, action) => {
            state.id = action.payload;
        },
        setUserEmail: (state, action) => {
            state.email = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setUserToken: (state, action) => {
            state.token = action.payload;
        },
        setIsAdmin:(state, action) => {
            state.isAdmin = action.payload
        }
    },
})

export const { setUserEmail, setUsername, setUserToken, setIsAdmin, setUserId} = userSlice.actions

export default userSlice.reducer