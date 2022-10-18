import { GetStaticPropsContext } from "next"
import { prisma } from '@db/index'
import { CompanyOverview, StockPrice, StockData, Status, CustomError, EarningsData, EarningsCalendar } from '../../types'
import { dbDatetoString, isJSONEmpty } from "../../utils/utils"
import Profile from '../../components/company/Profile'
import { Decimal } from "@prisma/client/runtime"

interface Props {
  details: CompanyOverview | CustomError
  daily: StockData | CustomError
  earnings: EarningsData | CustomError
  earnings_calendar: EarningsCalendar[] | CustomError
  status: Status
}

const Details = ({ details, daily, earnings, earnings_calendar }: Props) => {

  // const companyProfile = <Profile {...props} />
  console.log('props :>> ', [details, daily, earnings, earnings_calendar]);

  return (
    <>
      <h1>Company Profile Page</h1>
    </>
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
    price.push(item['close']?.toFixed())
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

export default Details