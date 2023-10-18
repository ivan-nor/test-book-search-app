import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css' // Подключаем стили вашего приложения
import SearchForm from './SearchForm'

const API_KEY = 'AIzaSyBeJ3IhXXpm4pOFzxclMwqj0PS7n_ZSHdg'
const API_URL = 'https://www.googleapis.com/books/v1/volumes'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortingParam, setSortingParam] = useState('relevance')
  const [books, setBooks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const performSearch = (query, category) => {
    // Параметры запроса
    const params = {
      q: query, // Поисковый запрос
      key: API_KEY, // Ваш ключ API,
      subject: category, // Категория (ваш выбор)
      orderBy: sortingParam
    }

    // Выполняем GET-запрос к Google Books API
    axios.get(API_URL, { params })
      .then(response => {
        const booksData = response.data.items // Полученные данные о книгах
        // Обработка данных, например, обновление состояния books
        setBooks(booksData)
        console.log(booksData)
      })
      .catch(error => {
        console.error('Ошибка при выполнении запроса к Google Books API', error)
        // Обработка ошибки
      })
  }

  // useEffect(() => {
  //   // Выполнить загрузку книг при монтировании компонента
  //   performSearch(searchQuery, selectedCategory, sortingParam)
  // }, [searchQuery, selectedCategory, currentPage])

  // useEffect(() => {
  //   console.log('BOOKSUPDATE', books)
  // }, [books])

  return (
    <div className="App">
      <header className="App-header">
        {/* Ваш заголовок или компоненты заголовка здесь */}
      </header>
      <main className="App-main">
        <SearchForm onSearch={performSearch} /> {/* Передаем функцию поиска в SearchForm */}
        <div className="book-list">
          {/* Компонент для отображения найденных книг в виде карточек */}
          {/* Компонент кнопки "Load more" для пагинации */}
          { books.length ? `Найдено: ${books.length} книг(а)` : null }
        </div>
      </main>
    </div>
  )
}

export default App
