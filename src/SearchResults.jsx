/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import BookCard from './BookCard';
import LoadingSpinner from './LoadingSpinner';

function SearchResults({ books, isLoading, startIndex, countBooks, memoizedLoadMoreBooks }) {
  console.log('render Search RESULT', books);
  return (
    <div className="book-list m-3">
      {books.length ? `Найдено: ${countBooks} книг(а), отрисовано: ${books.length}` : null}
      <Row className="h-100">
        {books.map((book) => (
          <Col key={book.etag} xs={12} sm={6} md={4} lg={3} className="p-3">
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
      {!isLoading && (countBooks > startIndex + 30)
        ? <Button onClick={memoizedLoadMoreBooks} disabled={isLoading}>Load more</Button>
        : null
      }
      {isLoading && <LoadingSpinner/>}
    </div>
  );
}

export default SearchResults;
