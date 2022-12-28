import { fireEvent, render, screen } from '@testing-library/react'
import SearchBarResults from '../components/UI/SearchBarResults'
import '@testing-library/jest-dom'

describe('SearchBarResults', () => {
    const highlightedResult = 2
    const clickResultHandler = jest.fn()
    const searchResults = [
        { ticker: 'MMM', name: '3M Company' },
        { ticker: 'AAPL', name: 'Apple Inc' },
        { ticker: 'AMZN', name: 'Amazon Inc' },
        { ticker: 'ADBE', name: 'Adobe Systems Incorporated' }
    ]

    it('does not show results if there are no possible records', () => {
        const emptyResults: { name: string, ticker: string }[] = []
        render(<SearchBarResults searchResults={emptyResults} highlightedResult={-1} clickResultHandler={clickResultHandler} />)
        const listItems = screen.queryAllByRole('search_result_item')
        expect(listItems.length).toBe(0)
    })

    it('displays the search results', () => {
        render(<SearchBarResults searchResults={searchResults} highlightedResult={highlightedResult} clickResultHandler={clickResultHandler} />)
        const result1 = screen.getByText('MMM')
        const result2 = screen.getByText('AAPL')
        const result3 = screen.getByText('AMZN')
        const result4 = screen.getByText('ADBE')
        expect(result1).toBeInTheDocument()
        expect(result2).toBeInTheDocument()
        expect(result3).toBeInTheDocument()
        expect(result4).toBeInTheDocument()
    })

    it('checks if highlighted result is highlighted via css', () => {
        render(<SearchBarResults searchResults={searchResults} highlightedResult={highlightedResult} clickResultHandler={clickResultHandler} />)
        const listItems = screen.getAllByRole('search_result_item')
        for (let [idx, item] of listItems.entries()) {
            if (idx !== highlightedResult) {
                expect(item).not.toHaveClass('highlight')
                continue
            }
            expect(item).toHaveClass('highlight')
        }
    })

    it('triggers handler function when user clicks a result', () => {
        render(<SearchBarResults searchResults={searchResults} highlightedResult={-1} clickResultHandler={clickResultHandler} />)
        const listItems = screen.getAllByRole('search_result_item')
        for (const item of listItems) {
            fireEvent.click(item)
        }
        expect(clickResultHandler).toHaveBeenCalledTimes(listItems.length)
    })

})