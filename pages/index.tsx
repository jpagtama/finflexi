import {useState, useEffect} from 'react'
import Router from 'next/router'
import Head from 'next/head'
import AppIntro from '../components/landing/AppIntro'
import SearchBar from '../components/UI/SearchBar'
import styles from '../styles/landing/Index.module.css'

interface CompanyList {
  symbol: string
  name: string
}

const Home = () => {
  const initialCompanies: Array<CompanyList> = []

  const [animateIntro, setAnimateIntro] = useState(true)
  const [companyResults, setCompanyResults] = useState(initialCompanies)

  useEffect(() => {
    if (companyResults.length > 0) {
      Router.push({
        pathname: '/company/search',
        query: {details: JSON.stringify(companyResults)}
      }, '/company/search')
    }
  }, [companyResults])

  const introDoneHandler = () => {
    setTimeout(() => endIntroHandler(), 2400)
  }
  const endIntroHandler = () => {
    setAnimateIntro(false)
  }
  const searchCompaniesHandler = (companies: CompanyList[]) => {
    setCompanyResults(companies)
  }

  return (
    <>
      <Head>
          <title>Finflexi</title>
          <meta name="description" content="Access to stock market data, company filings, and technical analysis" />
      </Head>
      {animateIntro &&  <AppIntro introDoneHandler={introDoneHandler} endIntroHandler={endIntroHandler}/>}
      <section className={styles.searchSection}>
        <h1 className={styles.sloganHeading}>Go beyond the charts</h1>
        <SearchBar searchCompaniesHandler={searchCompaniesHandler} />
        
        
      </section>
      <section>
        <h2>Get access to market data, company filings, and more.</h2>
        <h1>Understand your investments</h1>
        <h2>Get the edge on technical analysis and insights.</h2>
      </section>
    </>
  )
}

export default Home