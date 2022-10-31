import { prisma } from '@db/index'
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let status = 200
    let success = true
    let message = 'ok'
    let data = { isFavorited: false }

    console.log('req object from api', req.query)
    console.log('req id from api', req.query.id)
    console.log('req ticker from api', req.query.ticker)

    // return res.json({ 'testing': 'testing' })

    if (req.method === 'GET') {
        try {
            const result = await prisma.watchlist.findMany({
                where: {
                    userId: req.query.id?.toString(),
                    companyticker: req.query.ticker?.toString()
                }
            })
            data.isFavorited = result.length > 0
        } catch (e) {
            success = false
            status = 500
            message = 'unable to process'
        }


    }

    return res.status(status).json({ data, status: { success: success, message: message } })
}

export default handler