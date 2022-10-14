import {prisma} from '@db/index'
import type { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let status = 200
    let success = true
    let message = 'ok'
    let data = {}

    try {
        // retrieve all companies 
        const companies = await prisma.companies.findMany({
            select: {
                ticker: true,
                name: true
            }
        })
        data = companies

    } catch (error) {
        message = 'unable to retrieve companies'
        status = 500
        if (error instanceof Error) message = error.message
    }

    // return the list of companies as an array of company objects [{ticker, name}]
    return res.status(status).json({ data, status: { success: success, message: message } })
}

export default handler