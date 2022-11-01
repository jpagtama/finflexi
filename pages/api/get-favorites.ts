import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@db/index'
import React from 'react'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let status = 200
    let message = 'ok'
    let success = true
    let data = {}

    try {
        data = await prisma.watchlist.findMany({
            where: { userId: req.query.id?.toString() },
            select: {
                order: true,
                company: {
                    select: {
                        ticker: true,
                        name: true
                    }
                }
            }
        })

    } catch (e) {
        status = 500
        success = false
        message = e instanceof Error ? e.message : 'unable to retrieve companies'
    }

    return res.status(status).json({ data, status: { success, message } })
}

export default handler