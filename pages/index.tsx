import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import Head from 'next/head'
import AppIntro from '@components/landing/AppIntro'
import SearchBar from '@components/UI/SearchBar'
import styles from '@styles/landing/Index.module.css'
import Link from 'next/link'

interface CompanyList {
  symbol: string
  name: string
}

const Home = () => {
  const initialCompanies: Array<CompanyList> = []
  const { status: sessionStatus } = useSession()

  const [animateIntro, setAnimateIntro] = useState(false)
  const [companyResults, setCompanyResults] = useState(initialCompanies)

  useEffect(() => {
    if (sessionStatus === 'unauthenticated' && !window.sessionStorage.getItem("visted")) {
      // Do if user is not signed in and its their first time getting to the page
      window.sessionStorage.setItem('visted', '1')
      setAnimateIntro(true)
    }
  }, [])

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

  const signUpHandler = () => {

  }

  return (
    <>
      <Head>
        <title>Finflexi</title>
        <meta name="description" content="Access to stock market data and technical analysis" />
      </Head>
      {animateIntro && <AppIntro introDoneHandler={introDoneHandler} endIntroHandler={endIntroHandler} />}
      <section className={styles.bannerSection}>
        <Link href='/signin'><button className={styles.signUpButton}>Sign Up!</button></Link>
      </section>
      <section className={styles.searchBarContainer}>
        <p className={styles.searchDesc}>Get started right away:</p>
        <SearchBar searchCompaniesHandler={searchCompaniesHandler} />
      </section>
      <section className={styles.sectionContainer}>
        <div className={styles.sectionDetails}>
          <h1>Laser focused.</h1>
          <p>Get access to stock market data, company statistics, and more.</p>
        </div>
        <div className={styles.sectionImage}>

        </div>
      </section>
      <section className={styles.sectionContainer}>
        <div className={styles.sectionDetails}>
          <h1>Straight to the point.</h1>
          <p>Key economic indicators helps understand where your investments are going.</p>
        </div>
        <div className={styles.sectionImage}>

        </div>
      </section>
    </>
  )
}

export default Home