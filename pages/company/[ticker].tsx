import { GetStaticPropsContext } from "next"
import {CompanyOverview, StockPrice, StockData, Status, CustomError, EarningsData } from '../../types'
import { isJSONEmpty } from "../../utils/utils"
import Profile from '../../components/company/Profile'

interface Props {
  details: CompanyOverview | CustomError
  daily: StockData | CustomError
  earnings: EarningsData | CustomError
  status: Status
}

const Details = (props: Props) => {

  const companyProfile = <Profile {...props} />

  return (
    <>
      {companyProfile}
    </>
  )
}

export const getStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      {params: {ticker: 'AAPL'}},
      {params: {ticker: 'TSLA'}},
      {params: {ticker: 'AMZN'}},
      {params: {ticker: 'MSFT'}},
      {params: {ticker: 'GOOG'}},
      {params: {ticker: 'GOOGL'}},
      {params: {ticker: 'JNJ'}},
      {params: {ticker: 'GME'}},
      {params: {ticker: 'BBBY'}},
    ]
  }
}

export const getStaticProps = async(context: GetStaticPropsContext) => {

  const ticker = context.params?.ticker?.toString().trim()
  let details: CompanyOverview | CustomError | undefined
  let daily: StockData | CustomError | undefined
  let earnings: EarningsData | CustomError | undefined
  let status: Status = {status: "ok"}

  if (ticker) {
    try {
      const resOverview = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
      const dataOverview = await resOverview.json()
      // console.log('dataOverview :>> ', dataOverview);

      const resDaily = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
      const dataDaily = await resDaily.json()
      // console.log('dataDaily :>> ', dataDaily);

      const resEPS = await fetch(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
      const dataEPS = await resEPS.json()

      // const res5min = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
      // const data5min = await res5min.json()
      // console.log('data5min', data5min)

      if (isJSONEmpty(dataOverview)) {
        details = {error_message: 'Company overview not available'}
      } else if (dataOverview.Note) {
        details = {error_message: dataOverview.Note}
      } else {
        details = {
          ...dataOverview,
          movingAverage50day: dataOverview['50DayMovingAverage'],
          movingAverage200day: dataOverview['200DayMovingAverage'],
          high52week: dataOverview['52WeekHigh'],
          low52week: dataOverview['52WeekLow']
        }
      }

      const dailyData = {...dataDaily['Time Series (Daily)']}

      if (isJSONEmpty(dailyData)) {
        daily = {error_message: 'Stock data not available'}
      } else if (dailyData.Note) {
        daily = {error_message: 'Stock data not available at this time'}
      } else {
        const labels = Object.keys(dailyData).sort()
        const price = labels.map(item => ({
          open: parseFloat(dailyData[item]['1. open']),
          high: parseFloat(dailyData[item]['2. high']),
          low: parseFloat(dailyData[item]['3. low']),
          close: parseFloat(dailyData[item]['4. close']),
          volume: parseFloat(dailyData[item]['5. volume'])
        }))
        daily = {labels, price}
      }

      const epsData = dataEPS.quarterlyEarnings

      if (epsData.length === 0) {
        earnings = {error_message: 'Earnings data not available'}
      } else if (epsData.Note) {
        earnings = {error_message: 'Earnings data not available at this time'}
      } else {
        const labels: string[] = []
        const reportedEPS: number[] = [] 
        const estimatedEPS: number[] = []

        for (const i of epsData) {
          labels.push(i.reportedDate)
          reportedEPS.push(parseFloat(i.reportedEPS))
          estimatedEPS.push(parseFloat(i.estimatedEPS))
        }

        earnings = {labels, reportedEPS, estimatedEPS}
      }

    } catch (err) {
      if (err instanceof Error) {
        status.message = err.message
        status.status = 'error'
      }
    }
  }
  
  return {
    props: {
      details,
      daily,
      earnings,
      status
    },
  }
}

export default Details