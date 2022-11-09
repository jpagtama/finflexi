import React, { useEffect } from 'react'
import { prisma } from '@db/index'
import { GetServerSidePropsContext } from 'next'
import { signIn, useSession } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Divider from '@components/UI/Divider'
import { dbDatetoString } from '../../utils/utils'
import styles from '@styles/Dashboard.module.css'
import Loading from '@components/UI/Loading'

interface Props {
    favorites: string
    upcoming_earnings: string
    stock_prices: string
}

const Dashboard = ({ favorites, upcoming_earnings, stock_prices }: Props) => {
    useEffect(() => {
        console.log('upcoming_earnings :>> ', upcoming_earnings);
        console.log('favorites :>> ', favorites);
        console.log('stock_prices :>> ', stock_prices);
    }, [])

    const router = useRouter()

    const { status: sessionStatus } = useSession({
        required: true,
        onUnauthenticated() {
            signIn('email', { callbackUrl: router.asPath })
        }
    })

    if (sessionStatus === 'loading') return <div className={styles.loadingContainer}><Loading /></div>

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Dashboard</h1>
            <Divider />

        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)
    const today = new Date()
    let favorites: { order: number | null; company: { ticker: string; name: string | null; }; }[] = []
    let upcoming_earnings: { ticker: string; name: string, date: string; }[] = []
    let calendar = []
    let stock_prices: { ticker: string, date: string, close: string }[] = []
    try {
        const userId = session?.userId

        // Get the users favorite companies with details
        const companies = await prisma.watchlist.findMany({
            where: { userId: userId },
            orderBy: { order: 'asc' },
            select: {
                order: true,
                company: {
                    select: {
                        ticker: true,
                        name: true,
                    }
                }
            }
        })

        const topFive = companies.slice(0, 5)

        const daily_prices = await prisma.stock_data_daily.findMany({
            where: {
                companyticker: {
                    in: topFive.map((row) => row.company.ticker),
                },
            },
            select: {
                companyticker: true,
                date: true,
                close: true
            }
        })

        const earnings = await prisma.earnings_calendar.findMany({
            where: {
                companyticker: {
                    in: companies.map((row) => row.company.ticker)
                }
            },
            select: {
                companyticker: true,
                reportDate: true,
                companies: {
                    select: {
                        name: true
                    }
                }
            }
        })

        for (const i of earnings) {
            if (i.reportDate && i.reportDate >= today) {
                calendar.push({ ticker: i.companyticker, name: i.companies.name ? i.companies.name : '', date: dbDatetoString(i.reportDate) })
            }
        }

        favorites = companies
        upcoming_earnings = calendar
        stock_prices = daily_prices.map((i) => {
            return { ticker: i.companyticker, close: i.close ? i.close.toFixed(2) : '', date: i.date ? dbDatetoString(i.date) : '' }
        })

    } catch (e) {
        if (e instanceof Error) console.log('error occurred: ', e.message)
    }

    return {
        props: {
            favorites,
            upcoming_earnings,
            stock_prices
        }
    }
}

export default Dashboard