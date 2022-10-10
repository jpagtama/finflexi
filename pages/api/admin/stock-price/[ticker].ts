import {prisma} from '@db/index'
import type { NextApiRequest, NextApiResponse } from "next"

const updateStockPrices = async (ticker: string) => {
  const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
  const data = await response.json()
  const dailyData = {...data['Time Series (Daily)']}

  let prices = []
  for (const i in dailyData) {
    const date = new Date(i)

    prices.push({
      companyticker: ticker, 
      date: date, 
      open: parseFloat(dailyData[i]['1. open']), 
      close: parseFloat(dailyData[i]['4. close']), 
      high: parseFloat(dailyData[i]['2. high']), 
      low: parseFloat(dailyData[i]['3. low']), 
      volume: parseInt(dailyData[i]['5. volume'])
    })
  }

  prisma.$transaction([
    prisma.stock_data_daily.deleteMany({where: {companyticker: ticker}}),
    prisma.stock_data_daily.createMany({
      data: prices
    })
  ])
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const ticker = req.query.ticker

  if (typeof ticker !== 'string') return res.status(400).json({status: {success: false, message:'bad request'}})

  try {
    updateStockPrices(ticker)
    return res.status(200).json({status: {success: true, message: 'ok'}})
  } catch(error) {
    if (error instanceof Error) return res.status(500).json({status: {success: false, message: error.message}})
    return res.status(500).json({status: {success: false, message: 'unable to process'}})
  }
}

export default handler