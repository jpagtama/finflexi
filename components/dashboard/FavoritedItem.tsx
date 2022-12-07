import React from 'react'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { CgMenuGridO } from 'react-icons/cg'
import styles from '@styles/dashboard/FavoritedItem.module.css'

interface Props {
    idx: number,
    ticker: string,
    name: string,
    favorited: boolean,
    addToWatchList: (ticker: string, favorited: boolean) => void
    onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void
    onDragEnter: (e: React.DragEvent<HTMLDivElement>, index: number) => void
    onDragEnd: (e: React.DragEvent<HTMLDivElement>, index: number) => void
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
}

interface ItemType {
    id: string
    index: number
}

const FavoritedItem = ({ idx, ticker, name, favorited, addToWatchList, onDragStart, onDragEnter, onDragEnd, onDragOver }: Props) => {

    return (
        <div
            key={ticker}
            className={`${styles.listItemContainer}`}
            onDragStart={(e) => onDragStart(e, idx)}
            onDragEnter={(e) => onDragEnter(e, idx)}
            onDragEnd={(e) => onDragEnd(e, idx)}
            onDragOver={(e) => onDragOver(e)}
            draggable
        >
            <div className={styles.grabIconContainer}>
                <IconContext.Provider value={{ size: '2em', color: 'var(--dark-pink)' }}>
                    <CgMenuGridO />
                </IconContext.Provider>
            </div>
            <Link href={`/company/${ticker}`} >
                <a className={styles.linkContainer} >
                    <li className={`${styles.listItemDetails}`}>
                        <span className={styles.ticker}>{ticker}</span>
                        <span className={styles.companyName}>{name}</span>
                    </li>
                </a>
            </Link>
            <span className={styles.starContainer}>
                <IconContext.Provider value={{ size: '1.5em', color: 'var(--dark-pink)' }}>
                    <div className={styles.starIcon} onClick={() => addToWatchList(ticker, !favorited)}>{favorited ? <FaStar /> : <FaRegStar />}</div>
                </IconContext.Provider>
            </span>
        </div>
    )
}

export default FavoritedItem