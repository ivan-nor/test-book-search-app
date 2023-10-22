import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './your-redux-store'; // Импортируйте ваш Redux store
import App from './App';

describe('API requests', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterAll(() => {
    mock.restore();
  });

  it('performs a search request with the correct parameters', async () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const searchButton = getByRole('button', { name: 'Search' });

    fireEvent.click(searchButton);

    const expectedApiUrl = 'https://www.googleapis.com/books/v1/volumes?q=&orderBy=relevance&key=YOUR_API_KEY&startIndex=0&maxResults=30&printType=books&filter=ebooks';

    await waitFor(() => {
      expect(mock.history.get[0].url).toBe(expectedApiUrl);
    });
  });

  it('handles a successful API response correctly', async () => {
    const responseData = {
      totalItems: 10,
      items: [{ /* your book data here */ }],
    };

    mock.onGet().reply(200, responseData);

    const { getByText, getByRole } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const searchButton = getByRole('button', { name: 'Search' });

    fireEvent.click(searchButton);

    await waitFor(() => {
      // Ensure that the Redux state is updated correctly
      const state = store.getState();
      expect(state.search.books).toEqual(responseData.items);
      expect(state.search.countBooks).toEqual(responseData.totalItems);

      // Ensure that the data is displayed on the page
      expect(getByText('Found: 10 books, displayed: 1')).toBeInTheDocument();
    });
  });

  it('handles an error response from the API', async () => {
    mock.onGet().reply(500, 'Server Error');

    const { getByText, getByRole } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const searchButton = getByRole('button', { name: 'Search' });

    fireEvent.click(searchButton);

    await waitFor(() => {
      // Ensure that the error message is displayed on the page
      expect(getByText('Error: Server Error')).toBeInTheDocument();
    });
  });
});
