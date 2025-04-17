// src/components/Header.test.tsx
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'

test('Header рендерит ссылки "Главная" и "Поиск"', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )

  expect(screen.getByText(/Главная/i)).toBeInTheDocument()
  expect(screen.getByText(/Поиск/i)).toBeInTheDocument()
})
