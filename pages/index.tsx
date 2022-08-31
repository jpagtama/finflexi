import {useState, useEffect} from 'react'
import AppIntro from '../components/landing/AppIntro'
import Main from '../components/layouts/Main'

const Home = () => {

  const [animateIntro, setAnimateIntro] = useState(true)

  useEffect(() => {
    console.log('animateIntro', animateIntro)
  }, [animateIntro])

  const introEndHandler = () => {
    setTimeout(() => endIntroHandler(), 2200)
  }

  const endIntroHandler = () => {
    setAnimateIntro(false)
  }

  return (
    <Main >
      {animateIntro &&  <AppIntro introEndHandler={introEndHandler} endIntroHandler={endIntroHandler}/>}
      <section>
        <h1>Go beyond the charts</h1>
        <h2>Get access to market data, company filings, and more.</h2>
        <h1>Understand your investments</h1>
        <h2>Get the edge on technical analysis and insights.</h2>
      </section>
    </Main>
  )
}

export default Home