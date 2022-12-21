import React, { useState, useRef, useEffect } from 'react'
import { prisma } from '@db/index'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import touchIcon from '../../public/touchfave_icon_300x300.svg'
import FavoritedItem from '@components/dashboard/FavoritedItem'
import Loading from '@components/UI/Loading'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'
import styles from '@styles/company/Favorites.module.css'

interface Props {
    isAuthorized: boolean,
    favoritedCompanies: [{
        company: {
            name: string,
            ticker: string
        },
        order: number | null,
        id: string
    }],
    status: {
        message: string,
        success: boolean
    }
}

interface ExtraSessionData extends Session {
    userId: string
}

const Favorites = ({ isAuthorized, favoritedCompanies: companies, status }: Props) => {
    const { data: sessionData, status: sessionStatus } = useSession({
        required: true,
        onUnauthenticated() {
            signIn('email', { callbackUrl: router.asPath })
        }
    })

    const router = useRouter()
    let draggedItem = useRef<number | null>(null)
    let draggedItemDroppedOn = useRef<number | null>(null)

    const formatReqCompanies = (companies: { company: { name: string, ticker: string }, order: number | null, id: string }[]) => {
        // Formats the companies we retrieved from the server
        return companies.map((item, i) => ({
            id: item.id, ticker: item.company.ticker, name: item.company.name, favorited: true, order: item.order
        }))
    }

    const req_companies = status ? formatReqCompanies(companies) : []

    const [favoritedCompanies, setFavoritedCompanies] = useState<{ ticker: string, name: string, favorited: boolean, order: number | null, id: string }[]>(req_companies)

    useEffect(() => {
        // Save the order of the list
        const saveFaves = async () => {
            const payload = { companies: favoritedCompanies }
            const res = await fetch('/api/save-favorites', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' }
            })
            return res.json()
        }

        try {
            if (isAuthorized && favoritedCompanies.length > 0) saveFaves()
        } catch (e) {
            // handle error
        }

    }, [isAuthorized, favoritedCompanies])

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
        const payload = { ticker, favorited, userId: (sessionData as ExtraSessionData)?.userId }

        try {
            updateFavoritedCompaniesState(ticker, payload.favorited)
            const res = await fetch('/api/add-to-favorites', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' }
            })
        } catch (e) {
            if (e instanceof Error) console.log(e.message)
        }
    }

    const renderNone = () => {
        return (
            <div className={styles.noFavorites}>
                <p>Looks like there&apos;s nothing here...</p>
                <Image className={styles.touchIcon} src={touchIcon} alt="touch favorite icon" />
                <p>Start by searching a company and clicking the star icon to add to favorites</p>
            </div>
        )
    }



    // handle drag start. Tells us which index is currently grabbed
    const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        draggedItem.current = index
    }
    // handle drag enter. Tells us the index over which item the dragged element is hovered over
    const onDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        draggedItemDroppedOn.current = index
    }
    // handle drag end
    const onDragEnd = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        handleSort()
    }

    // prevent the dragged item from 'ghosting' back to its original position
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    // handle drag sorting
    const handleSort = async () => {
        if (draggedItem?.current !== null && draggedItemDroppedOn.current !== null) {
            // Return if the dragged item is dropped in the same position in the list
            if (draggedItem.current === draggedItemDroppedOn.current) return

            let _favoritedCompanies = [...favoritedCompanies]

            // Copy and remove the contents of the currently dragged item from the list. Splice returns an array
            const draggedItemContent = _favoritedCompanies.splice(draggedItem.current, 1)[0]

            // Add the copy to list in its final index destination
            _favoritedCompanies.splice(draggedItemDroppedOn.current, 0, draggedItemContent)

            // Reset the refs for draggedItem and draggedItemDroppedOn
            draggedItem.current = null
            draggedItemDroppedOn.current = null

            // Set the state of the original array to the newly sorted one
            setFavoritedCompanies(_favoritedCompanies)
        }
    }

    const renderFavorites = () => {
        const companies = favoritedCompanies.map((item: { ticker: string, name: string, favorited: boolean }, idx) => renderItem(item, idx))
        return <div className={styles.listContainer}>{companies}</div>
    }

    const renderItem = (item: { ticker: string, name: string, favorited: boolean }, index: number) => {
        return (
            <FavoritedItem
                key={item.ticker}
                idx={index}
                ticker={item.ticker}
                name={item.name}
                favorited={item.favorited}
                addToWatchList={addToWatchList}
                onDragStart={onDragStart}
                onDragEnter={onDragEnter}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            />
        )
    }

    if (sessionStatus === 'loading') return <div className={styles.loadingContainer}><Loading /></div>

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Favorites</h1>
            {!isAuthorized && <h1>Please sign in to continue</h1>}
            {favoritedCompanies.length > 0 && renderFavorites()}
            {favoritedCompanies.length === 0 && renderNone()}
        </div>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getSession(context)
    const userId = (session as ExtraSessionData)?.userId

    const isAuthorized = session !== null
    if (!isAuthorized) {
        return {
            props: {
                isAuthorized: false,
                favoritedCompanies: [],
                status: {
                    success: false,
                    message: 'user is not authorized'
                }
            }
        }
    }

    let status = 200
    let message = 'ok'
    let success = true
    let data = {}

    try {
        data = await prisma.watchlist.findMany({
            where: { userId: userId },
            orderBy: {
                order: 'asc'
            },
            select: {
                order: true,
                id: true,
                company: {
                    select: {
                        ticker: true,
                        name: true
                    }
                }
            }
        })

        return {
            props: {
                isAuthorized,
                favoritedCompanies: data,
                status: {
                    success,
                    message
                }
            }
        }

    } catch (e) {
        status = 500
        success = false
        message = e instanceof Error ? e.message : 'unable to retrieve companies'

        return {
            props: {
                isAuthorized: isAuthorized,
                favoritedCompanies: [],
                status: {
                    success,
                    message
                }
            }
        }
    }


}



export default Favorites