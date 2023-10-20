import { Card } from 'react-bootstrap'

function BookCard ({ book }) {
  const {
    volumeInfo: {
      title = 'No title',
      authors = ['Unknown author'],
      categories = ['Unknown category'],
      imageLinks = { thumbnail: 'No image' }
    }
  } = book

  return (
    <Card style={{ width: '18rem' }} className="h-100">
      <Card.Img variant="top" src={imageLinks.thumbnail} alt={title} style={{ height: '70%', width: '100%' }} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{categories[0]}</Card.Subtitle>
        <Card.Text>
          Authors: {authors.join(', ')}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default BookCard
