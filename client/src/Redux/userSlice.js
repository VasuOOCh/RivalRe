import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser : null,
    pending : false,
    error : false,
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
        },
        followUser : (state,action) => {
            if(!state.currentUser.following.includes(action.payload)) {
                state.currentUser.following.push(action.payload)
            }
        },
        unfollowUser : (state,action) => {

            if(state.currentUser.following.includes(action.payload)) {
                state.currentUser.following.splice(state.currentUser.following.findIndex((id) => id === action.payload), 1)
            }
        }
        
        
    }
})

export const {fetchUserStart,fetchUserFailure,fetchUserSuccess, followUser,unfollowUser} = userSlice.actions;
export default userSlice.reducer