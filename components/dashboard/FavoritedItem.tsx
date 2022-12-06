import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
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
    moveItem: (dragIndex: number, hoverIndex: number) => void
}

interface ItemType {
    id: string
    index: number
}

const FavoritedItem = ({ idx, ticker, name, favorited, addToWatchList, moveItem }: Props) => {
    const ref = useRef<HTMLDivElement>(null)

    const [{ handlerId }, drop] = useDrop({
        accept: 'listItem',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = (item as ItemType).index
            const hoverIndex = idx
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : undefined
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (hoverClientY) {
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return
                }
                // Dragging upwards
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return
                }
            }
            // Time to actually perform the action
            moveItem(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            (item as ItemType).index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'listItem',
        item: () => ({ id: ticker, index: idx }),
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    }))

    drag(drop(ref))

    return (
        <div key={ticker} ref={ref} className={`${styles.listItemContainer} ${isDragging ? styles.isDragging : ''}`} data-handler-id={handlerId}>
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