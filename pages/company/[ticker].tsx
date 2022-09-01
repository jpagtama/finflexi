import { GetStaticProps, GetStaticPropsContext } from "next"
import { useEffect } from "react"

interface Props {
  details: Object
}

const Details = (props: Props) => {

  console.log('props :>> ', props)

  return (
    <div>Details</div>
  )
}

export const getStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      {
        params: {
          ticker: 'aapl'
        }
      }
    ]
  }
}

export const getStaticProps = async(context: GetStaticPropsContext) => {

  const ticker = context.params?.ticker?.toString().trim()
  let data

  if (ticker) {
    try {
      const response = await fetch(`https://api.twelvedata.com/profile?symbol=${ticker}&apikey=${process.env.TWELVEDATA_APIKEY}`)
      data = await response.json()
    } catch (err) {
      if (err instanceof Error) data = err
    }
  }
  
  return {
    props: {
      details: data
    }
  }
}

export default Details