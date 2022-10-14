import { useEffect, useState } from 'react'
import {FaSearch, FaTimes} from 'react-icons/fa'
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
    const [errorMessage, setErrorMessage] = useState('')
    const [companies, setCompanies] = useState<Company[]>([])
    const {data: companiesFromCache, error} = useSWR('/api/companies', getCompanies)

    useEffect(() => {
        console.log("reached companies cache useEffect()")
        if (companiesFromCache?.status?.success) {
            setCompanies(companiesFromCache?.data)
        }
    }, [companiesFromCache])

    // useEffect(() => {
    //     console.log('searchResults:', searchResults)
    // }, [searchResults])

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSearching(true)
        try {
            const preparedSearchText = searchText.replace(/\./g, '-').trim()
            if (preparedSearchText.length === 0) throw new Error('Please enter a search criteria')
            const response = await fetch(`/api/search?search=${preparedSearchText}`)
            const data = await response.json()
            if (data.length === 0) throw new Error('No companies found')
            setErrorMessage('')
            if (props.searchCompaniesHandler) props.searchCompaniesHandler(data)
        } catch (e) {
            if (e instanceof Error) setErrorMessage(e.message)
        }
        setIsSearching(false)
    }

    const renderSearchResults = () => {
        if (searchResults.length === 0 || searchText.length === 0) return
        return (
            <div className={styles.searchResultsContainer}>
                <ul className={styles.searchResultsList} >
                    {searchResults.map(i => {
                        return (
                            <li className={styles.searchItem} key={i.ticker} >
                                <span className={styles.ticker} >{i.ticker}</span>
                                <span className={styles.companyName} >{i.name}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log('companies :>> ', companies);
        // const preparedSearchText = searchText.replace(/\./g, '-').trim()
        const searchTerm = e.target.value
        setSearchText(searchTerm)
        const results = companies.filter(item => {
            return item.ticker.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) || item.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
        }).sort((a,b) => a.name.localeCompare(b.name))

        if (searchTerm.trim().length) {
            setSearchResults(results.slice(0,5))
        } else {
            setSearchResults([])
        }
    }

    const clearSearch = () => {
        setSearchText('')
        setSearchResults([])
    }

    return (
        <form className={styles.form} onSubmit={submitHandler} >
            <div className={styles.searchBarContainer}>
                <input className={`${styles.searchBar} ${searchResults.length? styles.resultsBorderWithRecords: styles.resultsBorderWithoutRecords}`} onChange={searchHandler} type="text" placeholder="search companies" value={searchText} disabled={isSearching} />
                <div onClick={clearSearch} className={`${styles.searchIcon} ${searchResults.length? styles.searchIconBorderWithRecords : styles.searchIconBorderWithoutRecords}`}>
                    {searchText.length? <FaTimes />: <FaSearch />}
                </div>
            </div>
            {renderSearchResults()}
        </form>
    )
}

export default SearchBar