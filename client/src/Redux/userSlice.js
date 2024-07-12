import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser : null,
    pending : false,
    error : false
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        fetchUserStart : (state) => {
            state.pending = true
        } ,
        fetchUserSuccess : (state,action) => {
            state.pending = false,
            state.currentUser = action.payload
        },
        fetchUserFailure : (state) => {
            state.error = true
        }
    }
})

export const {fetchUserStart,fetchUserFailure,fetchUserSuccess} = userSlice.actions;
export default userSlice.reducer