import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'categories',
  initialState: [
    { title: 'Daily tasks' },
  ],
  reducers: {
    addCategory: (state, action) => {
      const category = {
        title: action.payload.title,
      };
      state.push(category);
    },
    selectCategory: (state, action) => {
      const index = state.findIndex((category) => category.title === action.payload.title);
      state[index].selectedCategory = action.payload.selectedCategory;
    },
    //updateCategory
    updateCategory: (state, action) => {
      const index = state.findIndex((category) => category.title === action.payload.title);
      state[index] = action.payload.title;
    },
    //deleteCategory
    deleteCategory: (state, action) => {
      return state.filter((category) => category !== action.payload.title);
    },
  },
});

export const { addCategory, selectCategory, updateCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;