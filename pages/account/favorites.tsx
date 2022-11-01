import React, { useState, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import styles from '@styles/company/Favorites.module.css'
import Link from 'next/link'

const Favorited = () => {
    const [favoritedCompanies, setFavoritedCompanies] = useState([])
    const router = useRouter()

    const { data: sessionData, status } = useSession({
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

    // useEffect(() => {
    //     console.log('favorites :>>', favorites?.data)
    // }, [])

    if (status === 'loading') return <p>loading...</p>

    const renderFavorites = () => {
        const companies = favorites.data.map((item: { [key: string]: any }) => (
            <Link key={item.company.ticker} href={`/company/${item.company.ticker}`} >
                <a>
                    <li className={`${styles.listItem}`}>
                        <span className={styles.ticker}>{item.company.ticker}</span>
                        <span className={styles.companyName}>{item.company.name}</span>
                    </li>
                </a>
            </Link>
        ))
        return <ul className={styles.listContainer}>{companies}</ul>
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Favorites</h1>
            {favorites?.data?.length > 0 && renderFavorites()}

        </div>
    )
}



export default Favorited