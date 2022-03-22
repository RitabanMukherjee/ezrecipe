import { createSlice } from "@reduxjs/toolkit";

export const loadingTrackerSlice = createSlice({
    name: 'loadingTracker',
    initialState: {
        value: true
    },
    reducers: {
        changeLoadingStatus: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {changeLoadingStatus} = loadingTrackerSlice.actions

export default loadingTrackerSlice.reducer