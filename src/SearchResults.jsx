import Card from './Card'

function SearchResults ({ books, loadMore, countBooks, startIndex }) {
  console.log('Search results', books, loadMore, countBooks, startIndex)

  return (
    <div className="search-results">
      { countBooks > startIndex + 30
        ? <button onClick={loadMore}>Load more</button>
        : null
      }
      { books.map((book) => (<Card key={book.id} book={book} />)) }
    </div>
  )
}

export default SearchResults
