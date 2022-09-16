import React, {useState} from 'react'
import ChartPicker from '../../components/UI/ChartPicker'
import Divider from '../../components/UI/Divider'
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import {Line, Bar} from 'react-chartjs-2'
import type {ChartOptions} from 'chart.js'
import styles from '../../styles/economy/Economy.module.css'


interface Props {
    gdp: {labels: string[], values: number[]}
    interest_rates: {labels: string[], values: number[]}
    cpi: {labels: string[], values: number[]}
    inflation: {labels: string[], values: number[]}
    unemployment: {labels: string[], values: number[]}
}

const Economy = ({gdp, interest_rates, cpi, inflation, unemployment}: Props) => {

  const [gdpTimeFrame, setGdpTimeFrame] = useState(10) // yearly
  const [interestRatesTimeFrame, setInterestRatesTimeFrame] = useState(24) // monthly
  const [cpiTimeFrame, setCpiTimeFrame] = useState(24) // monthly
  const [inflationTimeFrame, setInflationTimeFrame] = useState(10) // yearly
  const [unemploymentTimeFrame, setUnemploymentTimeFrame] = useState(24) // monthly
  
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

  const renderGDP = () => {
    const options: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top'
            },
            title: {
                display: false,
                text: 'GDP'
            }
        }
    }
    const data = {
        labels: gdp.labels.slice(0, gdpTimeFrame).reverse(),
        datasets: [{
            label: 'GDP',
            data: gdp.values.slice(0, gdpTimeFrame).reverse(),
            borderColor: '#F900BF',
            backgroundColor: '#F900BF',
        }]
    }
    const clickHandler = (arg: number) => {
      setGdpTimeFrame(arg)
    }

    const buttons = [
      {title: '10yr', clickHandler: clickHandler, active: gdpTimeFrame === 10, duration: 10},
      {title: '20yr', clickHandler: clickHandler, active: gdpTimeFrame === 20, duration: 20},
      {title: '30yr', clickHandler: clickHandler, active: gdpTimeFrame === 30, duration: 30}
    ]

    return (
        <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Gross Domestic Product</h2>
            <Bar options={options} data={data} />
            <ChartPicker buttons={buttons}/>
        </div>
    )
  }

  const renderInterestRates = () => {
    const options: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top'
            },
            title: {
                display: false,
                text: 'Federal Interest Rates'
            }
        }
    }
    const data = {
        labels: interest_rates.labels.slice(0,interestRatesTimeFrame).reverse(),
        datasets: [{
            label: 'Percent',
            data: interest_rates.values.slice(0,interestRatesTimeFrame).reverse(),
            borderColor: '#F900BF',
            backgroundColor: '#F900BF',
        }]
    }
    const clickHandler = (arg: number) => {
        setInterestRatesTimeFrame(arg)
    }
    const buttons = [
        {title: '2yr', clickHandler: clickHandler, active: interestRatesTimeFrame === 24, duration: 24},
        {title: '5yr', clickHandler: clickHandler, active: interestRatesTimeFrame === 60, duration: 60},
        {title: '10yr', clickHandler: clickHandler, active: interestRatesTimeFrame === 120, duration: 120}
    ]
    return (
        <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Federal Interest Rates</h2>
            <Line options={options} data={data} />
            <ChartPicker buttons={buttons}/>
        </div>
    )
  }

  const renderCPI = () => {
    const options: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top'
            },
            title: {
                display: false,
                text: 'Consumer Price Index'
            }
        }
    }
    const data = {
        labels: cpi.labels.slice(0,cpiTimeFrame).reverse(),
        datasets: [{
            label: 'CPI',
            data: cpi.values.slice(0,cpiTimeFrame).reverse(),
            borderColor: '#F900BF',
            backgroundColor: '#F900BF',
        }]
    }
    const clickHandler = (arg: number) => {
        setCpiTimeFrame(arg)
    }
    const buttons = [
        {title: '2yr', clickHandler: clickHandler, active: cpiTimeFrame === 24, duration: 24},
        {title: '5yr', clickHandler: clickHandler, active: cpiTimeFrame === 60, duration: 60},
        {title: '10yr', clickHandler: clickHandler, active: cpiTimeFrame === 120, duration: 120}
    ]
    return (
        <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Consumer Price Index</h2>
            <Line options={options} data={data} />
            <ChartPicker buttons={buttons}/>
        </div>
    )
  }

  const renderInflation = () => {
    const options: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top'
            },
            title: {
                display: false,
                text: 'Inflation'
            }
        }
    }
    const data = {
        labels: inflation.labels.slice(0,inflationTimeFrame).reverse(),
        datasets: [{
            label: 'Inflation',
            data: inflation.values.slice(0,inflationTimeFrame).reverse(),
            borderColor: '#F900BF',
            backgroundColor: '#F900BF',
        }]
    }
    const clickHandler = (arg: number) => {
        setInflationTimeFrame(arg)
    }
    const buttons = [
        {title: '10yr', clickHandler: clickHandler, active: inflationTimeFrame === 10, duration: 10},
        {title: '20yr', clickHandler: clickHandler, active: inflationTimeFrame === 20, duration: 20},
        {title: '30yr', clickHandler: clickHandler, active: inflationTimeFrame === 30, duration: 30}
    ]
    return (
        <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Inflation</h2>
            <Line options={options} data={data} />
            <ChartPicker buttons={buttons}/>
        </div>
    )
  }

  const renderUnemployment = () => {
    const options: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top'
            },
            title: {
                display: false,
                text: 'Unemployment'
            }
        }
    }
    const data = {
        labels: unemployment.labels.slice(0,unemploymentTimeFrame).reverse(),
        datasets: [{
            label: 'Unemployment',
            data: unemployment.values.slice(0,unemploymentTimeFrame).reverse(),
            borderColor: '#F900BF',
            backgroundColor: '#F900BF',
        }]
    }
    const clickHandler = (arg: number) => {
        setUnemploymentTimeFrame(arg)
    }
    const buttons = [
        {title: '2yr', clickHandler: clickHandler, active: unemploymentTimeFrame === 24, duration: 24},
        {title: '5yr', clickHandler: clickHandler, active: unemploymentTimeFrame === 60, duration: 60},
        {title: '10yr', clickHandler: clickHandler, active: unemploymentTimeFrame === 120, duration: 120}
    ]
    return (
        <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Unemployment</h2>
            <Line options={options} data={data} />
            <ChartPicker buttons={buttons}/>
        </div>
    )
  }

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>The Economy</h1>
        <Divider />
        {renderGDP()}
        {renderInterestRates()}
        {renderCPI()}
        {renderInflation()}
        {renderUnemployment()}
    </div>
  )
}

export const getStaticProps = async () => {
  
  let annualGdp = {}
  let monthlyInterestRate = {}
  let monthlyCPI = {}
  let annualInflation = {}
  let monthlyUnemployment = {}

  try {

    // Annual GDP
    let annualGdpLabels = []
    let annualGdpValues = []
    const resAnnualGDP = await fetch(`https://www.alphavantage.co/query?function=REAL_GDP&interval=annual&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
    const dataAnnualGDP = await resAnnualGDP.json()
    for (const i of dataAnnualGDP.data) {
        annualGdpLabels.push(i.date)
        annualGdpValues.push(parseInt(i.value))
    }
    annualGdp = {labels: annualGdpLabels, values: annualGdpValues}

    // Monthly Federal Funds Interest Rate 
    let monthlyInterestRateLabels = []
    let monthlyInterestRateValues = []
    const resMonthlyInteresetRate = await fetch(`https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval=monthly&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
    const dataMonthlyInterestRate = await resMonthlyInteresetRate.json()
    for (const i of dataMonthlyInterestRate.data) {
        monthlyInterestRateLabels.push(i.date)
        monthlyInterestRateValues.push(parseFloat(i.value))
    }
    monthlyInterestRate = {labels: monthlyInterestRateLabels, values: monthlyInterestRateValues}

    // Monthly Consumer Price Index
    let monthlyCPILabels = []
    let monthlyCPIValues = []
    const resMonthlyCPI = await fetch(`https://www.alphavantage.co/query?function=CPI&interval=monthly&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
    const dataMonthlyCPI = await resMonthlyCPI.json()
    for (const i of dataMonthlyCPI.data) {
        monthlyCPILabels.push(i.date)
        monthlyCPIValues.push(parseFloat(i.value))
    }
    monthlyCPI = {labels: monthlyCPILabels, values: monthlyCPIValues}

    // Annual Inflation
    let inflationLabels = []
    let inflationValues = []
    const resInflation = await fetch(`https://www.alphavantage.co/query?function=INFLATION&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
    const dataInflation = await resInflation.json()
    for (const i of dataInflation.data) {
        inflationLabels.push(i.date)
        inflationValues.push(parseFloat(i.value))
    }
    annualInflation = {labels: inflationLabels, values: inflationValues}
    
    // Unemployment
    let unemploymentLabels = []
    let unemploymentValues = []
    const resUnemployment = await fetch(`https://www.alphavantage.co/query?function=UNEMPLOYMENT&apikey=${process.env.ALPHAVANTAGE_APIKEY}`)
    const dataUnemployment = await resUnemployment.json()
    for (const i of dataUnemployment.data) {
        unemploymentLabels.push(i.date)
        unemploymentValues.push(parseFloat(i.value))
    }
    monthlyUnemployment = {labels: unemploymentLabels, values: unemploymentValues}

  } catch(error) {
    if (error instanceof Error) console.log('error.message', error.message)
  }
  

  return {
    props: {
      gdp: annualGdp,
      interest_rates: monthlyInterestRate,
      cpi: monthlyCPI,
      inflation: annualInflation,
      unemployment: monthlyUnemployment
    }
  }
  revalidate: 86400 // 24hours
} 

export default Economy