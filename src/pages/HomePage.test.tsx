import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useGetPopularMoviesQuery } from '../api/omdbApi'
import { HomePage } from './HomePage'

jest.mock('../api/omdbApi', () => ({
  useGetPopularMoviesQuery: jest.fn(),
}))

const mockUseGetPopularMoviesQuery = useGetPopularMoviesQuery as jest.Mock

describe('HomePage', () => {
  test('отображает популярные фильмы', () => {
    mockUseGetPopularMoviesQuery.mockReturnValue({
      currentData: [
        {
          Title: 'Inception',
          Year: '2010',
          imdbID: 'tt1375666',
          Type: 'movie',
          Poster: 'inception.jpg',
        },
      ],
      isFetching: false,
      totalResults: '10',
    })

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    expect(screen.getByText(/Популярные фильмы/i)).toBeInTheDocument()
    expect(screen.getByText(/Inception/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ещё/i })).toBeInTheDocument()
  })

  test('показывает индикатор загрузки при isFetching: true', () => {
    mockUseGetPopularMoviesQuery.mockReturnValue({
      currentData: [
        {
          Title: 'Interstellar',
          Year: '2014',
          imdbID: 'tt0816692',
          Type: 'movie',
          Poster: 'interstellar.jpg',
        },
      ],
      isFetching: true,
      totalResults: '10',
    })

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    expect(screen.getByText(/Загрузка/i)).toBeInTheDocument()
  })
})
