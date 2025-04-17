import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import MovieCard from './MovieCard'

const mockMovie = {
  Title: 'Inception',
  Year: '2010',
  imdbID: 'tt1375666',
  Type: 'movie',
  Poster: 'https://image.jpg',
}

test('рендерит информацию о фильме', () => {
  render(
    <BrowserRouter>
      <MovieCard movie={mockMovie} />
    </BrowserRouter>
  )

  expect(screen.getByText(/Inception/i)).toBeInTheDocument()
  expect(screen.getByText(/2010 • movie/i)).toBeInTheDocument()
  expect(screen.getByRole('img')).toHaveAttribute('src', mockMovie.Poster)
})
