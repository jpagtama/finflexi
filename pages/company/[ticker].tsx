import { GetStaticPropsContext } from "next"
import { isJSONEmpty } from "../../utils/utils"
import Profile from '../../components/company/Profile'

interface Props {
  details: {
    movingAverage50day: string
    high52week: string
    low52week: string
    movingAverage200day: string
    Address: string
    AnalystTargetPrice: string
    AssetType: string
    CIK: string
    Country: string
    Description: string
    Exchange: string
    FiscalYearEnd: string
    ForwardPE: string
    Industry: string
    LatestQuarter: string
    MarketCapitalization: string
    Name: string
    SharesOutstanding: string
    Symbol: string 
    message?: string
  }
  status: string
}

const Details = (props: Props) => {

  // console.log('props :>> ', props);
  const companyProfile = props.status === 'ok'? <Profile {...props.details} />: props.status

  return (
    <>
      {companyProfile}

    </>
  )
}

export const getStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      {
        params: {
          ticker: 'AAPL'
        }
      },
      {
        params: {
          ticker: 'TSLA'
        }
      },
      {
        params: {
          ticker: 'AMZN'
        }
      },
      {
        params: {
          ticker: 'MSFT'
        }
      },
      {
        params: {
          ticker: 'GOOG'
        }
      },
      {
        params: {
          ticker: 'GOOGL'
        }
      },
      {
        params: {
          ticker: 'JNJ'
        }
      },
    ]
  }
}

export const getStaticProps = async(context: GetStaticPropsContext) => {

  const ticker = context.params?.ticker?.toString().trim()
  let details: Record<string, any> = {}
  let status = 'ok'

  if (ticker) {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
      const data = await response.json()
      if (isJSONEmpty(data)) throw new Error('Unable to find company')
      details = {
        ...data, 
        movingAverage50day: data['50DayMovingAverage'], 
        movingAverage200day: data['200DayMovingAverage'],
        high52week: data['52WeekHigh'],
        low52week: data['52WeekLow']
      }
    } catch (err) {
      if (err instanceof Error) {
        details.message = err.message
        status = 'error'
      }
    }
  }
  
  return {
    props: {
      details,
      status
    }
  }
}

export default Details