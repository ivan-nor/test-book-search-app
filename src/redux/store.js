// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Создайте этот файл для корневого редюсера

const store = configureStore({
  reducer: rootReducer,
});

export default store;
