// import {prisma} from '../../../../db/index'
import {prisma} from '@db/index'
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // if (req.query.ticker == undefined) res.status(404)

    if (typeof req.query.ticker === 'string') {
        const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${req.query.ticker}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
        const data = await response.json()
    
        const upsertCompany = await prisma.companies.upsert({
            where: {
                ticker: req.query.ticker
            },
            update: {
                name: data['Name'],
                description: data['Description'],
                exchange: data['Exchange'],
                marketcap: parseInt(data['MarketCapitalization']),
                analysttargetprice: parseFloat(data['AnalystTargetPrice']).toFixed(2),
                sharesoutstanding: parseInt(data['SharesOutstanding']),
                forwardpe: parseFloat(data['ForwardPE']).toFixed(2),
                movingavg50: parseFloat(data['50DayMovingAverage']).toFixed(2),
                movingavg200: parseFloat(data['200DayMovingAverage']).toFixed(2),
                fiscalyearend: data['FiscalYearEnd'],
            },
            create: {
                ticker: req.query.ticker,
                name: data['Name'],
                description: data['Description'],
                exchange: data['Exchange'],
                marketcap: parseInt(data['MarketCapitalization']),
                analysttargetprice: parseFloat(data['AnalystTargetPrice']).toFixed(2),
                sharesoutstanding: parseInt(data['SharesOutstanding']),
                forwardpe: parseFloat(data['ForwardPE']).toFixed(2),
                movingavg50: parseFloat(data['50DayMovingAverage']).toFixed(2),
                movingavg200: parseFloat(data['200DayMovingAverage']).toFixed(2),
                fiscalyearend: data['FiscalYearEnd'],
            }
        })

        console.log('upsertCompany :>> ', upsertCompany);
        res.status(200).json({'data': data})
    }

}

export default handler