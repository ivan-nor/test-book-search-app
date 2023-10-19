/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import SearchForm from './SearchForm'
import Card from './Card'
import SearchResults from './SearchResults'
import { useDispatch, useSelector } from 'react-redux'
import { addBooks, updateStartIndex, clearBooks, setIsLoading } from './searchSlice'
import { API_KEY, API_URL, MAX_RESULTS, PAGINATION_STEP } from './config'

function App () {
  const [countBooks, setCountBooks] = useState(0)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sortingParam, setSortingParam] = useState('relevance')

  const dispatch = useDispatch()
  const books = useSelector((state) => state.search.books)
  const startIndex = useSelector((state) => state.search.startIndex)
  const isLoading = useSelector((state) => state.search.isLoading)

  useEffect(() => console.log('UseEffect -> books:', books), [books])

  const performSearch = (query, category, sortingParam, startIndex) => {
    dispatch(setIsLoading(true))

    const getCategory = (category) => (category === 'all') ? '' : `+subject:${category}`

    const params = {
      q: `${query}${getCategory(category)}`,
      orderBy: sortingParam,
      key: API_KEY, // Ваш ключ API,
      startIndex,
      maxResults: MAX_RESULTS,
      printType: 'books',
      filter: 'ebooks'
    }
    const searchParams = new URLSearchParams(params)
    console.log(searchParams.toString(), params)

    // Выполняем GET-запрос к Google Books API
    axios.get(API_URL, { params })
      .then((response) => {
        console.log(response.data)
        const booksData = response.data.items // Полученные данные о книгах
        setCountBooks(response.data.totalItems)
        setQuery(query)
        dispatch(addBooks(booksData))
      })
      .catch((error) => {
        console.error('Ошибка при выполнении запроса к Google Books API', error)
        // Обработка ошибки
      })
      .finally(() => {
        // Сбрасываем состояние загрузки в false после завершения запроса
        dispatch(setIsLoading(false))
      })
  }

  const handleSearch = (newQuery, newCategory, newSortingParam) => {
    const newStartIndex = 0
    setQuery(newQuery)
    setCategory(newCategory)
    setSortingParam(newSortingParam)
    dispatch(updateStartIndex(newStartIndex))
    dispatch(clearBooks()) // Очистка books
    console.log('handle Search', newQuery, newCategory, newSortingParam, books)

    performSearch(newQuery, newCategory, newSortingParam, newStartIndex)
  }

  const loadMoreBooks = () => {
    const newStartIndex = startIndex + PAGINATION_STEP
    dispatch(updateStartIndex(newStartIndex)) // Обновляем startIndex в хранилище
    performSearch(query, category, sortingParam, newStartIndex)
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* Ваш заголовок или компоненты заголовка здесь */}
      </header>
      <main className="App-main">
        <SearchForm onSearch={handleSearch} /> {/* Передаем функцию поиска в SearchForm */}
        <div className="book-list">
          { isLoading
            ? (<p>Loading...</p>)
            : (
                <>
                  {books.length ? `Найдено: ${countBooks} книг(а), отрисовано: ${books.length}` : null}
                  <SearchResults books={books} onLoadMore={loadMoreBooks} countBooks={countBooks} startIndex={startIndex} />
                </>
              )
          }
        </div>
      </main>
    </div>
  )
}

export default App
