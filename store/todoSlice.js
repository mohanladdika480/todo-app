import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    updateTodoStatus: (state, action) => {
      const { id, status } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.status = status;
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodoStatus } = todoSlice.actions;
export default todoSlice.reducer;