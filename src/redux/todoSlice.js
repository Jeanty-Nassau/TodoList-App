import { createSlice } from "@reduxjs/toolkit";


export const todoSlice = createSlice({
  name: 'todos',
  initialState: [
    { id: 1, title: 'Wash the car', category: '1', completed: true },
    { id: 2, title: 'Wash the house', category: '1', completed: false },
    { id: 3, title: 'drive the car', category: '1', completed: false },
    { id: 4, title: 'build the car', category: '1', completed: false },
    { id: 5, title: 'Wash the dishes and dry it off', category: '1', completed: false }
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
      console.log('todo has been added');
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    //updateTodoTitle
    updateTodoTitle: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].title = action.payload.title; 
      console.log('todo title has been updated');
    }
  },
});

export const { addTodo, toggleComplete, deleteTodo, updateTodoTitle } = todoSlice.actions;

export default todoSlice.reducer;