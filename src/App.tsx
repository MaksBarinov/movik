import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Header from './components/Header' // Добавляем импорт Header
import { store } from './store/store'

const HomePage = lazy(() => import('./pages/HomePage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const MovieDetails = lazy(() => import('./pages/MovieDetails'))

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className='main-content'>
          <Suspense fallback={<div>Загрузка...</div>}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/movie/:id' element={<MovieDetails />} />
            </Routes>
          </Suspense>
        </main>
      </Router>
    </Provider>
  )
}

export default App
