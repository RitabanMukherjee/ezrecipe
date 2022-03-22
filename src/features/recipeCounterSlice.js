import {createSlice} from '@reduxjs/toolkit'

export const recipeCounterSlice = createSlice({
    name: 'recipeCounter',
    initialState: {
        value: [{idMeal: '', strMeal: '', strCategory: '', strArea: '', strMealThumb: ''}]
    },
    reducers: {
        updateCounter: (state, action) => {
            state.value.push(action.payload);
        }
    }
})

export const {updateCounter} = recipeCounterSlice.actions

export default recipeCounterSlice.reducer