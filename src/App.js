/* eslint-disable no-console */
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; // Импортируем необходимые компоненты из react-router-dom
import BookPage from './BookPage'
import { addBooks, updateStartIndex, clearBooks, setIsLoading } from './searchSlice'
import { API_KEY, API_URL, MAX_RESULTS, PAGINATION_STEP } from './config'
import './App.css'
import SearchForm from './SearchForm'
import LoadingSpinner from './LoadingSpinner'
import SearchResults from './SearchResults'

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
      key: API_KEY,
      startIndex,
      maxResults: MAX_RESULTS,
      printType: 'books',
      filter: 'ebooks'
    }
    const searchParams = new URLSearchParams(params)
    console.log(searchParams.toString(), params)

    axios.get(API_URL, { params })
      .then((response) => {
        console.log('RESPONSE DATA', response)
        const booksData = response.data.items
        if (response.data.totalItems > 0) {
          setCountBooks(response.data.totalItems)
          setQuery(query)
          dispatch(addBooks(booksData))
        }
      })
      .catch((error) => {
        console.error('Ошибка при выполнении запроса к Google Books API', error)
      })
      .finally(() => {
        dispatch(setIsLoading(false))
      })
  }

  const handleSearch = (newQuery, newCategory, newSortingParam) => {
    const newStartIndex = 0
    setQuery(newQuery)
    setCategory(newCategory)
    setSortingParam(newSortingParam)
    performSearch(newQuery, newCategory, newSortingParam, newStartIndex)
    console.log('handle Search', newQuery, newCategory, newSortingParam, books)
    dispatch(updateStartIndex(newStartIndex))
    dispatch(clearBooks())
  }

  const memoizedLoadMoreBooks = useCallback(() => {
    console.log('memo load book', isLoading)
    const newStartIndex = startIndex + PAGINATION_STEP
    dispatch(updateStartIndex(newStartIndex))
    performSearch(query, category, sortingParam, newStartIndex)
  }, [startIndex, PAGINATION_STEP, query, category, sortingParam])

  const memoizedSearchResults = useMemo(() => {
    return (
      <SearchResults books={books} countBooks={countBooks} startIndex={startIndex} isLoading={isLoading} />
    )},
    [books, countBooks, startIndex]
  )

  return (
    <div className="App">
      <div className="App-header">
        <SearchForm onSearch={handleSearch} />
      </div>
      <div className="App-main">
        <Router>
        <Switch>
            <Route exact path="/">
              <SearchResults
                books={books}
                countBooks={countBooks}
                startIndex={startIndex}
                isLoading={isLoading}
                memoizedLoadMoreBooks={memoizedLoadMoreBooks}
              />
            </Route>
            <Route path="/book/:id" component={BookPage} />
          </Switch>
        </Router>
      </div>
    </div>
  )
}

export default App
