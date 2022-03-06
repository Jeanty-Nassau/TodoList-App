import { createSlice } from "@reduxjs/toolkit";


export const todoSlice = createSlice({
  name: 'todos',
  initialState: [
    { id: 1, title: 'Wash the car', category: 'Daily tasks', completed: true },
    { id: 2, title: 'Wash the house', category: 'Daily tasks', completed: false },
    { id: 3, title: 'drive the car', category: 'Daily tasks', completed: false },
    { id: 4, title: 'build the car', category: 'Daily tasks', completed: false },
    { id: 5, title: 'Wash the dishes and dry it off', category: 'Daily tasks', completed: false }
  ],
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: state.length + 1,
        title: action.payload.title,
        category: action.payload.category,
        completed: false,
      };
      state.push(todo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    }
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;