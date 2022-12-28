/**
 * @jest-environment jsdom
 */

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SearchBar from '../components/UI/SearchBar'
import '@testing-library/jest-dom'


describe('SearchBar', () => {
  const server = setupServer(
    rest.get('/api/companies', (req, res, ctx) => {
      return res(ctx.json({
        data: [
          { ticker: 'AAPL', name: 'Apple Inc' },
          { ticker: 'NFLX', name: 'Netflix Inc' },
          { ticker: 'TSLA', name: 'Tesla Inc' },
        ],
        status: {
          success: true,
          message: 'ok'
        }
      }))
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  beforeEach(async () => {
    await waitFor(async () => render(<SearchBar />))
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