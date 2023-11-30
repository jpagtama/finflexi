import React from 'react'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { CgMenuGridO } from 'react-icons/cg'
import styles from '@styles/dashboard/FavoritedItem.module.css'

interface Props {
    ticker: string,
    name: string,
    favorited: boolean,
    addToWatchList: (ticker: string, favorited: boolean) => void
}

const FavoritedItem = ({ ticker, name, favorited, addToWatchList }: Props) => {

    return (
        <div className='group flex justify-between items-center w-full bg-white' >
            <div className='flex justify-center items-center'>
                <Link href={`/company/${ticker}`} >
                    <div className='flex flex-col w-full p-2 cursor-pointer' >
                        <span className={styles.ticker}>{ticker}</span>
                        <span className={styles.companyName}>{name}</span>
                    </div>
                </Link>
            </div>
            <span className='p-2'>
                <IconContext.Provider value={{ size: '1.5em' }}>
                    <button className='cursor-pointer text-indigo-700 hover:scale-105 duration-150' onClick={() => addToWatchList(ticker, !favorited)}>{favorited ? <FaStar /> : <FaRegStar />}</button>
                </IconContext.Provider>
            </span>
        </div>
    )
}

export default FavoritedItem