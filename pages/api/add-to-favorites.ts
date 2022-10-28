import { prisma } from '@db/index'
import NextAuth from 'pages/api/auth/[...nextauth]'
import { useSession } from 'next-auth/react'
import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from 'next-auth'
import { request } from 'http'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    let status = 200
    let success = true
    let message = 'ok'
    let data = {}

    console.log('is favoriting? :>>', req.body.favorited);
    console.log('for what ticker? :>>', req.body.ticker);

    if (req.method === 'POST') {
        try {
            if (req.body.favorited) {
                const result = await prisma.watchlist.create({
                    data: {
                        companyticker: req.body.ticker,
                        userId: req.body.userId
                    },
                })
                data = result
            }
            if (!req.body.favorited) {
                const result = await prisma.watchlist.deleteMany({
                    where: {
                        companyticker: req.body.ticker,
                        userId: req.body.userId
                    }
                })
                data = result
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