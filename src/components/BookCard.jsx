import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function BookCard({ book }) {
  const {
    volumeInfo: {
      title = 'No title',
      authors = ['Unknown author'],
      categories = ['Unknown category'],
      imageLinks = { thumbnail: 'No image' },
    },
    id,
  } = book;

  return (
    <Card style={{ width: '18rem' }} className="h-100">
      <Card.Img variant="top" src={imageLinks.thumbnail} alt={title} style={{ height: '70%', width: '100%' }} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{categories[0]}</Card.Subtitle>
        <Card.Text>
          Authors:
          {' '}
          {authors.join(', ')}
        </Card.Text>
        <Link to={`/book/${id}`}>Подробнее</Link>
      </Card.Body>
    </Card>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    volumeInfo: PropTypes.shape({
      title: PropTypes.string,
      authors: PropTypes.arrayOf(PropTypes.string),
      categories: PropTypes.arrayOf(PropTypes.string),
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string,
      }),
    }),
    id: PropTypes.string,
  }),
};

BookCard.defaultProps = {
  book: null,
};

export default BookCard;
