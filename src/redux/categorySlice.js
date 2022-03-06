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
    }
  },
});

export const { addCategory, selectCategory } = categorySlice.actions;
export default categorySlice.reducer;