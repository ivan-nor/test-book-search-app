import { useState } from 'react'

const SearchForm = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortingParam, setSortingParam] = useState('relevance')

  const handleSearch = () => {
    // Вызов функции onSearch с введенным запросом и выбранной категорией
    onSearch(searchQuery, selectedCategory, sortingParam)
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
        <option value="all">all</option>
        <option value="art">art</option>
        <option value="biography">biography</option>
        <option value="computers">computers</option>
        <option value="history">history</option>
        <option value="medical">medical</option>
        <option value="all">poetry</option>
        {/* Добавьте другие опции для категорий */}
      </select>
      <select
        value={sortingParam}
        onChange={(e) => setSortingParam(e.target.value)}
      >
        <option value="relevance">relevance</option>
        <option value="newest">newest</option>
      </select>
      <button onClick={handleSearch}>Поиск</button>
    </div>
  )
}

export default SearchForm
