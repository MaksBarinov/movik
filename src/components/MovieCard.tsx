import { memo } from 'react'
import { Link } from 'react-router-dom'
import '../styles/MovieCard.css'
import type { Movie } from '../types/movie.d'

interface MovieCardProps {
  movie: Movie
}

const MovieCard = memo(({ movie }: MovieCardProps) => {
  return (
    <div className='movie-card'>
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster} alt={movie.Title} />
        <div className='movie-info'>
          <h3>{movie.Title}</h3>
          <p>
            {movie.Year} • {movie.Type}
          </p>
        </div>
      </Link>
    </div>
  )
})

export default MovieCard
