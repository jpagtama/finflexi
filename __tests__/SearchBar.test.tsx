/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SearchBar from '../components/UI/SearchBar'
import '@testing-library/jest-dom'

describe('SearchBar', () => {

  beforeEach(() => {
    waitFor(() => render(<SearchBar />))
  })

  it('renders the input box for company search', () => {
    const input = screen.getByRole('search_bar')
    expect(input).not.toBeNull()
  })

  it('checks that user input is seeing what they are typing', () => {
    const input = screen.getByRole('search_bar')
    fireEvent.change(input, { target: { value: 'Apple' } })
    expect((input as HTMLInputElement).value).toBe('Apple')
  })

})