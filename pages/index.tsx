import {useState, useEffect} from 'react'
import Main from '../components/layouts/Main'
import FinflexiSVG from '../components/SVGs/FinFlexiSVG'

const Home = () => {

  const [animateIntro, setAnimateIntro] = useState(true)

  useEffect(() => {
    console.log('animateIntro', animateIntro)
  }, [animateIntro])

  const introStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw"
  }

  const introEndHandler = () => {
    setAnimateIntro(false)
  }

  return (
    <Main >
      <section style={introStyles}>
        <FinflexiSVG introEndHandler={introEndHandler} />

      </section>
    </Main>
  )
}

export default Home