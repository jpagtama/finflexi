import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FaSearch, FaTimes } from 'react-icons/fa'
import useSWR from 'swr'
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
    const [errorMessage, setErrorMessage] = useState('')
    const [companies, setCompanies] = useState<Company[]>([])

    const router = useRouter()
    const { data: companiesFromCache, error } = useSWR('/api/companies', getCompanies)
    const searchBarRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (companiesFromCache?.status?.success) {
            setCompanies(companiesFromCache?.data)
        }
    }, [companiesFromCache])

    useEffect(() => {
        if (searchResults.length === 0) setHighlightedResult(-1)
    }, [searchResults])

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if (highlightedResult > -1) {
            router.push(`/company/${searchResults[highlightedResult].ticker}`)
        }
        // setIsSearching(true)
        // try {
        //     const preparedSearchText = searchText.replace(/\./g, '-').trim()
        //     if (preparedSearchText.length === 0) throw new Error('Please enter a search criteria')
        //     const response = await fetch(`/api/search?search=${preparedSearchText}`)
        //     const data = await response.json()
        //     if (data.length === 0) throw new Error('No companies found')
        //     setErrorMessage('')
        //     if (props.searchCompaniesHandler) props.searchCompaniesHandler(data)
        // } catch (e) {
        //     if (e instanceof Error) setErrorMessage(e.message)
        // }
        // setIsSearching(false)
    }

    const renderSearchResults = () => {
        if (searchResults.length === 0 || searchText.length === 0) return
        return (
            <div className={styles.searchResultsContainer}>
                <ul className={styles.searchResultsList} >
                    {searchResults.map((i, index) => {
                        return (
                            <Link key={i.ticker} href={`/company/${i.ticker}`} >
                                <a>
                                    <li className={`${styles.searchItem} ${highlightedResult === index && styles.highlight}`} key={i.ticker} >
                                        <span className={styles.ticker} >{i.ticker}</span>
                                        <span className={styles.companyName} >{i.name}</span>
                                    </li>
                                </a>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        )
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
                <input ref={searchBarRef} className={`${styles.searchBar} ${searchResults.length ? styles.resultsBorderWithRecords : styles.resultsBorderWithoutRecords}`} onChange={searchHandler} onKeyDown={keyHandler} type="text" placeholder="search companies" value={searchText} disabled={isSearching} />
                <div onClick={searchBarIconHandler} className={`${styles.searchIcon} ${searchResults.length ? styles.searchIconBorderWithRecords : styles.searchIconBorderWithoutRecords}`}>
                    {searchText.length ? <FaTimes /> : <FaSearch />}
                </div>
            </div>
            {renderSearchResults()}
        </form>
    )
}

export default SearchBar