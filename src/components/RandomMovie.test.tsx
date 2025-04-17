import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useGetPopularMoviesQuery } from '../api/omdbApi'
import RandomMovie from '../components/RandomMovie'

jest.mock('../api/omdbApi', () => ({
  useGetPopularMoviesQuery: jest.fn(),
}))

const mockMovie = {
  Title: 'The Matrix',
  Year: '1999',
  imdbID: 'tt0133093',
  Type: 'movie',
  Poster: 'matrix.jpg',
}

test('RandomMovie отображает фильм дня', () => {
  ;(useGetPopularMoviesQuery as jest.Mock).mockReturnValue({
    data: { Search: [mockMovie] },
  })

  render(
    <MemoryRouter>
      <RandomMovie />
    </MemoryRouter>
  )

  expect(screen.getByText(/Фильм дня/i)).toBeInTheDocument()
  expect(screen.getByText(/The Matrix/i)).toBeInTheDocument()
})
