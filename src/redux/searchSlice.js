/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// 3. Определите начальное состояние
const initialState = {
  books: [], // Массив с книгами
  startIndex: 0, // Текущий индекс загрузки
  isLoading: false, // Состояние для отслеживания загрузки
  // Другие поля состояния, которые вам могут потребоваться
};

// 4. Создайте срез
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addBooks: (state, action) => {
      // Обработка действия добавления книг
      state.books = state.books.concat(action.payload);
    },
    updateStartIndex: (state, action) => {
      // Обработка действия обновления индекса
      state.startIndex = action.payload;
    },
    clearBooks: (state) => {
      state.books = [];
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload; // Установка состояния загрузки
    },
    // Другие действия, если необходимо
  },
});

// 5. Экспортируйте действия (actions)
export const {
  addBooks,
  updateStartIndex,
  clearBooks,
  setIsLoading,
} = searchSlice.actions;

// 6. Экспортируйте редуктор (reducer)
export default searchSlice.reducer;
