import { GetStaticPropsContext } from "next"
import {CompanyOverview, StockPrice, StockData, Status, CustomError, EarningsData, EarningsCalendar } from '../../types'
import { isJSONEmpty } from "../../utils/utils"
import Profile from '../../components/company/Profile'

interface Props {
  details: CompanyOverview | CustomError
  daily: StockData | CustomError
  earnings: EarningsData | CustomError
  earnings_calendar: EarningsCalendar[] | CustomError
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
  let details: CompanyOverview | CustomError | {} = {}
  let daily: StockData | CustomError | {} = {}
  let earnings: EarningsData | CustomError | {} = {}
  let earnings_calendar: EarningsCalendar[] | CustomError | [] = []
  let status: Status = {status: "ok"}

  if (ticker) {
    try {
      const resOverview = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
      const dataOverview = await resOverview.json()

      const resDaily = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
      const dataDaily = await resDaily.json()

      const resEPS = await fetch(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
      const dataEPS = await resEPS.json()

      const resEarningsCal = await fetch(`https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol=${ticker}&horizon=12month&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
      const dataEarningsCal = await resEarningsCal.text()

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

      if (epsData === 'undefined' || epsData.length === 0) {
        earnings = {error_message: 'Earnings data not available'}
      } else if (dataEPS.Note) {
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

      if (dataEarningsCal === 'undefined' || typeof dataEarningsCal !== 'string' || dataEarningsCal.length === 0) {
        earnings_calendar = {error_message: 'Earnings calendar data not available'}
      } else {
        const earningsCalDataFields = dataEarningsCal.split(/[\n|,]/).slice(0,6)
        const earningsCalData = dataEarningsCal.split(/[\n|,]/).slice(6)
        let earningsCalendar = []
        // console.log('earningsCalDataFields :>> ', earningsCalDataFields);
        // console.log('ungabunga :>> ', earningsCalData);

        // Convert csv data to json
        for (let i = 0; i < earningsCalData.length; i++) {
          let item: {[key: string]: string} = {} 
          for (let j = 0; j < earningsCalDataFields.length; j++) {
            let field = earningsCalDataFields[j]? earningsCalDataFields[j].replace(/(\r\n|\n|\r)/gm, "") : ''
            let fieldValue = earningsCalData[i]? earningsCalData[i].replace(/(\r\n|\n|\r)/gm, "") : ''
            item[field] = fieldValue
            if (j !== earningsCalDataFields.length - 1) i = i + 1
          }
          earningsCalendar.push(item)
        }
        // console.log('earningsCalendar BEFORE', earningsCalendar)
        earnings_calendar = earningsCalendar.length > 0? earningsCalendar: {error_message: 'Earnings calendar data not available'}
        // console.log('earnings_calendar AFTER :>> ', earnings_calendar);
      }
      
    } catch (err) {
      if (err instanceof Error) {
        console.log("Reached Error:", err.message)
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
      earnings_calendar,
      status
    },
  }
}

export default Details