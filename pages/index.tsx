import { useState, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import AppIntro from '@components/landing/AppIntro'
import SearchBar from '@components/UI/SearchBar'
import styles from '@styles/landing/Index.module.css'

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
        query: { details: JSON.stringify(companyResults) }
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
      {animateIntro && <AppIntro introDoneHandler={introDoneHandler} endIntroHandler={endIntroHandler} />}
      <section className={styles.searchSection}>
        <h1 className={styles.sloganHeading}>Flexibility in Finance. FinFlexi.</h1>
        <SearchBar searchCompaniesHandler={searchCompaniesHandler} />
      </section>
      <section>
        <h1>Laser focused.</h1>
        <h2>Get access to stock market data, company statistics, and more.</h2>
        <h1>Straight to the point.</h1>
        <h2>Key economic indicators helps understand where your investments are going.</h2>
      </section>
    </>
  )
}

export default Home