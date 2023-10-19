/* eslint-disable no-unused-vars */
import Card from './Card'

function SearchResults ({ books, onLoadMore, countBooks, startIndex }) {
  return (
    <div className="search-results">
      { countBooks > startIndex + 30
        ? <button onClick={onLoadMore}>Load more</button>
        : null
      }
      { books.map((book) => (<Card key={book.id} book={book} />)) }
    </div>
  )
}

export default SearchResults
