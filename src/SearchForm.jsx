import { useState } from 'react'

const SearchForm = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleSearch = () => {
    // Вызов функции onSearch с введенным запросом и выбранной категорией
    onSearch(searchQuery, selectedCategory)
  }

  return (
    <div className="search-form">
      <input
        type="text"
        placeholder="Введите запрос"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="all">Все категории</option>
        {/* Добавьте другие опции для категорий */}
      </select>
      <button onClick={handleSearch}>Поиск</button>
    </div>
  )
}

export default SearchForm
