import { prisma } from '@db/index'
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const ticker = req.query.ticker
    let success = true
    let message = 'ok'

    if (typeof ticker !== 'string') return res.status(400).json({ status: { success: false, message: 'bad request' } })

    const updateCompanyOverview = async (ticker: string) => {
        const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
        const data = await response.json()

        await prisma.companies.create({
            data: {
                ticker: ticker,
                name: data['Name'],
                description: data['Description'],
                exchange: data['Exchange'],
                marketcap: isNaN(parseInt(data['MarketCapitalization'])) ? null : parseInt(data['MarketCapitalization']),
                analysttargetprice: isNaN(parseFloat(data['AnalystTargetPrice'])) ? null : parseFloat(data['AnalystTargetPrice']).toFixed(2),
                sharesoutstanding: isNaN(parseInt(data['SharesOutstanding'])) ? null : parseInt(data['SharesOutstanding']),
                forwardpe: isNaN(data['ForwardPE']) ? null : parseFloat(data['ForwardPE']).toFixed(2),
                movingavg50: isNaN(parseFloat(data['50DayMovingAverage'])) ? null : parseFloat(data['50DayMovingAverage']).toFixed(2),
                movingavg200: isNaN(parseFloat(data['200DayMovingAverage'])) ? null : parseFloat(data['200DayMovingAverage']).toFixed(2),
                fiscalyearend: data['FiscalYearEnd'],
            }
        })

        // await prisma.companies.upsert({
        //     where: {
        //         ticker: ticker
        //     },
        //     update: {
        //         name: data['Name'],
        //         description: data['Description'],
        //         exchange: data['Exchange'],
        //         marketcap: isNaN(parseInt(data['MarketCapitalization'])) ? null : parseInt(data['MarketCapitalization']),
        //         analysttargetprice: isNaN(parseFloat(data['AnalystTargetPrice'])) ? null : parseFloat(data['AnalystTargetPrice']).toFixed(2),
        //         sharesoutstanding: isNaN(parseInt(data['SharesOutstanding'])) ? null : parseInt(data['SharesOutstanding']),
        //         forwardpe: isNaN(data['ForwardPE']) ? null : parseFloat(data['ForwardPE']).toFixed(2),
        //         movingavg50: isNaN(parseFloat(data['50DayMovingAverage'])) ? null : parseFloat(data['50DayMovingAverage']).toFixed(2),
        //         movingavg200: isNaN(parseFloat(data['200DayMovingAverage'])) ? null : parseFloat(data['200DayMovingAverage']).toFixed(2),
        //         fiscalyearend: data['FiscalYearEnd'],
        //     },
        //     create: {
        //         ticker: ticker,
        //         name: data['Name'],
        //         description: data['Description'],
        //         exchange: data['Exchange'],
        //         marketcap: isNaN(parseInt(data['MarketCapitalization'])) ? null : parseInt(data['MarketCapitalization']),
        //         analysttargetprice: isNaN(parseFloat(data['AnalystTargetPrice'])) ? null : parseFloat(data['AnalystTargetPrice']).toFixed(2),
        //         sharesoutstanding: isNaN(parseInt(data['SharesOutstanding'])) ? null : parseInt(data['SharesOutstanding']),
        //         forwardpe: isNaN(data['ForwardPE']) ? null : parseFloat(data['ForwardPE']).toFixed(2),
        //         movingavg50: isNaN(parseFloat(data['50DayMovingAverage'])) ? null : parseFloat(data['50DayMovingAverage']).toFixed(2),
        //         movingavg200: isNaN(parseFloat(data['200DayMovingAverage'])) ? null : parseFloat(data['200DayMovingAverage']).toFixed(2),
        //         fiscalyearend: data['FiscalYearEnd'],
        //     }
        // })
    }

    try {
        updateCompanyOverview(ticker)
        return res.status(200).json({ status: { success: success, message: message } })
    } catch (error) {
        success = false
        if (error instanceof Error) {
            message = error.message
        }
        return res.status(500).json({ status: { success: success, message: message } })
    }
}

export default handler