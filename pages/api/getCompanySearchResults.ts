import type { NextApiRequest, NextApiResponse } from 'next'

interface CompanyDetails {
    symbol: string
    name: string
    type: string
    region: string
    marketOpen: string
    marketClose: string
    timezone: string
    currency: string
    matchScore: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET' && req.query.search) {
      try {
        const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.query.search}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)

        const data = await response.json()
        let resData: CompanyDetails[] = []
        
        if (data.bestMatches.length > 0) {
            for (const item of data.bestMatches) {
                if (item['3. type'] === 'Equity' && item['4. region'] === 'United States') {
                    resData.push(
                        {
                            symbol: item['1. symbol'],
                            name: item['2. name'],
                            type: item['3. type'],
                            region: item['4. region'],
                            marketOpen: item['5. marketOpen'],
                            marketClose: item['6. marketClose'],
                            timezone: item['7. timezone'],
                            currency: item['8. currency'],
                            matchScore: item['9. matchScore'],
                        }
                    )
                }
            }
        }
        res.status(200).json(resData)

      } catch(error) {
        if (error instanceof Error) res.status(500).json(error.message)
      }
  }
}

export default handler