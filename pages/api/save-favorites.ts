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

        const saveCompanies = async (companies: Companies[]) => {
            return await prisma.$transaction(async (tx) => {
                for (let [index, item] of companies.entries()) {
                    await tx.watchlist.updateMany({
                        where: {
                            id: item.id
                        },
                        data: {
                            order: index
                        }
                    })
                }
            })
        }

        try {
            saveCompanies(companies)

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