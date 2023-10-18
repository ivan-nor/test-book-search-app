/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import SearchForm from './SearchForm'
import Card from './Card'
import SearchResults from './SearchResults'

const API_KEY = 'AIzaSyBeJ3IhXXpm4pOFzxclMwqj0PS7n_ZSHdg'
const API_URL = 'https://www.googleapis.com/books/v1/volumes'

function App () {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortingParam, setSortingParam] = useState('relevance')
  const [books, setBooks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [step, setStep] = useState(30)
  const [startIndex, setStartIndex] = useState(0)
  const [countBooks, setCountBooks] = useState(0)

  const getCategory = (category) => (category === 'all') ? '' : `+subject:${category}`

  const performSearch = (query, category, sortingParam) => { // ВЫДЕЛИТЬ В ОТДЕЛЬНЫЙ КОМПОНЕНТ ОТРИСОВКУ РЕЗУЛЬАТТОВ И КНОПКУ ПАГИНАЦИИ
    const params = {
      q: `${query}${getCategory(category)}`,
      orderBy: sortingParam,
      key: API_KEY, // Ваш ключ API,
      startIndex,
      maxResults: step
    }
    const searchParams = new URLSearchParams(params)
    console.log(searchParams.toString(), params)

    // Выполняем GET-запрос к Google Books API
    axios.get(API_URL, { params })
      .then(response => {
        const booksData = response.data.items // Полученные данные о книгах
        setCountBooks(response.data.totalItems)
        setBooks([...books, ...booksData])
        console.log(response.data.totalItems)
      })
      .catch(error => {
        console.error('Ошибка при выполнении запроса к Google Books API', error)
        // Обработка ошибки
      })
  }

  // useEffect(() => {}, [books])

  const loadMore = () => {
    console.log('load more')
    setStartIndex(startIndex + step)
    performSearch()
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* Ваш заголовок или компоненты заголовка здесь */}
      </header>
      <main className="App-main">
        <SearchForm onSearch={performSearch} /> {/* Передаем функцию поиска в SearchForm */}
        <div className="book-list">
          { books.length ? `Найдено: ${countBooks} книг(а)` : null }
          <SearchResults books={books} loadMore={loadMore} countBooks={countBooks} startIndex={startIndex} />
        </div>
      </main>
    </div>
  )
}

export default App
