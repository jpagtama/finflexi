import {useState, useEffect} from 'react'
import Link from 'next/link'
import {withRouter} from 'next/router'
import SearchBar from '../../components/UI/SearchBar'
import styles from '../../styles/company/Search.module.css'

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

const Search = (props: any) => {
  const [results, setResults] = useState<CompanyDetails[]>([])
  
  let searchResults: CompanyDetails[] = []

  useEffect(() => {
    if (props.router.query.details) {
        searchResults = JSON.parse(props.router.query.details)
        setResults(searchResults)
    }
  }, [props.router.query.details])

  const searchCompaniesHandler = (companies: CompanyDetails[]) => {
    setResults(companies)
  }

  return (
    <div className={styles.searchPage}>
        <h1 className={styles.pageHeading}>search</h1>
        <SearchBar searchCompaniesHandler={searchCompaniesHandler} />
        <ul className={styles.resultList}>
            {results.map((item: CompanyDetails) => {
                const urlSymbol = item.symbol.replace(/\./g,'-')

                return (
                    <li key={item.symbol} >
                        <Link href={`/company/${urlSymbol}`}>
                            <a>
                                <span className={styles.symbol}>{item.symbol}</span>
                                <span>{item.name}</span>
                            </a>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default withRouter(Search)