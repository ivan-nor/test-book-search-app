/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import SearchForm from './SearchForm'
import Card from './Card'

const API_KEY = 'AIzaSyBeJ3IhXXpm4pOFzxclMwqj0PS7n_ZSHdg'
const API_URL = 'https://www.googleapis.com/books/v1/volumes'

function App () {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortingParam, setSortingParam] = useState('relevance')
  const [books, setBooks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const getCategory = (category) => (category === 'all') ? '' : `+subject:${category}`

  const performSearch = (query, category, sortingParam) => { // ВЫДЕЛИТЬ В ОТДЕЛЬНЫЙ КОМПОНЕНТ ОТРИСОВКУ РЕЗУЛЬАТТОВ И КНОПКУ ПАГИНАЦИИ
    // Параметры запроса
    const params = {
      q: `${query}${getCategory(category)}`,
      orderBy: sortingParam,
      key: API_KEY, // Ваш ключ API,
      startIndex: 0,
      maxResults: 30
    }
    const searchParams = new URLSearchParams(params)
    console.log(params, searchParams.toString())
    // Выполняем GET-запрос к Google Books API
    axios.get(API_URL, { params })
      .then(response => {
        const booksData = response.data.items // Полученные данные о книгах
        // Обработка данных, например, обновление состояния books
        setBooks(booksData)
        console.log(response.data)
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
          <div className="search-results">
            {books.map((book) => (
              <Card key={book.etag} book={book} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
