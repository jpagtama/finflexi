
import Link from 'next/link'
import Head from 'next/head'
import SearchBar from '@components/UI/SearchBar'
import Image from 'next/image'
import googleIcon from '../public/google.svg'
import amazonIcon from '../public/amazon.svg'
import microsoftIcon from '../public/microsoft.svg'
import appleIcon from '../public/apple.svg'
import metaIcon from '../public/meta.svg'
import ExampleDisplays from '@components/landing/ExampleDisplays';
import { GiLaserburn, GiSpeedometer } from 'react-icons/gi';
import { MdBolt } from 'react-icons/md';
import { PiPersonSimpleBikeBold } from 'react-icons/pi';

interface CompanyList {
  symbol: string
  name: string
}

const Home = () => {

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

      <section className='flex justify-center items-center flex-wrap sm:gap-8 md:gap-20 sm:items-start pt-24 sm:pt-36 w-full min-h-2/3'>
        <div className='flex justify-end'>
          <ExampleDisplays />
        </div>
        <div className='flex flex-col gap-4 -order-1 lg:order-1 mb-12'>
          <h1 className='text-8xl text-center sm:text-left'><span className='font-bold'>FIN</span><span className='font-extralight'>flexi</span></h1>
          <p className='text-xl sm:text-3xl text-center sm:text-left' >Invest in your financial flexibility</p>
          <div className='w-full flex justify-center sm:justify-start'>
            <Link href='/signin'><button className='bg-indigo-300 rounded-full px-6 py-2 shadow-lg hover:scale-110 duration-150' >Sign Up</button></Link>
          </div>
        </div>
      </section>

      <section className='flex flex-col justify-center items-center px-8 py-16 mt-16 bg-dirty-white'>
        <div className='flex flex-col items-center w-full sm:w-1/2 gap-4'>
          <span className='text-2xl font-light' >Get started right away:</span>
          <SearchBar />
        </div>
      </section>

      <section className='flex flex-col justify-center items-center gap-12 px-8 pt-16 pb-48 bg-dirty-white'  >
        <span className='text-4xl text-indigo-600 text-center' >Stay Up to Date</span>
        <div className='flex justify-between w-full sm:w-4/5' >
          <Image src={microsoftIcon} alt="Microsoft icon" className='h-5 sm:h-8' />
          <Image src={appleIcon} alt="Apple icon" className='h-5 sm:h-8' />
          <Image src={metaIcon} alt="Meta icon" className='h-5 sm:h-8' />
          <Image src={amazonIcon} alt="Amazon icon" className='h-5 sm:h-8' />
          <Image src={googleIcon} alt="Google icon" className='h-5 sm:h-8' />
        </div>
        <span className='text-center text-md sm:text-2xl text-indigo-500 font-thin' >Our platform makes it easy to follow the companies you love</span >
      </section>

      <section className={`flex flex-col justify-center items-center w-full relative h-[750px]`} >
        <div className='flex flex-col justify-center items-center gap-6 w-10/12 bg-white shadow-lg rounded-md absolute -top-20 min-h-screen p-4'>
          <span className='text-4xl sm:text-7xl text-center font-bold text-indigo-600'>Why Finflexi?</span>
          <span className='text-center w-9/12 text-md sm:text-2xl'>We use a user-centric approach to strip away the complexities of monetary economics through the use of technology</span>
          <div className='flex justify-center items-center flex-wrap w-full sm:w-9/12' >
            <div className='flex flex-col justify-center items-center w-1/2 p-4' >
              <div className='flex justify-center items-center h-16 sm:h-24 w-16 mb-4 sm:w-24 bg-gradient-to-bl from-indigo-400 to-green-400 rounded-full'>
                <GiLaserburn className='h-12 sm:h-16 w-12 sm:w-16 text-white' />
              </div>
              <span className='text-lg sm:text-3xl text-indigo-400 text-center' >Laser focused</span>
              <span className='text-center text-xs sm:text-base' >Get access to stock market data, company statistics, and more.</span>
            </div>
            <div className='flex flex-col justify-center items-center w-1/2 p-4' >
              <div className='flex justify-center items-center h-16 sm:h-24 w-16 mb-4 sm:w-24 bg-gradient-to-bl from-indigo-400 to-green-400 rounded-full'>
                <MdBolt className='h-12 sm:h-16 w-12 sm:w-16 text-white' />
              </div>
              <span className='text-lg sm:text-3xl text-indigo-400 text-center' >Straightforward</span>
              <span className='text-center text-xs sm:text-base' >Key economic indicators help you understand where your investments are going.</span>
            </div>
            <div className='flex flex-col justify-center items-center w-1/2 p-4' >
              <div className='flex justify-center items-center h-16 sm:h-24 w-16 mb-4 sm:w-24 bg-gradient-to-bl from-indigo-400 to-green-400 rounded-full'>
                <PiPersonSimpleBikeBold className='h-12 sm:h-16 w-12 sm:w-16 text-white' />
              </div>
              <span className='text-lg sm:text-3xl text-indigo-400 text-center' >Simplicity</span>
              <span className='text-center text-xs sm:text-base' >We aim to simplify financial education and make the world a more comfortable place.</span>
            </div>
            <div className='flex flex-col justify-center items-center w-1/2 p-4' >
              <div className='flex justify-center items-center h-16 sm:h-24 w-16 mb-4 sm:w-24 bg-gradient-to-bl from-indigo-400 to-green-400 rounded-full'>
                <GiSpeedometer className='h-12 sm:h-16 w-12 sm:w-16 text-white' />
              </div>
              <span className='text-lg sm:text-3xl text-indigo-400 text-center' >Performance</span>
              <span className='text-center text-xs sm:text-base' >We use cutting edge technology to give you the best experience so you won&apos;t miss a beat.</span>
            </div>
          </div>
        </div>
      </section>

      <section className='flex justify-center items-center min-h-[85vh] w-full bg-red-300' >
        <div >
          <h1 >Sign Up for Free!</h1>
          <p>All you need is an email.</p>
        </div>
        <Link href='/signin'><button >Sign Up!</button></Link>
      </section>

    </div>
  )
}


export default Home