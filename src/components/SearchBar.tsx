import { useEffect, useState } from 'react'
import { useSearchMoviesQuery } from '../api/omdbApi'
import MovieCard from './MovieCard'

const DEBOUNCE_DELAY = 500

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const [page, setPage] = useState(1)

  // Debounce эффект
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
      setPage(1)
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const { currentData, isFetching, totalResults } = useSearchMoviesQuery(
    { term: debouncedTerm, page },
    {
      skip: !debouncedTerm,
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
      <input
        type='text'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder='Введите название...'
      />

      {isFetching && page === 1 && <div>Поиск...</div>}

      <div className='movie-grid'>
        {currentData?.map(movie => (
          <MovieCard key={`${movie.imdbID}-${page}`} movie={movie} />
        ))}
      </div>

      {currentData?.length > 0 &&
        currentData.length < parseInt(totalResults) && (
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

export default SearchBar
