import React, { useEffect, useState } from 'react'
import { GetServerSidePropsContext } from 'next';
import Loading from '@components/UI/Loading';
import { prisma } from '@db/index';
import { useRouter } from 'next/router';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ChartType } from 'chart.js';
import Watchlist from './Watchlist';
import { dbDatetoString, formatNumberScale } from '../../utils/utils';
import { getUserAuthInfo } from '../../utils/serverAuthUtils';
import ModalAlert from '@components/UI/ModalAlert';
import { useDispatch } from 'react-redux';
import { authActions } from '@store/index';
import { AnimatePresence } from 'framer-motion';
import incomeStatements from 'utils/incomeStatements';
import { IoCalendarOutline } from "react-icons/io5";
import { CiViewList, CiMoneyCheck1 } from "react-icons/ci";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

type IncomeStatement = {
    "ticker": string
    "fiscalDateEnding": string
    "reportedCurrency": string
    "grossProfit": string
    "totalRevenue": string
    "costOfRevenue": string
    "costofGoodsAndServicesSold": string
    "operatingIncome": string
    "sellingGeneralAndAdministrative": string
    "researchAndDevelopment": string
    "operatingExpenses": string
    "investmentIncomeNet": string
    "netInterestIncome": string
    "interestIncome": string
    "interestExpense": string
    "nonInterestIncome": string
    "otherNonOperatingIncome": string
    "depreciation": string
    "depreciationAndAmortization": string
    "incomeBeforeTax": string
    "incomeTaxExpense": string
    "interestAndDebtExpense": string
    "netIncomeFromContinuingOperations": string
    "comprehensiveIncomeNetOfTax": string
    "ebit": string
    "ebitda": string
    "netIncome": string
}

type Props = {
    isLoggedIn: boolean;
    email?: string;
    userId?: string;
    favorites: [{ company: { name: string, ticker: string }, order: number | null, id: string }]
    upcoming_earnings: { ticker: string, name: string, date: string }[]
    stock_prices: { [key: string]: { price: string, date: string }[] }
    income_statements: [IncomeStatement]
}

const Dashboard = ({ isLoggedIn, email, userId, favorites, upcoming_earnings, stock_prices, income_statements }: Props) => {
    const dispatch = useDispatch();
    const [openDayEarnings, setOpenDayEarnings] = useState(false);
    const [dayEvents, setDayEvents] = useState<string[]>([]);
    const [incomeStatementCompany, setIncomeStatementCompany] = useState<string>(favorites[0]?.company.ticker);

    useEffect(() => {
        if (!isLoggedIn) router.replace('/signin');
        if (isLoggedIn) {
            const payload = {
                email: email,
                id: userId,
                firstName: '',
                lastName: ''
            }
            dispatch(authActions.login(payload));
        }

    }, [isLoggedIn]);

    const router = useRouter();

    const goToCompany = (ticker: string) => {
        router.push(`/company/${ticker}`)
    }

    const renderStockCharts = () => {

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

        for (const i of favorites) {
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
                        borderColor: '#A5B4FC',
                        backgroundColor: '#A5B4FC',
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
                <div key={`id_${i.stockDetails.ticker}_stockchart_${idx}`} className='flex flex-col justify-center items-center bg-white h-[250px] w-full sm:w-[300px] p-4 cursor-pointer rounded-md border hover:border-indigo-500 duration-150' onClick={() => goToCompany(i.stockDetails.ticker)}>
                    <div className='flex justify-between items-center w-full'>
                        <span className={`${i.stockDetails.price_change > 0 ? 'text-green-600' : 'text-red-700'} text-md`}>
                            {i.stockDetails.price_change > 0 ? `+$${i.stockDetails.price_change.toFixed(2)}` : `-$${Math.abs(i.stockDetails.price_change).toFixed(2)}`} ({i.stockDetails.percent_change.toFixed(2)}%)
                        </span>
                        <span className='text-xs font-thin' >{i.stockDetails.date_range}</span>
                    </div>
                    <div className='flex justify-center items-center w-full h-full'>
                        <Line options={optionsLine} data={i.chartData} />
                    </div>
                    <div className='flex justify-between w-full'>
                        <span className='font-thin'>{i.stockDetails.name}</span>
                        <span >{i.stockDetails.ticker}</span>
                    </div>
                </div>
            ))
        )
    }

    const renderUpcomingEarnings = () => {
        let events: { date: Date, event: string[] }[] = [];

        for (const i of upcoming_earnings) {
            const date = new Date(i.date);
            const idx = events.findIndex(item => `${item.date.getMonth() + 1}/${item.date.getDate()}/${item.date.getFullYear()}` === `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
            if (idx < 0) events.push({ date, event: [`${i.name}`] });
            else events[idx].event.push(i.name);
        }

        return <div className='flex md:flex-row gap-8 w-full'>
            <div className='flex flex-col gap-8 w-full p-4'>
                <h2 className='text-2xl w-full' >Upcoming Earnings</h2>
                <ul className='flex flex-col gap-2'>
                    {upcoming_earnings.map((i, idx) => <li key={`id_${i.name}_earnings_${idx}`} className='flex justify-between w-full'><span className='text-slate-500'>{i.name}</span><span className='font-thin' >{i.date}</span></li>)}
                </ul>
            </div>
        </div>
    }

    const renderIncomeStatements = () => {
        const selectedCompany = incomeStatementCompany;
        if (!income_statements) return <h2>Add a company to your favorites to view income statements</h2>;

        const incomeStatementData = income_statements.find((record) => record.ticker.includes(selectedCompany));

        if (!incomeStatementData) return <div className='flex justify-center items-center w-full h-full border border-slate-300'>
            <p className='text-slate-500'>Income Statements for this company are not available at the moment</p>
        </div>;

        const getBarColor = () => {
            return (ctx: any) => {
                const start = ctx.parsed._custom.start;
                const end = ctx.parsed._custom.end;

                let color = 'gainsboro'
                switch (ctx.dataIndex) {
                    case 0: // Revenue
                        color = start > 0 ? 'mediumseagreen' : 'lightcoral';
                        break;
                    case 1: // Revenue cost
                        color = 'lightcoral';
                        break;
                    case 2: // Gross Profit
                        color = start > 0 ? 'mediumseagreen' : 'lightcoral';
                        break;
                    case 3: // Operating Expenses
                        color = 'lightcoral';
                        break;
                    case 4: // Operating Income
                        color = start > 0 ? 'mediumseagreen' : 'lightcoral';
                        break;
                    case 5: // COGs sold, EBITDA, etc.
                        color = 'lightcoral';
                        break;
                    case 6: // Income before Tax
                        color = start > 0 ? 'mediumseagreen' : 'lightcoral';
                        break;
                    case 7: // Income Tax Expense
                        color = start < end ? 'mediumseagreen' : 'lightcoral';
                        break;
                    case 8: // Net Income
                        color = start > 0 ? 'mediumseagreen' : 'lightcoral';
                        break;
                    default:
                        color = 'gainsboro';
                }
                return color;
            }
        }

        const incomeBeforeTax = [incomeStatementData.incomeBeforeTax, parseInt(incomeStatementData.incomeBeforeTax) - parseInt(incomeStatementData.incomeTaxExpense)];
        const nonOperatingIncome = [incomeStatementData.operatingIncome, incomeStatementData.incomeBeforeTax];

        const data = {
            labels: ['Revenue', 'Cost of Revenue', 'Gross Profit', 'Operating Expenses', 'Operating Income', 'COGs Sold, EBITDA, etc.', 'Income before Tax', 'Income Tax Expense', 'Net Income'],
            datasets: [{
                label: `${selectedCompany} - ${incomeStatementData.fiscalDateEnding}`,
                data: [
                    [incomeStatementData.totalRevenue, 0],
                    [incomeStatementData.totalRevenue, parseInt(incomeStatementData.totalRevenue) - parseInt(incomeStatementData.costOfRevenue)],
                    [incomeStatementData.grossProfit, 0],
                    [incomeStatementData.grossProfit, parseInt(incomeStatementData.grossProfit) - parseInt(incomeStatementData.operatingExpenses)],
                    [incomeStatementData.operatingIncome, 0],
                    nonOperatingIncome,
                    [incomeStatementData.incomeBeforeTax, 0],
                    incomeBeforeTax,
                    [incomeStatementData.netIncome, 0],
                ],
                elements: {
                    bar: {
                        backgroundColor: getBarColor(),
                        borderWidth: 1,
                        borderSkipped: true
                    }
                },
            }],
        }

        const options = {
            plugins: {
                legend: {
                    onClick: () => { },
                    labels: {
                        boxWidth: 0
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context: any) {
                            // Get the original value from the data array
                            const value = context.dataset.data[context.dataIndex][0] - context.dataset.data[context.dataIndex][1];
                            // Format the value as you wish
                            return "$" + formatNumberScale(value);
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: function (value: any) {
                            return "$" + formatNumberScale(value);
                        }
                    }
                }
            }
        };

        return (
            <Bar data={data} options={options} />
        );
    }

    if (!isLoggedIn) return <div className='min-h-screen w-full pt-36'><Loading /></div>;

    if (!favorites.length) {
        return (
            <div className='flex flex-col items-center gap-24 min-h-screen w-full pt-36 px-4'>
                <h2 className='font-bold text-indigo-500 text-5xl text-center'>Welcome to your Dashboard!</h2>
                <div className='flex justify-center gap-8 w-full'>
                    <CiViewList className='h-24 w-24 text-pink-800' />
                    <CiMoneyCheck1 className='h-24 w-24 text-pink-800' />
                    <IoCalendarOutline className='h-24 w-24 text-pink-800' />
                </div>
                <p className='font-thin text-xl text-center'>Start by adding a company to your favorites</p>
            </div>
        )
    }

    return (
        <>
            <AnimatePresence>
                {openDayEarnings && <ModalAlert title={'Upcoming Earnings'} content={dayEvents} closeModalHandler={() => setOpenDayEarnings(false)} />}
            </AnimatePresence>
            <div className='flex flex-col items-center gap-8 min-h-screen w-full pt-36 px-4 mb-24'>
                <h1 className='text-5xl'><span className='font-bold'>DASH</span><span>board</span></h1>

                <section className='flex flex-col md:flex-row gap-4 w-full'>
                    <div className='flex flex-col w-full md:w-1/2 max-h-[525px] bg-gray-100 shadow-lg rounded-md'>
                        <h2 className='text-2xl bg-pink-800 py-4 w-full text-white rounded-t-md pl-4 shadow-md'>Watchlist</h2>
                        <div className='w-full'>
                            <Watchlist companies={favorites} />
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-4 w-full h-full max-h-[525px] overflow-y-auto bg-gray-100 p-4' >
                        {Object.keys(stock_prices).length > 0 && renderStockCharts()}
                    </div>
                </section>
                <div className='flex flex-col md:flex-row gap-8 w-full'>
                    <section className='flex flex-col w-full md:w-1/3 bg-gray-100 h-[300px] md:h-[525px] self-start overflow-y-scroll'>
                        {upcoming_earnings.length === 0 && <p className='self-center text-slate-500 mt-8'>Companies with upcoming earnings data will appear here</p>}
                        {upcoming_earnings.length > 0 && renderUpcomingEarnings()}
                    </section>
                    <section className='flex flex-col gap-8 max-h-[500px] w-full md:w-1/2'>
                        {!income_statements.length && <p className='text-slate-500 mt-8'>Income statements will appear here</p>}
                        {income_statements.length > 0 && <>
                            <div className='flex justify-between w-full'>
                                <h2 className='text-2xl' >Income Statements</h2>
                                <select className='border w-1/3 rounded-md shadow-md bg-white' onChange={(e) => setIncomeStatementCompany(e.target.value)}>
                                    {favorites.map((record) => <option key={`income_statement_id_${record.company.ticker}`} value={record.company.ticker}>{record.company.ticker}</option>)}
                                </select>
                            </div>
                            {renderIncomeStatements()}
                        </>
                        }
                    </section>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const authInfo = await getUserAuthInfo(context); // use this to check user credentials before accessing protected pages
    const isLoggedIn = authInfo.isLoggedIn;
    const email = authInfo.email;
    const userId = authInfo.userId;

    if (!isLoggedIn || !userId) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false
            }
        }
    }

    const today = new Date()
    let favorites: { order: number | null; company: { ticker: string; name: string | null; }; }[] = []
    let upcoming_earnings: { ticker: string; name: string, date: string; }[] = []
    let calendar = []
    let stock_prices: { [key: string]: { price: string, date: string }[] } = {}
    let income_statements: IncomeStatement[] = [];

    try {
        // Get the users favorite companies with details
        const companies = await prisma.watchlist.findMany({
            where: { userId: userId },
            orderBy: { order: 'asc' },
            select: {
                order: true,
                id: true,
                company: {
                    select: {
                        ticker: true,
                        name: true,
                    }
                }
            }
        })

        income_statements = incomeStatements().filter((statement: IncomeStatement) => {
            return companies.map((c) => c.company.ticker).includes(statement.ticker);
        });

        const daily_prices = await prisma.stock_data_daily.findMany({
            where: {
                companyticker: {
                    in: companies.map((row) => row.company.ticker),
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

        // sort by date
        let formattedEarnings: { companyticker: string, companies: { name: string | null }, reportDate: Date }[] = []
        if (earnings.length) formattedEarnings = earnings.sort((a, b) => a.reportDate.valueOf() - b.reportDate.valueOf())

        for (const i of earnings) {
            if (i.reportDate && i.reportDate >= today) {
                calendar.push({ ticker: i.companyticker, name: i.companies.name ? i.companies.name : '', date: dbDatetoString(i.reportDate) })
            }
        }

        favorites = companies
        upcoming_earnings = calendar
        stock_prices = daily_prices_formatted

    } catch (e) { }

    return {
        props: {
            isLoggedIn,
            email,
            userId,
            favorites,
            upcoming_earnings,
            stock_prices,
            income_statements
        }
    }
}

export default Dashboard;