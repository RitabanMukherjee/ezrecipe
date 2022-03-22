import { createSlice } from "@reduxjs/toolkit";

export const inputTextSlice = createSlice({
    name: 'inputText',
    initialState: {
        value: 'chicken'
    },
    reducers: {
        changeInputText: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {changeInputText} = inputTextSlice.actions

export default inputTextSlice.reducer