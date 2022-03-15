import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'categories',
  initialState: [
    { id: 1, title: 'Daily tasks' },
  ],
  reducers: {
    addCategory: (state, action) => {
      const category = {
        id: state.length + 1,
        title: action.payload.title,
      };
      state.push(category);
      console.log('category has been added', state);
    },
    //updateCategory
    updateCategory: (state, action) => {
      const index = state.findIndex((category) => category.id === action.payload.id);
      state[index].title = action.payload.title;
      console.log('category has been updated', state);
    },
    //deleteCategory
    deleteCategory: (state, action) => {
      return state.filter((category) => category.id !== action.payload.id);
    },
  },
});

export const { addCategory, selectCategory, updateCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;