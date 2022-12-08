import { prisma } from '@db/index'
import { NextApiRequest, NextApiResponse } from "next"

interface Companies {
    company: {
        name: string,
        ticker: string
    },
    id: string,
    order: number | null
}

// Save the order of the favorites list which is passed in through req.body.companies
const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    let status = 200
    let success = true
    let message = 'ok'
    let data = {}

    if (req.method === 'POST') {
        const companies: Companies[] = req.body.companies

        try {
            // loop through list of companies in a prisma.$transaction
            // update each record's order field with the value of the current index in the loop
            for (let [index, item] of companies.entries()) {
                prisma.$transaction([
                    prisma.watchlist.update({
                        where: {
                            id: item.id
                        },
                        data: {
                            order: index
                        }
                    })
                ])
            }

        } catch (e) {
            status = 500
            success = false
            message = e instanceof Error ? e.message : 'unable to process'
        }

    } else {
        status = 400
        success = false
        message = 'bad request'
    }

    return res.status(status).json({ data, status: { success: success, message: message } })
}

export default handler