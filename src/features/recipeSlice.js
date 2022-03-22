import {createSlice} from '@reduxjs/toolkit'

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
        value: 0
    },
    reducers: {
        updateRecipe: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {updateRecipe} = recipeSlice.actions

export default recipeSlice.reducer