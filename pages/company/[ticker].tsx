import { useState } from 'react'
import { GetStaticPropsContext } from 'next'
import { prisma } from '@db/index'
import { CompanyOverview, StockPrice, StockData, Status, CustomError, EarningsData, EarningsCalendar } from '../../types'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import ChartPicker from '@components/UI/ChartPicker'
import { dbDatetoString, isJSONEmpty } from '../../utils/utils'
import { Decimal } from '@prisma/client/runtime'
import styles from '@styles/company/Profile.module.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  details: CompanyOverview
  daily: StockData
  earnings: EarningsData
  earnings_calendar: EarningsCalendar[]
  status: Status
}

const Profile = ({ details, daily, earnings, earnings_calendar }: Props) => {
  console.log('props :>> ', [details, daily, earnings, earnings_calendar]);
  const [graphMode, setGraphMode] = useState(30)

  const stockChart = () => {

    const optionsLine = {
      responsive: true,
      plugins: {
        legend: {
          reverse: true,
          display: false
        }
      }
    }

    // let labels: string[] = []
    // let prices: number[] = []

    const labels = daily.labels.slice(0, graphMode).reverse()
    const prices = daily.price.slice(0, graphMode).reverse()

    const dataStock = {
      labels: labels,
      datasets: [{
        label: details.ticker,
        data: prices,
        borderColor: '#f900bf',
        backgroundColor: '#f900bf',
      }]
    }

    const buttons = [
      { title: '7d', clickHandler: stockGraphHandler, active: graphMode === 7, duration: 7 },
      { title: '2wk', clickHandler: stockGraphHandler, active: graphMode === 14, duration: 14 },
      { title: '1m', clickHandler: stockGraphHandler, active: graphMode === 30, duration: 30 },
      { title: '3m', clickHandler: stockGraphHandler, active: graphMode === 90, duration: 90 }
    ]

    return (
      <div className={styles.chartContainer}>
        <Line options={optionsLine} data={dataStock} />
        <ChartPicker buttons={buttons} />
      </div>
    )
  }
  const companyOverview = () => {
    return (
      <>
        <h2 className={styles.descLabel}>Description:</h2>
        <p className={styles.desc}>{details.description}</p>

        <h2 className={styles.descLabel}>Stats:</h2>
        <div className={styles.overviewContainer}>
          <div className={styles.overviewSection}>
            <span>Ticker Symbol:</span> <span>{details.ticker}</span>
          </div>
          <div className={styles.overviewSection}>
            <span>Exchange:</span> <span>{details.exchange}</span>
          </div>
          {details.marketcap && <div className={styles.overviewSection}><span>Market Cap:</span> <span>{details.marketcap}</span></div>}
          {details.analysttargetprice && <div className={styles.overviewSection}><span>Analyst Target Price:</span> <span>${details.analysttargetprice}</span></div>}
          {details.sharesoutstanding && <div className={styles.overviewSection}><span>Shares Outstanding:</span> <span>{details.sharesoutstanding}</span></div>}
          {details.forwardpe && <div className={styles.overviewSection}><span>Forward PE:</span> <span>{details.forwardpe}</span></div>}
          {details.movingavg50 && <div className={styles.overviewSection}><span>50 Day Moving Avg:</span> <span>${details.movingavg50}</span></div>}
          {details.movingavg200 && <div className={styles.overviewSection}><span>200 Day Moving Avg:</span> <span>${details.movingavg200}</span></div>}
          {details.fiscalyearend && <div className={styles.overviewSection}><span>Fiscal Year End:</span> <span>{details.fiscalyearend}</span></div>}
        </div>
      </>
    )
  }
  const earningsOverview = () => {
    const labels = earnings.labels.slice(0, 4).reverse()
    const reportedEps = earnings.reportedEPS.slice(0, 4).reverse()
    const estEps = earnings.estimatedEPS.slice(0, 4).reverse()

    const options: ChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: false,
          text: ''
        }
      }
    }
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
        <h2 className={styles.descLabel}>Earnings:</h2>
        <Bar options={options} data={data} />
      </>
    )
  }

  const earningsCalendar = () => {
    // console.log('earnings_calendar from PROFILE', earnings_calendar)
    const upcomingEarnings = earnings_calendar.map(i => {

      if (i.reportDate) {
        return (
          <div key={i.reportDate} className={styles.overviewSection}>
            <span>{i.reportDate}</span> <span>{i.estimate ? `$${i.estimate}` : '-'}</span>
          </div>
        )
      }
    })
    return (
      <>
        <h2 className={styles.descLabel}>Upcoming Earnings:</h2>
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

  return (
    <div className={styles.companyProfileContainer}>
      <h1 className={styles.companyName} >{details.name}</h1>
      {stockChart()}
      {companyOverview()}
      {earnings.labels.length > 0 && earningsOverview()}
      {earnings_calendar.length > 0 && earningsCalendar()}
    </div>
  )
}

export const getStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      { params: { ticker: 'AAPL' } },
      { params: { ticker: 'TSLA' } },
      { params: { ticker: 'AMZN' } },
      { params: { ticker: 'MSFT' } },
      { params: { ticker: 'GOOG' } },
      { params: { ticker: 'GOOGL' } },
      { params: { ticker: 'JNJ' } },
      { params: { ticker: 'GME' } },
      { params: { ticker: 'BBBY' } },
    ]
  }
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
        company[key] = value.toString()
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
  const dataDaily = await prisma.stock_data_daily.findMany({ where: { companyticker: ticker } })
  // const updatedDaily = JSON.stringify(dataDaily, (_key, value) => {
  //   return typeof value === 'bigint' ? value = value.toString() : value
  // })
  for (const item of dataDaily) {
    let d = null
    if (item['date'] != null) {
      d = dbDatetoString(item['date'])
    }
    labels.push(d)
    price.push(item['close']?.toFixed(2))
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
    reportedEPS.push(item['reportedEPS']?.toFixed(2))
    estimatedEPS.push(item['estimatedEPS']?.toFixed(2))
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

export const getStaticProps = async (context: GetStaticPropsContext) => {

  const ticker = context.params?.ticker?.toString().trim()
  let details: CompanyOverview | CustomError | {} | null = {}
  let daily: StockData | CustomError | {} = {}
  let earnings: EarningsData | CustomError | {} = {}
  let earnings_calendar: EarningsCalendar[] = []
  let status: Status = { status: "ok" }

  if (ticker) {
    try {
      const overview = await getCompanyOverview(ticker)
      // console.log('overview ->', overview)

      const dailyStockPrices = await getDailyStockPrices(ticker)
      // console.log('dailyStockPrices from fun->', dailyStockPrices)

      const updatedEPS = await getReportedEarnings(ticker)
      // console.log('updatedEPS from func ->', updatedEPS)

      const earningsCalendar = await getEarningsCalendar(ticker)
      // console.log('earningsCalendar ->', earningsCalendar)

      details = overview
      // daily -> { labels, price }
      daily = dailyStockPrices
      // earnings -> { labels, reportedEPS, estimatedEPS }
      earnings = updatedEPS
      // earnings_calendar -> [{reportDate, estimate}]
      earnings_calendar = earningsCalendar


    } catch (err) {
      if (err instanceof Error) {
        console.log("Reached Error:", err.message)
        status.message = err.message
        status.status = 'error'
      }
    }
  }

  return { props: { details, daily, earnings, earnings_calendar, status } }
}

export default Profile