import { prisma } from '@db/index'
import type { NextApiRequest, NextApiResponse } from "next"

const annualGDPHandler = async () => {
    const response = await fetch(`https://www.alphavantage.co/query?function=REAL_GDP&interval=annual&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
    const data = await response.json()
    console.log('data.data', data.data)
    return data.data
}
const monthlyInterestRatesHandler = async () => {
    const response = await fetch(`https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval=monthly&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
    const data = await response.json()
    return data.data
}
const monthlyCPIHandler = async () => {
    const response = await fetch(`https://www.alphavantage.co/query?function=CPI&interval=monthly&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
    const data = await response.json()
    return data.data
}
const annualInflationHandler = async () => {
    const response = await fetch(`https://www.alphavantage.co/query?function=INFLATION&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
    const data = await response.json()
    return data.data
}
const monthlyUnemploymentHandler = async () => {
    const response = await fetch(`https://www.alphavantage.co/query?function=UNEMPLOYMENT&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
    const data = await response.json()
    return data.data
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let gdp = await annualGDPHandler()
        let interestRates = await monthlyInterestRatesHandler()
        let cpi = await monthlyCPIHandler()
        let inflation = await annualInflationHandler()
        let unemployment = await monthlyUnemploymentHandler()

        gdp = gdp.map((i: {[key: string]: string}) => ({date: new Date(i.date), value: parseFloat(i.value).toFixed(3)}))
        interestRates = interestRates.map((i: {[key: string]: string}) => ({date: new Date(i.date), value: parseFloat(i.value).toFixed(3)}))
        cpi = cpi.map((i: {[key: string]: string}) => ({date: new Date(i.date), value: parseFloat(i.value).toFixed(3)}))
        inflation = inflation.map((i: {[key: string]: string}) => ({date: new Date(i.date), value: parseFloat(i.value).toFixed(3)}))
        unemployment = unemployment.map((i: {[key: string]: string}) => ({date: new Date(i.date), value: parseFloat(i.value).toFixed(3)}))

        prisma.$transaction([
            prisma.gross_domestic_product.deleteMany(),
            prisma.interest_rates.deleteMany(),
            prisma.consumer_price_index.deleteMany(),
            prisma.inflation.deleteMany(),
            prisma.unemployment.deleteMany(),
            prisma.gross_domestic_product.createMany({ data: gdp }),
            prisma.interest_rates.createMany({ data: interestRates }),
            prisma.consumer_price_index.createMany({ data: cpi }),
            prisma.inflation.createMany({ data: inflation }),
            prisma.unemployment.createMany({ data: unemployment })
        ])
        return res.status(200).json({ status: { success: true, message: 'ok' } })
        
    } catch (error) {
        if (error instanceof Error) return res.status(500).json({ status: { success: false, message: error.message } })
    }
}

export default handler