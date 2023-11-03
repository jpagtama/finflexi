
import Link from 'next/link'
import Head from 'next/head'
import { useInView } from 'react-intersection-observer';
import SearchBar from '@components/UI/SearchBar'
import Image from 'next/image'
import focusImage from '../public/FinFlexiFocus.svg'
import mountainsImage from '../public/FinFlexiMountains.svg'
import { FaApple, FaAmazon, FaGoogle, FaFacebook } from 'react-icons/fa'
import { SiNetflix } from 'react-icons/si'
import { IconContext } from 'react-icons/lib'

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
    <div className='flex flex-col w-full min-h-screen'>
      <Head>
        <title>Finflexi</title>
        <meta name="description" content="Access to stock market data and technical analysis" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>

      <section className='flex justify-center items-center w-full min-h-screen'>
        <Link href='/signin'><button className='bg-black' >Sign Up!</button></Link>
      </section>

      <section className=''>
        <p className='' >Get started right away:</p>
        <SearchBar />
      </section>
      <section className='' >
        <div className='' >
          <h1 className='' >Laser focused.</h1>
          <p>Get access to stock market data, company statistics, and more.</p>
        </div>
        <div >
          <div ref={focusRef} className='' >
            <Image src={focusImage} alt="laser focused icon" height="195" width="195" />
          </div>
        </div>
      </section>
      <section className='' >
        <div className='' >
          <h1 className='' >Straight to the point.</h1>
          <p>Key economic indicators help you understand where your investments are going.</p>
        </div>
        <div >
          <div ref={pointRef} className='' >
            <Image src={mountainsImage} alt="mountains icon" height="195" width="195" />
          </div>
        </div>
      </section>
      <section className=''  >
        <div className='' >
          <h1 className='' >Stay Up to Date.</h1>
          <p>Our platform makes it easy to follow the companies you love.</p>
        </div>
        <span className='' >
          <IconContext.Provider value={{ size: "1em" }}>
            <FaFacebook />
            <FaAmazon />
            <FaApple />
            <SiNetflix />
            <FaGoogle />
          </IconContext.Provider >
        </span>
      </section>
      <section className='' style={{ height: '20em' }}>
        <div className='' >
          <h1 className='' >Sign Up for Free!</h1>
          <p>All you need is an email.</p>
        </div>
        <Link href='/signin'><button ref={signUpRef} className='' >Sign Up!</button></Link>
      </section>

    </div>
  )
}


export default Home