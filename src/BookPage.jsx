import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const bookPageStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  borderRadius: '5px',
};

const BookPage = ({ match }) => {
  // Получите параметр `id` из URL
  const bookId = match.params.id

  const dispatch = useDispatch()
  const books = useSelector((state) => state.search.books)
  const book = books.find((book) => book.id === bookId)

  if (!book) {
    return (
      <>
        <div>Book not found</div>
        <Link to="/">Back to Search Results</Link>
      </>
    );
  }

  return (
    <div style={bookPageStyle}>
      <img src={book.volumeInfo.imageLinks.thumbnail} alt="Обложка" />
      <h1>{book.volumeInfo.title}</h1>
      <p>Автор: {book.volumeInfo.authors.join(', ')}</p>
      <p>Категории: {book.volumeInfo.categories.join(', ')}</p>
      <p>Описание: {book.volumeInfo.description}</p>
      <p>Количество страниц: {book.volumeInfo.pageCount}</p>
      <p>Язык: {book.volumeInfo.language}</p>
      <p>Дата публикации: {book.volumeInfo.publishedDate}</p>
      <p>Издатель: {book.volumeInfo.publisher}</p>

      <Link to="/">Back to Search Results</Link>
    </div>
  )
}

BookPage.propTypes = {
  match: PropTypes.object
}

export default BookPage
