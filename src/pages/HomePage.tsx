import { useState } from 'react'
import { useGetPopularMoviesQuery } from '../api/omdbApi'
import MovieCard from '../components/MovieCard'
import RandomMovie from '../components/RandomMovie'

export const HomePage = () => {
  const [page, setPage] = useState(1)
  const { currentData, isFetching, totalResults } = useGetPopularMoviesQuery(
    page,
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        currentData: data?.Search || [],
        totalResults: data?.totalResults || '0',
      }),
    }
  )

  const handleLoadMore = () => {
    setPage(page + 1)
  }

  return (
    <div>
      <RandomMovie />
      <h1>Популярные фильмы</h1>
      <div className='movie-grid'>
        {currentData?.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {currentData?.length < parseInt(totalResults) && (
        <button
          onClick={handleLoadMore}
          disabled={isFetching}
          className='load-more-btn'
        >
          {isFetching ? 'Загрузка...' : 'Ещё'}
        </button>
      )}
    </div>
  )
}
export default HomePage
