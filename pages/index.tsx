import {useState, useEffect} from 'react'
import Head from 'next/head'
import AppIntro from '../components/landing/AppIntro'
import Main from '../components/layouts/Main'

const Home = () => {

  const [animateIntro, setAnimateIntro] = useState(true)

  useEffect(() => {
    console.log('animateIntro', animateIntro)
  }, [animateIntro])

  const introDoneHandler = () => {
    setTimeout(() => endIntroHandler(), 2200)
  }

  const endIntroHandler = () => {
    setAnimateIntro(false)
  }

  return (
    <>
      <Head>
          <title>Finflexi</title>
          <meta name="description" content="Access to stock market data, company filings, and technical analysis" />
      </Head>
      <Main >
        {animateIntro &&  <AppIntro introDoneHandler={introDoneHandler} endIntroHandler={endIntroHandler}/>}
        <section>
          <h1>Go beyond the charts</h1>
          <h2>Get access to market data, company filings, and more.</h2>
          <h1>Understand your investments</h1>
          <h2>Get the edge on technical analysis and insights.</h2>
        </section>
      </Main>
    </>
  )
}

export default Home