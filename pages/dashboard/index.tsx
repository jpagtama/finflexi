import React, { useEffect } from 'react'
import { prisma } from '@db/index'
import { GetServerSidePropsContext } from 'next'
import { signIn, useSession } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js'
import Loading from '@components/UI/Loading'
import { dbDatetoString } from '../../utils/utils'
import styles from '@styles/Dashboard.module.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
    favorites: { order: number | null, company: { ticker: string, name: string } }[]
    upcoming_earnings: string
    stock_prices: { [key: string]: { price: string, date: string }[] }
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

    const goToCompany = (ticker: string) => {
        router.push(`/company/${ticker}`)
    }

    const renderStockCharts = () => {
        // Renders the top 5 favorited stocks
        const optionsLine = {
            responsive: true,
            scales: {
                x: { display: false },
                y: { display: false }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }

        let charts = []

        for (const i of favorites.slice(0, 5)) {
            const labels = stock_prices[i.company.ticker].map((item) => item.date).reverse().slice(-30)
            const prices = stock_prices[i.company.ticker].map((item) => item.price).reverse().slice(-30)

            const price_change = parseFloat(prices[prices.length - 1]) - parseFloat(prices[0])
            const percent_change = Math.abs(price_change) / parseFloat(prices[0]) * 100
            const date_range = `${labels[0]}-${labels[labels.length - 1]}`

            const dataStock = {
                chartData: {
                    labels: labels,
                    datasets: [{
                        label: i.company.ticker,
                        data: prices,
                        borderColor: '#f900bf',
                        backgroundColor: '#f900bf',
                    }]
                },
                stockDetails: {
                    ticker: i.company.ticker,
                    name: i.company.name,
                    price_change,
                    percent_change,
                    date_range
                }

            }
            charts.push(dataStock)
        }

        return (
            charts.map((i, idx) => (
                <div key={idx} className={styles.chartContainer} onClick={() => goToCompany(i.stockDetails.ticker)}>
                    <div className={styles.stockDetailsContainerTop}>
                        <span>
                            {i.stockDetails.price_change > 0 ? `+$${i.stockDetails.price_change.toFixed(2)}` : `-$${Math.abs(i.stockDetails.price_change).toFixed(2)}`} ({i.stockDetails.percent_change.toFixed(2)}%)
                        </span>
                        <span style={{ fontWeight: '300' }}>{i.stockDetails.date_range}</span>
                    </div>
                    <Line options={optionsLine} data={i.chartData} />
                    <div className={styles.stockDetailsContainerBottom}>
                        <span>{i.stockDetails.name}</span>
                        <span>{i.stockDetails.ticker}</span>
                    </div>
                </div>
            ))
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.chartSection}>
                {Object.keys(stock_prices).length && renderStockCharts()}
            </div>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)
    const today = new Date()
    let favorites: { order: number | null; company: { ticker: string; name: string | null; }; }[] = []
    let upcoming_earnings: { ticker: string; name: string, date: string; }[] = []
    let calendar = []
    let stock_prices: { [key: string]: { price: string, date: string }[] } = {}
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
            },
        })

        const daily_prices_formatted: { [key: string]: { price: string, date: string }[] } = {}
        for (const i of daily_prices) {
            if (i.companyticker in daily_prices_formatted) {
                daily_prices_formatted[i.companyticker].push({ price: i.close ? i.close.toString() : '', date: i.date ? dbDatetoString(i.date) : '' })
            } else {
                daily_prices_formatted[`${i.companyticker}`] = []
                daily_prices_formatted[`${i.companyticker}`].push({ price: i.close ? i.close.toString() : '', date: i.date ? dbDatetoString(i.date) : '' })
            }
        }

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
        stock_prices = daily_prices_formatted

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