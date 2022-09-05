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

interface ResCompanyDetails {
    '1. symbol': string
    '2. name': string
    '3. type': string
    '4. region': string
    '5. marketOpen': string
    '6. marketClose': string
    '7. timezone': string
    '8. currency': string
    '9. matchScore': string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET' && req.query.search) {
      try {
        const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.query.search}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)

        const data = await response.json()
        let resData: CompanyDetails[] = []
        
        if (data.bestMatches.length > 0) {
            resData = data.bestMatches.map((item: ResCompanyDetails) => (
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
            ))
        }
        res.status(200).json(resData)

      } catch(error) {
        if (error instanceof Error) res.status(500).json(error.message)
      }
  }
}

export default handler