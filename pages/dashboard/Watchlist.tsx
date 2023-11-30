import React, { useState, useRef, useEffect } from 'react'
import { prisma } from '@db/index'
import { useRouter } from 'next/router'
import Image from 'next/image'
import touchIcon from '../../public/touchfave_icon_300x300.svg'
import FavoritedItem from '@components/dashboard/FavoritedItem'
import Loading from '@components/UI/Loading'
import { GetServerSidePropsContext } from 'next'
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import styles from '@styles/company/Favorites.module.css'
import { Reorder, motion, useDragControls, useMotionValue } from 'framer-motion';
import axios from 'axios'
import { IconContext } from 'react-icons'
import { CgMenuGridO } from 'react-icons/cg'

interface Props {
    companies: [{
        company: {
            name: string,
            ticker: string
        },
        order: number | null,
        id: string
    }]
}

const Watchlist = ({ companies }: Props) => {
    const router = useRouter()
    const { id: userId } = useSelector((state: RootState) => state.auth);
    const [favoritedCompanies, setFavoritedCompanies] = useState<{ ticker: string, name: string, favorited: boolean, order: number | null, id: string }[]>([]);
    const controls = useDragControls();
    // let draggedItem = useRef<number | null>(null)
    // let draggedItemDroppedOn = useRef<number | null>(null)

    useEffect(() => {
        const formatReqCompanies = (companies: { company: { name: string, ticker: string }, order: number | null, id: string }[]) => {
            // Formats the companies we retrieved from the server
            return companies.map((item, i) => ({
                id: item.id, ticker: item.company.ticker, name: item.company.name, favorited: true, order: item.order
            }))
        }

        setFavoritedCompanies(formatReqCompanies(companies));
    }, []);

    // useEffect(() => {
    //     // Save the order of the list
    //     const saveFaves = async () => {
    //         const payload = { companies: favoritedCompanies }
    //         const res = await fetch('/api/save-favorites', {
    //             method: 'POST',
    //             body: JSON.stringify(payload),
    //             headers: { 'Content-Type': 'application/json' }
    //         })
    //         return res.json()
    //     }

    //     try {
    //         if (favoritedCompanies.length > 0) saveFaves()
    //     } catch (e) {
    //         // handle error
    //     }

    // }, [favoritedCompanies]);

    const updateFavoritedCompaniesState = (ticker: string, favorited: boolean) => {

        for (let [index, item] of favoritedCompanies.entries()) {

            if (item.ticker === ticker) {
                setFavoritedCompanies(prevSt => {
                    let newSt = [...prevSt]
                    newSt[index].favorited = favorited
                    return newSt
                })
                break
            }
        }
    }

    const addToWatchList = async (ticker: string, favorited: boolean) => {
        const payload = { ticker, favorited, userId: userId };

        try {
            updateFavoritedCompaniesState(ticker, payload.favorited)
            const res = await axios.post('/api/add-to-favorites', payload, {
                headers: { 'Content-Type': 'application/json' }
            });

        } catch (e) { }
    }

    const onDragEndHandler = () => {
        console.log('onDragEndHandler fired')
    }

    // handle drag start. Tells us which index is currently grabbed
    // const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    //     draggedItem.current = index
    // }
    // // handle drag enter. Tells us the index over which item the dragged element is hovered over
    // const onDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    //     draggedItemDroppedOn.current = index
    // }
    // // handle drag end
    // const onDragEnd = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    //     handleSort()
    // }

    // // prevent the dragged item from 'ghosting' back to its original position
    // const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    //     e.preventDefault()
    // }

    // handle drag sorting
    // const handleSort = async () => {
    //     if (draggedItem?.current !== null && draggedItemDroppedOn.current !== null) {
    //         // Return if the dragged item is dropped in the same position in the list
    //         if (draggedItem.current === draggedItemDroppedOn.current) return

    //         let _favoritedCompanies = [...favoritedCompanies]

    //         // Copy and remove the contents of the currently dragged item from the list. Splice returns an array
    //         const draggedItemContent = _favoritedCompanies.splice(draggedItem.current, 1)[0]

    //         // Add the copy to list in its final index destination
    //         _favoritedCompanies.splice(draggedItemDroppedOn.current, 0, draggedItemContent)

    //         // Reset the refs for draggedItem and draggedItemDroppedOn
    //         draggedItem.current = null
    //         draggedItemDroppedOn.current = null

    //         // Set the state of the original array to the newly sorted one
    //         setFavoritedCompanies(_favoritedCompanies)
    //     }
    // }

    return (
        <Reorder.Group axis='y' values={favoritedCompanies} onReorder={setFavoritedCompanies} className='flex flex-col gap-2 p-2 max-h-[450px] overflow-y-auto' layoutScroll >
            {favoritedCompanies.length > 0 && favoritedCompanies.map((item: { ticker: string, name: string, favorited: boolean }, idx) => {
                return (
                    <Reorder.Item key={`id_${item.ticker}_favorited`} value={item} className='flex items-center w-full bg-white p-2 shadow-md' onDragEnd={onDragEndHandler} >
                        <div className='cursor-grab p-2' >
                            <IconContext.Provider value={{ size: '2em' }} >
                                <CgMenuGridO className='text-gray-300' />
                            </IconContext.Provider>
                        </div>
                        <FavoritedItem ticker={item.ticker} name={item.name} favorited={item.favorited} addToWatchList={addToWatchList} />
                    </Reorder.Item>
                )
            })}
        </Reorder.Group>
    )
}



export default Watchlist;