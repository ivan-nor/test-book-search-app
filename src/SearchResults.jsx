/* eslint-disable no-unused-vars */
import BookCard from './BookCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { CardDeck } from 'react-bootstrap'

function SearchResults ({ books }) {
  console.log('render Search RESULT', books)
  return (
    <Row className="h-100">
        {books.map((book) => (
          <Col key={book.etag} xs={12} sm={6} md={4} lg={3} className="p-3">
            <BookCard book={book} />
          </Col>
        ))}
    </Row>
  )
}

export default SearchResults
