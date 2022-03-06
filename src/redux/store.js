import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './categorySlice';
import todoReducer from './todoSlice';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    todos: todoReducer,
  }
});