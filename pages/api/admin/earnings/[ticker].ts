import { prisma } from '@db/index'
import type { NextApiRequest, NextApiResponse } from "next"

const quarterlyEarningsHandler = async (company: string) => {
    const response = await fetch(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${company}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
    const data = await response.json()
    const quarterlyEarnings = data.quarterlyEarnings ? data.quarterlyEarnings?.slice(0, 4) : []

    return quarterlyEarnings.map((i: { [key: string]: string }) => ({
        companyticker: company,
        reportedDate: new Date(i.reportedDate),
        reportedEPS: isNaN(parseFloat(i.reportedEPS)) ? null : parseFloat(i.reportedEPS).toFixed(2),
        estimatedEPS: isNaN(parseFloat(i.estimatedEPS)) ? null : parseFloat(i.estimatedEPS).toFixed(2)
    }))
}

const earningsCalendarHandler = async (company: string) => {
    const response = await fetch(`https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol=${company}&horizon=12month&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
    const data = await response.text()
    let earningsCalendar = []

    const earningsCalDataFields = data.length ? data.split(/[\n|,]/).slice(0, 6) : []
    const earningsCalData = data.length ? data.split(/[\n|,]/).slice(6) : []
    // Convert csv data to json
    for (let i = 0; i < earningsCalData.length; i++) {
        let item: { [key: string]: string } = {}
        for (let j = 0; j < earningsCalDataFields.length; j++) {
            let field = earningsCalDataFields[j] ? earningsCalDataFields[j].replace(/(\r\n|\n|\r)/gm, "") : ''
            let fieldValue = earningsCalData[i] ? earningsCalData[i].replace(/(\r\n|\n|\r)/gm, "") : ''
            item[field] = fieldValue
            if (j !== earningsCalDataFields.length - 1) i = i + 1
        }
        earningsCalendar.push(item)
    }
    // Format to DB fields and values
    let calendarData = []
    for (const i of earningsCalendar) {
        if (i.symbol.length) {
            calendarData.push({
                companyticker: company,
                reportDate: new Date(i.reportDate),
                estimate: isNaN(parseFloat(i.estimate)) ? null : parseFloat(i.estimate).toFixed(2)
            })
        }
    }

    return calendarData
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const ticker = req.query.ticker

    if (typeof ticker !== 'string') return res.status(400).json({ status: { success: false, message: 'incorrect ticker input' } })
    if (typeof ticker === 'string') {
        try {
            const quarterlyEarnings = await quarterlyEarningsHandler(ticker)
            const earningsCalendar = await earningsCalendarHandler(ticker)

            prisma.$transaction([
                prisma.earnings.deleteMany({
                    where: { companyticker: ticker }
                }),
                prisma.earnings_calendar.deleteMany({
                    where: { companyticker: ticker }
                }),
                prisma.earnings.createMany({
                    data: quarterlyEarnings
                }),
                prisma.earnings_calendar.createMany({
                    data: earningsCalendar
                }),
            ])

            return res.status(200).json({ status: { success: true, message: 'ok' } })
        } catch (error) {
            if (error instanceof Error) return res.status(500).json({ status: { success: false, message: error.message } })
            return res.status(500).json({ status: { success: false, message: 'unable to process' } })
        }
    }
}

export default handler