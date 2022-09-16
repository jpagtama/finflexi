import {useState} from 'react'
import {CompanyOverview, CustomError, EarningsCalendar, EarningsData, Status, StockData, StockPrice} from '../../types'
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import type {ChartOptions} from 'chart.js'
import {Line, Bar} from 'react-chartjs-2'
import styles from '../../styles/company/Profile.module.css'
import ChartPicker from '../UI/ChartPicker'

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
  earnings_calendar: EarningsCalendar[] | CustomError
  status: Status
}

const Profile = ({details, daily, earnings, earnings_calendar, status}: Props) => {
  const [graphMode, setGraphMode] = useState(30)

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

  const earningsOverview = () => {
    if ('labels' in earnings) {
        const labels = earnings.labels.slice(0,4).reverse()
        const reportedEps = earnings.reportedEPS.slice(0,4).reverse()
        const estEps = earnings.estimatedEPS.slice(0,4).reverse()
        
        const options: ChartOptions = {
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
            <>
                <Bar options={options} data={data} />
            </>
        )
    }
    
  }

  const earningsCalendar = () => {
    // console.log('earnings_calendar from PROFILE', earnings_calendar)
    const upcomingEarnings= (earnings_calendar as EarningsCalendar[]).map((i: EarningsCalendar) => {

        if (i.reportDate.length > 0) {
            return (
                <div key={i.reportDate} className={styles.overviewSection}>
                    <span>{i.reportDate}</span> <span>{i.estimate.length > 0? `$${i.estimate}`: '-'}</span>
                </div>  
            )
        }
    })
    return (
        <>
        <div className={styles.overviewSection}>
            <span>Date</span><span>Estimated</span>
        </div>
        {upcomingEarnings}
        </>
    )
  }

  const stockChart = () => {

    const optionsLine = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    }

    let labels: string[] = []
    let prices: number[] = []

    if (daily && 'labels' in daily) {
        labels = daily.labels.slice(daily.labels.length - graphMode)
        prices = daily.price.slice(daily.labels.length - graphMode).map(item => item.close)
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

    const buttons = [
        {title: '7d', clickHandler: stockGraphHandler, active: graphMode === 7, duration: 7},
        {title: '2wk', clickHandler: stockGraphHandler, active: graphMode === 14, duration: 14},
        {title: '1m', clickHandler: stockGraphHandler, active: graphMode === 30, duration: 30},
        {title: '3m', clickHandler: stockGraphHandler, active: graphMode === 90, duration: 90}
    ]

    return (
        <div className={styles.chartContainer}>
            <Line options={optionsLine} data={dataStock} />
            <ChartPicker buttons={buttons}/>
        </div>
    )
  }

  const stockGraphHandler = (days: number) => {
    setGraphMode(days)
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
      {typeof daily !== 'undefined' && !('error_message' in daily)?  stockChart() : displayError(daily.error_message)}
      
      {typeof details !== 'undefined' && !('error_message' in details)? companyOverview() : displayError(details.error_message)}

      <h2 className={styles.descLabel}>Earnings:</h2>
      {typeof earnings !== 'undefined' && !('error_message' in earnings)? earningsOverview(): displayError(earnings.error_message)}
      
      <h2 className={styles.descLabel}>Upcoming Earnings:</h2>
      {typeof earnings_calendar !== 'undefined' && !('error_message' in earnings_calendar)? earningsCalendar(): displayError(earnings_calendar.error_message)}

    </div>
  )
}

export default Profile