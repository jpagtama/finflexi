import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FaSearch, FaTimes } from 'react-icons/fa'
import useSWR from 'swr'
import SearchBarResults from './SearchBarResults'
import styles from '@styles/UI/SearchBar.module.css'

interface CompanyDetails {
    symbol: string
    name: string
    type: string
    region: string
    marketOpen: string
    marketClose: string
    timezone: string
    currency: string
    matchScore: string
}
interface Company {
    ticker: string
    name: string
}
interface Props {
    searchCompaniesHandler?: (companies: CompanyDetails[]) => void
}

const getCompanies = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
}

const SearchBar = (props: Props) => {
    const [isSearching, setIsSearching] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState<Company[]>([])
    const [highlightedResult, setHighlightedResult] = useState(-1)
    const [companies, setCompanies] = useState<Company[]>([])

    const router = useRouter()
    // const { data: companiesFromCache, error } = useSWR('/api/companies', getCompanies)
    const searchBarRef = useRef<HTMLInputElement>(null)

    // useEffect(() => {
    //     if (companiesFromCache?.status?.success) {
    //         setCompanies(companiesFromCache?.data)
    //     }
    //     console.log('companiesFromCache :>> ', companiesFromCache);
    //     console.log('error :>> ', error);
    // }, [companiesFromCache])

    useEffect(() => {
        if (searchResults.length === 0) setHighlightedResult(-1)
    }, [searchResults])

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        const ticker = searchResults[highlightedResult].ticker
        setSearchResults([])
        searchBarRef.current?.blur()
        if (highlightedResult > -1) {
            router.push(`/company/${ticker}`)
        }
    }

    const clickResultHandler = (ticker: string) => {
        setSearchResults([])
        searchBarRef.current?.blur()
        router.push(`/company/${ticker}`)
    }

    const renderSearchResults = () => {
        // return <ul><li>{searchResults.length} | {searchText.length}</li></ul>
        if (searchResults.length === 0 || searchText.length === 0) return
        return <SearchBarResults searchResults={searchResults} highlightedResult={highlightedResult} clickResultHandler={clickResultHandler} />
    }

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value
        setSearchText(searchTerm)
        const results = companies.filter(item => {
            return item.ticker.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) || item.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
        }).sort((a, b) => a.name.localeCompare(b.name))

        if (searchTerm.trim().length) {
            setSearchResults(results.slice(0, 5))
        } else {
            setSearchResults([])
        }
    }

    const keyHandler = (e: React.KeyboardEvent) => {
        if (searchResults.length && e.key === 'ArrowDown') {
            if (highlightedResult !== searchResults.length - 1) {
                // searchBarRef.current?.blur()
                setHighlightedResult(prevSt => prevSt + 1)
            }
        } else if (searchResults.length && e.key === 'ArrowUp') {
            if (highlightedResult !== 0) {
                setHighlightedResult(prevSt => prevSt - 1)
            } else if (highlightedResult === 0) {
                searchBarRef.current?.focus()
                setHighlightedResult(-1)
            }
        } else if (e.key === 'Escape') {
            setSearchResults([])
            searchBarRef.current?.blur()
        }
    }

    const searchBarIconHandler = () => {
        if (searchText.length) {
            clearSearch()
            searchBarRef.current?.focus()
        } else {
            searchBarRef.current?.focus()
        }
    }

    const clearSearch = () => {
        setSearchText('')
        setSearchResults([])
    }

    return (
        <form className={styles.form} onSubmit={submitHandler} >
            <div className={styles.searchBarContainer}>
                <input role="search_bar" type="text" ref={searchBarRef} className={`${styles.searchBar} bg-white ${searchResults.length ? styles.resultsBorderWithRecords : styles.resultsBorderWithoutRecords}`} onChange={searchHandler} onKeyDown={keyHandler} placeholder="search companies" value={searchText} disabled={isSearching} />
                <div onClick={searchBarIconHandler} className={`${styles.searchIcon} bg-white ${searchResults.length ? styles.searchIconBorderWithRecords : styles.searchIconBorderWithoutRecords}`}>
                    {searchText.length ? <FaTimes /> : <FaSearch />}
                </div>
            </div>
            {renderSearchResults()}
        </form>
    )
}

export default SearchBar