// import { useState } from 'react';
// import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Head from 'next/head'
import { useInView } from 'react-intersection-observer';
import AppIntro from '@components/landing/AppIntro'
import SearchBar from '@components/UI/SearchBar'
import Image from 'next/image'
import focusImage from '../public/FinFlexiFocus.svg'
import mountainsImage from '../public/FinFlexiMountains.svg'
import { FaApple, FaAmazon, FaGoogle, FaFacebook } from 'react-icons/fa'
import { SiNetflix } from 'react-icons/si'
import { IconContext } from 'react-icons/lib'
import styles from '@styles/landing/Index.module.css'

interface CompanyList {
  symbol: string
  name: string
}

const Home = () => {
  const { ref: focusRef, inView: focusInView } = useInView({ threshold: .7, triggerOnce: true })
  const { ref: pointRef, inView: pointInView } = useInView({ threshold: .7, triggerOnce: true })
  const { ref: signUpRef, inView: signUpInView } = useInView({ threshold: 1, triggerOnce: true })
  // const { status: sessionStatus } = useSession()

  // const [animateIntro, setAnimateIntro] = useState(true)

  // useEffect(() => {
  //   // console.log('sessionStatus', sessionStatus)
  //   // console.log('window.sessionStorage.getItem("visited")', window.sessionStorage.getItem("visited"))
  //   if (sessionStatus !== 'authenticated' && !window.sessionStorage.getItem("visited")) {
  //     // Do if user is not signed in and its their first time getting to the page
  //     window.sessionStorage.setItem("visited", "1")
  //     setAnimateIntro(true)
  //   }
  // }, [])

  // const introDoneHandler = () => {
  //   setTimeout(() => endIntroHandler(), 2400)
  // }
  // const endIntroHandler = () => {
  //   setAnimateIntro(false)
  // }
  // if (animateIntro) return <AppIntro introDoneHandler={introDoneHandler} endIntroHandler={endIntroHandler} />

  return (
    <div className={styles.container}>
      <Head>
        <title>Finflexi</title>
        <meta name="description" content="Access to stock market data and technical analysis" />
      </Head>
      {/* {animateIntro === true && <AppIntro introDoneHandler={introDoneHandler} endIntroHandler={endIntroHandler} />} */}
      <section className={styles.bannerSection} >
        <Link href='/signin'><button className={styles.signUpButton}>Sign Up!</button></Link>
      </section>
      <section className={styles.searchBarContainer}>
        <p className={styles.searchDesc}>Get started right away:</p>
        <SearchBar />
      </section>
      <section className={styles.sectionContainer}>
        <div className={styles.sectionDetails}>
          <h1 className={styles.sectionTitle}>Laser focused.</h1>
          <p>Get access to stock market data, company statistics, and more.</p>
        </div>
        <div >
          <div ref={focusRef} className={`${focusInView ? styles.slideToLeft : ''} ${styles.image}`}>
            <Image src={focusImage} alt="laser focused icon" height="195px" width="195px" />
          </div>
        </div>
      </section>
      <section className={`${styles.sectionContainer} ${styles.sectionReverse}`}>
        <div className={styles.sectionDetails}>
          <h1 className={styles.sectionTitle}>Straight to the point.</h1>
          <p>Key economic indicators help you understand where your investments are going.</p>
        </div>
        <div >
          <div ref={pointRef} className={`${pointInView ? styles.slideToRight : ''} ${styles.image}`}>
            <Image src={mountainsImage} alt="mountains icon" height="195px" width="195px" />
          </div>
        </div>
      </section>
      <section className={styles.companiesSection} >
        <div className={styles.companiesSectionDetails}>
          <h1 className={styles.sectionTitle}>Stay Up to Date.</h1>
          <p>Our platform makes it easy to follow the companies you love.</p>
        </div>
        <span className={styles.companyIcons}>
          <IconContext.Provider value={{ size: "2em" }}>
            <FaFacebook />
            <FaAmazon />
            <FaApple />
            <SiNetflix />
            <FaGoogle />
          </IconContext.Provider >
        </span>
      </section>
      <section className={styles.sectionContainer} style={{ height: '20em' }}>
        <div className={styles.sectionDetails}>
          <h1 className={styles.sectionTitle}>Sign Up for Free!</h1>
          <p>All you need is an email.</p>
        </div>
        <Link href='/signin'><button ref={signUpRef} className={`${styles.signUpButton} ${signUpInView ? styles.shake : ''}`}>Sign Up!</button></Link>
      </section>

    </div>
  )
}


export default Home