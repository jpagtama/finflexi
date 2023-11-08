import React from 'react'
import styles from '../../styles/layouts/Footer.module.css'
import Link from 'next/link'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className='flex flex-col sm:flex-row justify-center gap-12 bg-gray-600 text-dirty-white min-h-[40vh] w-full py-24 px-4' >
      <div className='flex flex-col sm:w-1/3 gap-4'>
        <div className='flex flex-col'>
          <span className='text-6xl font-thin'><span className='font-bold'>FIN</span>flexi</span>
          <span className='' >Copyright <span>&copy;</span> {year} Finflexi Ltd.</span>
        </div>
        <p className='font-thin text-slate-400'>
          All data provided on Finflexi is provided for informational purposes only, and is not intended for trading or investing purposes. Stock prices displayed in the ticker are from a subset of exchanges, this price does not represent the real-time price.
        </p>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-2xl'>Company</span>
        <Link className='font-thin' href='/about'>About Us</Link>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-2xl'>Products</span>
        <Link className='font-thin' href='/economy'>Economic Indicators</Link>
        <Link className='font-thin' href='/dashboard'>Dashboard</Link>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-2xl'>Legal</span>
        <span className='font-thin' >Disclaimer</span>
        <span className='font-thin' >Terms & Conditions</span>
        <span className='font-thin' >Data Collection</span>
      </div>


    </footer>
  )
}

export default Footer