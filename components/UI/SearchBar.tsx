import {useState} from 'react'
import styles from '../../styles/UI/SearchBar.module.css'

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
interface Props {
    searchCompaniesHandler?: (companies: CompanyDetails[]) => void
}

const SearchBar = (props: Props) => {
    const [isSearching, setIsSearching] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSearching(true)
        try {
            const preparedSearchText = searchText.replace(/\./g,'-').trim()
            if (preparedSearchText.length === 0) throw new Error('Please enter a search criteria')
            const response = await fetch(`/api/getCompanySearchResults?search=${preparedSearchText}`)
            const data = await response.json()
            if (data.length === 0) throw new Error('No companies found')
            setErrorMessage('')
            if (props.searchCompaniesHandler) props.searchCompaniesHandler(data)
        } catch(e) {
            if (e instanceof Error) setErrorMessage(e.message)
        }
        setIsSearching(false)
    }

    const searchHandler = (e: React.FormEvent) => {
        setSearchText((e.target as HTMLInputElement).value)
    }

    return (
        <form className={styles.form} onSubmit={submitHandler} >
            <input className={styles.searchBar} onChange={searchHandler} type="text" placeholder="search companies" value={searchText} disabled={isSearching}/>
            {errorMessage.length > 0 && <span className={styles.userMessage}>{errorMessage}</span>}
        </form>
    )
}

export default SearchBar