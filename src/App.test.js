import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders Empire Of Cards title', () => {
  const { getByText } = render(<App />)
  const titleElement = getByText(/Empire Of Cards/i)
  expect(titleElement).toBeInTheDocument()
})
