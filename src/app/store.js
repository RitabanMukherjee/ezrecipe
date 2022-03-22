import { configureStore } from '@reduxjs/toolkit';
import recipeCounterReducer from '../features/recipeCounterSlice';
import loadingTrackerReducer from '../features/loadingTrackerSlice';
import inputTextReducer from '../features/inputTextSlice';
import recipeReducer from '../features/recipeSlice';

export const store = configureStore({
  reducer: {
      recipeCounter: recipeCounterReducer,
      loadingTracker: loadingTrackerReducer,
      inputText: inputTextReducer,
      recipe: recipeReducer
  },
});
