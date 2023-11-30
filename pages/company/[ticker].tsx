import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { prisma } from '@db/index';
import { CompanyOverview, StockData, Status, CustomError, EarningsData, EarningsCalendar } from '../../types';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { IconContext } from 'react-icons';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import ChartPicker from '@components/UI/ChartPicker';
import { dbDatetoString, formatNumberScale, isJSONEmpty } from '../../utils/utils';
import { Decimal } from '@prisma/client/runtime/library';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import Loading from '@components/UI/Loading';
import styles from '@styles/company/Profile.module.css';
import axios from 'axios';
import { getUserAuthInfo } from 'utils/serverAuthUtils';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  ticker: string
  details: CompanyOverview
  daily: StockData
  earnings: EarningsData
  earnings_calendar: EarningsCalendar[]
  status: Status
  isFavorited: boolean
};

const Profile = ({ ticker, details, daily, earnings, earnings_calendar, isFavorited }: Props) => {
  const [graphMode, setGraphMode] = useState(30);
  const [favorited, setFavorited] = useState(isFavorited);
  const { isLoggedIn, email, id: userId } = useSelector((state: RootState) => state.auth);

  const router = useRouter();

  const stockChart = () => {

    const optionsLine = {
      responsive: true,
      plugins: {
        legend: {
          // reverse: false,
          display: false
        }
      }
    }

    const labels = [...daily.labels.slice(0, graphMode).reverse()];
    const prices = [...daily.price.slice(0, graphMode).reverse()];

    const dataStock = {
      labels: labels,
      datasets: [{
        label: details.ticker,
        data: prices,
        borderColor: '#6366F1',
        backgroundColor: '#6366F1',
      }]
    }

    const buttons = [
      { title: '7d', clickHandler: stockGraphHandler, active: graphMode === 7, duration: 7 },
      { title: '14d', clickHandler: stockGraphHandler, active: graphMode === 14, duration: 14 },
      { title: '30d', clickHandler: stockGraphHandler, active: graphMode === 30, duration: 30 },
      { title: '90d', clickHandler: stockGraphHandler, active: graphMode === 90, duration: 90 }
    ]

    return (
      <div className='flex flex-col justify-center items-center w-full' >
        <Line options={optionsLine} data={dataStock} />
        <ChartPicker buttons={buttons} />
      </div>
    )
  }
  const priceChange = () => {
    const focusedArr = [...daily.price.slice(0, graphMode)]
    const currentPrice = parseFloat(`${focusedArr[0]}`)
    const prevPrice = parseFloat(`${focusedArr[graphMode - 1]}`)
    const priceChange = parseFloat(`${(currentPrice - prevPrice)}`).toFixed(2)
    const changePercent = ((parseFloat(priceChange) / prevPrice) * 100).toFixed(2)
    return (
      <span>{parseFloat(priceChange) < 0 ? `-$${Math.abs(parseFloat(priceChange)).toFixed(2)}` : `+$${priceChange}`} ({changePercent}%)</span>
    )
  }
  const companyDesc = () => <p className='text-sm sm:text-base'>{details.description}</p>;

  const companyStats = () => {
    return (
      <div className='flex flex-col w-full' >
        <div className={styles.overviewSection}>
          <span className='text-slate-500'>Ticker Symbol:</span> <span className='font-bold'>{details.ticker}</span>
        </div>
        <div className={styles.overviewSection}>
          <span className='text-slate-500'>Exchange:</span> <span className='font-bold'>{details.exchange}</span>
        </div>
        {details.marketcap && <div className={styles.overviewSection}><span className='text-slate-500'>Market Cap:</span> <span className='font-bold'>${formatNumberScale(parseFloat(details.marketcap))}</span></div>}
        {details.analysttargetprice && <div className={styles.overviewSection}><span className='text-slate-500'>Analyst Target Price:</span> <span className='font-bold'>${details.analysttargetprice}</span></div>}
        {details.sharesoutstanding && <div className={styles.overviewSection}><span className='text-slate-500'>Shares Outstanding:</span> <span className='font-bold'>{formatNumberScale(details.sharesoutstanding)}</span></div>}
        {details.forwardpe && <div className={styles.overviewSection}><span className='text-slate-500'>Forward PE:</span> <span className='font-bold'>{details.forwardpe}</span></div>}
        {details.movingavg50 && <div className={styles.overviewSection}><span className='text-slate-500'>50 Day Moving Avg:</span> <span className='font-bold'>${details.movingavg50}</span></div>}
        {details.movingavg200 && <div className={styles.overviewSection}><span className='text-slate-500'>200 Day Moving Avg:</span> <span className='font-bold'>${details.movingavg200}</span></div>}
        {details.fiscalyearend && <div className={styles.overviewSection}><span className='text-slate-500'>Fiscal Year End:</span> <span className='font-bold'>{details.fiscalyearend}</span></div>}
      </div>
    )
  }
  const earningsOverview = () => {
    const labels = earnings.labels.slice(0, 4).reverse()
    const reportedEps = earnings.reportedEPS.slice(0, 4).reverse()
    const estEps = earnings.estimatedEPS.slice(0, 4).reverse()

    const data = {
      labels: labels,
      datasets: [{
        label: 'Reported EPS',
        data: reportedEps,
        borderColor: '#F900BF',
        backgroundColor: '#F900BF',
      },
      {
        label: 'Estimated EPS',
        data: estEps,
        borderColor: '#293462',
        backgroundColor: '#293462',
      }
      ]
    }

    return (
      <>
        <h2 className='text-xl text-slate-500 mb-4 text-center'>Earnings:</h2>
        <Bar data={data} />
      </>
    )
  }
  const earningsCalendar = () => {
    const upcomingEarnings = earnings_calendar.map((i, idx) => {

      if (i.reportDate) {
        return (
          <div key={idx} className={styles.overviewSection}>
            <span>{i.reportDate}</span> <span>{i.estimate ? `$${i.estimate}` : '-'}</span>
          </div>
        )
      }
    })
    return (
      <>
        <h2 className='text-xl text-slate-500 text-center'>Upcoming Earnings:</h2>
        <div className={styles.overviewSection}>
          <span>Date</span><span>Estimated</span>
        </div>
        {upcomingEarnings}
      </>
    )
  }
  const stockGraphHandler = (days: number) => {
    setGraphMode(days)
  }
  const renderFavorited = () => {

    return (
      <IconContext.Provider value={{ size: '1.5em' }}>
        <div className='text-indigo-500 cursor-pointer hover:scale-110 duration-150' onClick={addToWatchList}>{favorited ? <FaStar /> : <FaRegStar />}</div>
      </IconContext.Provider>
    )
  }
  const addToWatchList = async () => {
    const payload = { ticker, favorited: !favorited, userId: userId };

    if (!isLoggedIn) {
      router.push('/signin');
      // signIn('email', { callbackUrl: router.asPath })
    } else {
      try {
        setFavorited(!favorited);
        const res = await axios.post('/api/add-to-favorites', payload, {
          headers: { 'Content-Type': 'application/json' }
        });

      } catch (e) { }
    }
  }

  const TitleDivider = () => (
    <div className='h-1 sm:h-2 w-24 bg-indigo-400 rounded-full'></div>
  );

  if (router.isFallback) return <Loading />;

  return (
    <div className='flex flex-col items-center gap-8 pt-36 mb-24'>
      <div className='flex flex-col items-center gap-2 mb-8 md:mb-24'>
        <h1 className='text-2xl sm:text-5xl' >{details.name}</h1>
        <TitleDivider />
      </div>
      <div className='flex flex-col md:flex-row justify-center gap-8 w-full md:mb-12'>
        <div className='flex flex-col items-center w-full md:w-1/2 px-2 py-8 bg-white shadow-lg rounded-lg'>
          <div className='flex justify-between mb-8 w-full'>
            <span>{daily.price.length && priceChange()}</span>
            <span>{renderFavorited()}</span>
          </div>
          {(daily.labels.length && daily.price.length) && stockChart()}
        </div>
        <div className='w-full md:w-1/3 px-2'>
          <p className='bg-yellow-200 rounded-md p-2 font-thin mb-8'>
            All data provided on Finflexi is provided for informational purposes only, and is not intended for trading or investing purposes. Stock prices displayed in the ticker are from a subset of exchanges, this price does not represent the real-time price.
          </p>
          {companyDesc()}
        </div>
      </div>
      <div className='flex justify-center flex-col md:flex-row gap-8 w-full md:px-4 '>
        <div className='flex flex-col md:flex-row w-full md:w-1/3 px-4 py-12 overflow-hidden'>
          {companyStats()}
        </div>
        <div className='w-full md:w-1/2 px-2 py-8 bg-white shadow-lg rounded-lg'>
          {earnings.labels.length > 0 ? earningsOverview() : <span className='text-indigo-500'>No Earnings Data Available</span>}
        </div>
      </div>
      <div className='flex flex-col items-center w-4/5'>
        {earnings_calendar.length > 0 && earningsCalendar()}
      </div>
    </div>
  )
}

const getCompanyOverview = async (ticker: string) => {
  const dataOverview = await prisma.companies.findFirst({ where: { ticker: ticker } })
  let company: { [key: string]: any } = {}
  if (dataOverview) {
    for (const [key, value] of Object.entries(dataOverview)) {
      if (typeof value === 'bigint') {
        company[key] = value.toString()
      } else if (value instanceof Date) {
        company[key] = dbDatetoString(value)
      } else if (value instanceof Decimal) {
        company[key] = value.toString();
      } else {
        company[key] = value
      }
    }
  }
  return company
}
const getDailyStockPrices = async (ticker: string) => {
  let labels = []
  let price = []
  const dataDaily = await prisma.stock_data_daily.findMany({
    where: {
      companyticker: ticker
    },
    orderBy: {
      date: 'desc'
    }
  });

  for (const item of dataDaily) {
    let d = null
    let p = null
    if (item['close'] != null) p = item['close'].toFixed(2)
    if (item['date'] != null) {
      d = dbDatetoString(item['date'])
    }
    labels.push(d)
    price.push(p)
  }

  return { labels, price }
}
const getReportedEarnings = async (ticker: string) => {
  const dataEPS = await prisma.earnings.findMany({ where: { companyticker: ticker } })
  let labels = []
  let reportedEPS = []
  let estimatedEPS = []
  for (const item of dataEPS) {
    let d = null
    if (item['reportedDate'] != null) {
      d = dbDatetoString(item['reportedDate'])
    }
    labels.push(d)
    reportedEPS.push(item['reportedEPS']?.toFixed(2) != undefined ? item['reportedEPS']?.toFixed(2) : null)
    estimatedEPS.push(item['estimatedEPS']?.toFixed(2) != undefined ? item['estimatedEPS']?.toFixed(2) : null)
  }
  return { labels, reportedEPS, estimatedEPS }
}
const getEarningsCalendar = async (ticker: string) => {
  const dataEarningsCal = await prisma.earnings_calendar.findMany({
    where: { companyticker: ticker },
    select: { reportDate: true, estimate: true }
  })

  let calendar = []
  let reportDate = null
  let estimate = null

  for (const item of dataEarningsCal) {
    const d = item['reportDate'] != null ? dbDatetoString(item['reportDate']) : null
    reportDate = (d)
    estimate = item['estimate'] ? item['estimate'].toString() : null
    calendar.push({ reportDate, estimate })
  }

  return calendar
}
const checkIsFavorited = async (ticker: string, userId: string) => {
  const companyFave = await prisma.watchlist.findFirst({ where: { companyticker: ticker, userId: userId } });
  if (!companyFave) return false;
  return true;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const authInfo = await getUserAuthInfo(context);
  const ticker = context.params?.ticker?.toString().trim().toLocaleUpperCase()
  let details: CompanyOverview | CustomError | {} | null = {}
  let daily: StockData | CustomError | {} = {}
  let earnings: EarningsData | CustomError | {} = {}
  let earnings_calendar: EarningsCalendar[] = []
  let status: Status = { status: "ok" }
  let isFavorited = false;

  if (ticker) {
    try {
      details = await getCompanyOverview(ticker);
      if (isJSONEmpty(details)) return { notFound: true };

      daily = await getDailyStockPrices(ticker);
      earnings = await getReportedEarnings(ticker);
      earnings_calendar = await getEarningsCalendar(ticker);
      isFavorited = authInfo.userId ? await checkIsFavorited(ticker, authInfo.userId) : false;

    } catch (err) {
      if (err instanceof Error) {
        status.message = err.message
        status.status = 'error'
      }
    }
  }

  return { props: { ticker, details, daily, earnings, earnings_calendar, status, isFavorited } }
}

export default Profile