import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const ticker = req.query.ticker;
    let success = true;
    let message = 'ok';
    let respData = {};

    if (typeof ticker !== 'string') return res.status(400).json({ status: { success: false, message: 'bad request' } })

    const getIncomeStatement = async (ticker: string) => {
        const response = await fetch(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
        const data = await response.json();
        return data;
    }

    try {
        const data = await getIncomeStatement(ticker);
        return res.status(200).json({ status: { success: success, message: message }, incomeStatements: data })
    } catch (error) {
        success = false
        if (error instanceof Error) {
            message = error.message
        }
        return res.status(500).json({ status: { success: success, message: message } })
    }
}

export default handler