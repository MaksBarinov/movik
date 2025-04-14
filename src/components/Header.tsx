import { Link } from 'react-router-dom'
import '../styles/Header.css'

const Header = () => {
  return (
    <header className='app-header'>
      <nav>
        <ul className='nav-list'>
          <li>
            <Link to='/' className='nav-link'>
              Главная
            </Link>
          </li>
          <li>
            <Link to='/search' className='nav-link'>
              Поиск
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
