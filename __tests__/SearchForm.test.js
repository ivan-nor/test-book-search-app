import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../src/components/SearchForm';

test('renders SearchForm component', () => {
  const onSearch = jest.fn(); // Создаем mock-функцию для onSearch
  render(<SearchForm onSearch={onSearch} />);
  const queryInput = screen.getByPlaceholderText('Search for books...');
  expect(queryInput).toBeInTheDocument();
});

test('handles form submission with the correct data', () => {
  const onSearch = jest.fn(); // Создаем mock-функцию для onSearch
  render(<SearchForm onSearch={onSearch} />);
  const queryInput = screen.getByPlaceholderText('Search for books...');
  const categorySelect = screen.getByText('all');
  const sortingSelect = screen.getByText('relevance');
  const searchButton = screen.getByText('Search');

  fireEvent.change(queryInput, { target: { value: 'Test Query' } });
  fireEvent.change(categorySelect, { target: { value: 'art' } });
  fireEvent.change(sortingSelect, { target: { value: 'newest' } });
  fireEvent.click(searchButton);

  expect(onSearch).toHaveBeenCalledWith('Test Query', 'art', 'newest');
});

test('matches snapshot', () => {
  const onSearch = jest.fn(); // Создаем mock-функцию для onSearch
  const { asFragment } = render(<SearchForm onSearch={onSearch} />);
  expect(asFragment()).toMatchSnapshot();
});
