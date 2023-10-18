function Card ({ book }) {
  const { volumeInfo } = book
  const { categories, authors } = volumeInfo

  // Получаем первую категорию (если она есть)
  const category = (categories && categories.length) ? `Category: ${categories[0]}` : null

  // Получаем всех авторов (если они есть)
  const authorList = authors ? `Authors: ${authors.join(', ')}` : null

  return (
    <div className="book-card">
      <img src={volumeInfo.imageLinks?.thumbnail || 'No Image Available'} alt={volumeInfo.title} />
      <h3>{volumeInfo.title || 'No Title Available'}</h3>
      <p>{category}</p>
      <p>{authorList}</p>
    </div>
  )
}

export default Card
