const Card = ({ book }) => {
  return (
    <div>
      { book.volumeInfo.title } | { book.volumeInfo.categories }
    </div>
  )
}
export default Card
