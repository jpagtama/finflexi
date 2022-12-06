import React, { useState, useEffect, useCallback } from 'react'
import update from 'immutability-helper'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import FavoritedItem from '@components/dashboard/FavoritedItem'
import Loading from '@components/UI/Loading'
import styles from '@styles/company/Favorites.module.css'

const Favorited = () => {
    const [favoritedCompanies, setFavoritedCompanies] = useState<{ ticker: string, name: string, favorited: boolean }[]>([])
    const router = useRouter()

    const { data: sessionData, status: sessionStatus } = useSession({
        required: true,
        onUnauthenticated() {
            signIn('email', { callbackUrl: router.asPath })
        }
    })

    const getFavorites = async (url: string) => {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }

    const { data: favorites, error } = useSWR(`/api/get-favorites?id=${sessionData?.userId}`, getFavorites)

    useEffect(() => {
        if (favorites?.data.length) {
            setFavoritedCompanies(favorites.data.map((item: { [company: string]: { name: string, ticker: string } }) => (
                { ticker: item.company.ticker, name: item.company.name, favorited: true })
            ))
        }
    }, [favorites?.data])

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
        const payload = { ticker, favorited, userId: sessionData?.userId }

        try {
            const res = await fetch('/api/add-to-favorites', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            updateFavoritedCompaniesState(ticker, payload.favorited)
        } catch (e) {
            if (e instanceof Error) console.log(e.message)
        }
    }

    const renderNone = () => {
        return (
            <div className={styles.noFavorites}>
                <p>Looks like there's nothing here...</p>
                <p>Start by searching a company and clicking the star icon to add to favorites</p>
            </div>
        )
    }

    const renderFavorites = () => {
        const companies = favoritedCompanies.map((item: { ticker: string, name: string, favorited: boolean }, idx) => renderItem(item, idx))
        return <ul className={styles.listContainer}>{companies}</ul>
    }

    const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
        setFavoritedCompanies((prevItems) =>
            update(prevItems, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevItems[dragIndex]],
                ],
            }),
        )
    }, [])

    const renderItem = useCallback((item: { ticker: string, name: string, favorited: boolean }, index: number) => {
        return (
            <FavoritedItem
                key={item.ticker}
                idx={index}
                ticker={item.ticker}
                name={item.name}
                favorited={item.favorited}
                addToWatchList={addToWatchList}
                moveItem={moveItem}
            />
        )
    }, [])

    if (sessionStatus === 'loading') return <div className={styles.loadingContainer}><Loading /></div>

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Favorites</h1>
            {favorites?.data?.length > 0 && renderFavorites()}
            {favorites?.data?.length === 0 && renderNone()}
        </div>
    )
}



export default Favorited