import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './searchSlice' // Импортируйте ваш срез (reducer)

// Создайте Redux-хранилище
const store = configureStore({
  reducer: {
    search: searchReducer // Добавьте срез (reducer) в конфигурацию хранилища
    // Другие срезы могут быть добавлены здесь
  }
})

export default store
