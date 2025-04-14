import { useParams } from 'react-router-dom'
import { useGetMovieByIdQuery } from '../api/omdbApi'
import '../styles/MovieDetails.css'
import type { TMovieDetails } from '../types/movie.d'

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: movie, isLoading, error } = useGetMovieByIdQuery(id || '')

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {JSON.stringify(error)}</div>
  if (!movie) return <div>Фильм не найден</div>

  const { Title, Poster, Year, Genre, Plot, Director, Actors, imdbRating } =
    movie as TMovieDetails

  return (
    <div className='movie-details'>
      <div className='movie-header'>
        <img src={Poster !== 'N/A' ? Poster : '/placeholder.jpg'} alt={Title} />
        <div>
          <h1>
            {Title} ({Year})
          </h1>
          <p>
            <strong>Жанр:</strong> {Genre}
          </p>
          <p>
            <strong>Режиссёр:</strong> {Director}
          </p>
          <p>
            <strong>Актёры:</strong> {Actors}
          </p>
          <p>
            <strong>Рейтинг IMDb:</strong> ⭐ {imdbRating}
          </p>
        </div>
      </div>
      <div className='movie-plot'>
        <h3>Описание</h3>
        <p>{Plot}</p>
      </div>
    </div>
  )
}

export default MovieDetails
