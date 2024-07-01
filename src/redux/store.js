import { configureStore } from '@reduxjs/toolkit';
import gymReducer from './slices/gymSlice';

const store = configureStore({
  reducer: {
    gym: gymReducer,
  },
});

export default store;
