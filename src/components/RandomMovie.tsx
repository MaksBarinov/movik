import { useEffect, useState } from 'react'
import { useGetPopularMoviesQuery } from '../api/omdbApi'
import type { Movie } from '../types/movie.d'
import MovieCard from './MovieCard'

const RandomMovie = () => {
  const { data } = useGetPopularMoviesQuery(1)
  const [dailyMovie, setDailyMovie] = useState<Movie | null>(null)
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]

    if (today !== currentDate || !dailyMovie) {
      const movies: Movie[] = data?.Search || []
      if (movies.length > 0) {
        const seed = parseInt(today.replace(/-/g, ''), 10)
        const index = seed % movies.length
        setDailyMovie(movies[index])
        setCurrentDate(today)
      }
    }
  }, [data?.Search, currentDate, dailyMovie])

  if (!dailyMovie) return null

  return (
    <div className='random-movie'>
      <h2>Фильм дня</h2>
      <MovieCard movie={dailyMovie} />
    </div>
  )
}

export default RandomMovie
