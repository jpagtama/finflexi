import {useState} from 'react'
import {CompanyOverview, CustomError, EarningsData, Status, StockData, StockPrice} from '../../types'
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import type {ChartOptions} from 'chart.js'
import {Line, Bar} from 'react-chartjs-2'
import styles from '../../styles/company/Profile.module.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
  details: CompanyOverview | CustomError
  daily: StockData | CustomError
  earnings: EarningsData | CustomError
  status: Status
}

const Profile = ({details, daily, earnings, status}: Props) => {
  const [graphMode, setGraphMode] = useState('1m')

  const symbol = `${details && 'Symbol' in details? details.Symbol : ''}`
  const name = `${details && 'Name' in details? details.Name : ''}`
  const desc = `${details && 'Description' in details? details.Description : ''}`
  const exch = `${details && 'Exchange' in details? details.Exchange : ''}`
  const mcap = `${details && 'MarketCapitalization' in details? details.MarketCapitalization : ''}`
  const target = `${details && 'AnalystTargetPrice' in details? details.AnalystTargetPrice : ''}`
  const sharesOutstanding = `${details && 'SharesOutstanding' in details? details.SharesOutstanding : ''}`
  const forPE = `${details && 'ForwardPE' in details? details.ForwardPE : ''}`
  const ma50 = `${details && 'movingAverage50day' in details? details.movingAverage50day : ''}`
  const ma200 = `${details && 'movingAverage200day' in details? details.movingAverage200day : ''}`
  const fiscYrEnd = `${details && 'FiscalYearEnd' in details? details.FiscalYearEnd : ''}`

  const optionsLine = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        }
    }
  }

  const optionsBar: ChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            reverse: true,
            position: 'top'
        },
        title: {
            display: false,
            text: ''
        }
    }
  }

  let labels: string[] = []
  let prices: number[] = []

  if (daily && 'labels' in daily) {
    switch(graphMode) {
        case '7d':
            labels = daily.labels.slice(daily.labels.length - 7)
            prices = daily.price.slice(daily.labels.length - 7).map(item => item.close)
            break
        case '2wk':
            labels = daily.labels.slice(daily.labels.length - 14)
            prices = daily.price.slice(daily.labels.length - 14).map(item => item.close)
            break
        case '1m':
            labels = daily.labels.slice(daily.labels.length - 30)
            prices = daily.price.slice(daily.labels.length - 30).map(item => item.close)
            break
        case '3m':
            labels = daily.labels.slice(daily.labels.length - 90)
            prices = daily.price.slice(daily.labels.length - 90).map(item => item.close)
            break
        default:
            labels = daily.labels.slice(daily.labels.length - 7)
            prices = daily.price.slice(daily.labels.length - 7).map(item => item.close)
    }
  }

  const dataStock = {
    labels: labels,
    datasets: [{
        label: symbol,
        data: prices,
        borderColor: '#f900bf',
        backgroundColor: '#f900bf',
    }]
  }

  const companyOverview = () => {
    return (
      <>
        <h2 className={styles.descLabel}>Description:</h2>
        <p className={styles.desc}>{desc}</p>

        <h2 className={styles.descLabel}>Stats:</h2>
        <div className={styles.overviewContainer}>
            <div className={styles.overviewSection}>
                <span>Ticker Symbol:</span> <span>{symbol}</span>
            </div>
            <div className={styles.overviewSection}>
                <span>Exchange:</span> <span>{exch}</span>
            </div>
            <div className={styles.overviewSection}>
                <span>Market Cap:</span> <span>{mcap}</span>
            </div>
            <div className={styles.overviewSection}>
                <span>Analyst Target Price:</span> <span>${target}</span>
            </div>        
            <div className={styles.overviewSection}>
                <span>Shares Outstanding:</span> <span>{sharesOutstanding}</span>
            </div>
            <div className={styles.overviewSection}>
                <span>Forward PE:</span> <span>{forPE}</span>
            </div>   
            <div className={styles.overviewSection}>
                <span>50 Day Moving Avg:</span> <span>${ma50}</span>
            </div>        
            <div className={styles.overviewSection}>
                <span>200 Day Moving Avg:</span> <span>${ma200}</span>
            </div>        
            <div className={styles.overviewSection}>
                <span>Fiscal Year End:</span> <span>{fiscYrEnd}</span>
            </div>        
        </div>
        <div className={styles.earningsContainer}>
            
        </div>
      </>
    )
  }

//   const earningsOverview = (labels: string[], reportedEps: number[], estimatedEps: number[]) => {
  const earningsOverview = () => {
    if ('labels' in earnings) {
        const labels = earnings.labels.slice(0,4).reverse()
        const reportedEps = earnings.reportedEPS.slice(0,4).reverse()
        const estEps = earnings.estimatedEPS.slice(0,4).reverse()

        const data = {
            labels: labels,
            datasets: [{
                label: 'Reported EPS',
                data: reportedEps,
                borderColor: '#F900BF',
                backgroundColor: '#F900BF',
                },
                {
                label: 'Estimated EPS',
                data: estEps,
                borderColor: '#293462',
                backgroundColor: '#293462',
                }
            ]
        }
        return (
            <Bar options={optionsBar} data={data} />
        )
    }
    
  }

  const displayError = (message: string) => {
    return (
        <div className={styles.errContainer}>
            <p className={styles.errMessage}>Well, this is awkward. This free API has encountered some limitations:</p>
            <p className={styles.errMessage}>"{message}"</p>
        </div>
    )
  }

  return (
    <div className={styles.companyProfileContainer}>

      <h1 className={styles.companyName} >{name}</h1>
      
      {!('error_message' in daily)? <div className={styles.chartContainer}><Line options={optionsLine} data={dataStock} /></div> : displayError(daily.error_message)}
      {!('error_message' in details)? companyOverview() : displayError(details.error_message)}
      {/* {!('error_message' in earnings)? earningsOverview(earnings.labels, earnings.estimatedEPS, earnings.reportedEPS): displayError(earnings.error_message)} */}
      {!('error_message' in earnings)? earningsOverview(): displayError(earnings.error_message)}

    </div>
  )
}

export default Profile