import React, { useState } from 'react'
import { prisma } from '@db/index'
import ChartPicker from '../../components/UI/ChartPicker'
import Divider from '../../components/UI/Divider'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import type { ChartOptions } from 'chart.js'
import styles from '../../styles/economy/Economy.module.css'
import moment from 'moment'


interface Props {
    gdp: { labels: string[], values: number[] }
    interest_rates: { labels: string[], values: number[] }
    cpi: { labels: string[], values: number[] }
    inflation: { labels: string[], values: number[] }
    unemployment: { labels: string[], values: number[] }
}

const Economy = ({ gdp, interest_rates, cpi, inflation, unemployment }: Props) => {

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
            { title: '10yr', clickHandler: clickHandler, active: gdpTimeFrame === 10, duration: 10 },
            { title: '20yr', clickHandler: clickHandler, active: gdpTimeFrame === 20, duration: 20 },
            { title: '30yr', clickHandler: clickHandler, active: gdpTimeFrame === 30, duration: 30 }
        ]

        return (
            <div className={styles.sectionContainer}>
                <h2 className={styles.sectionTitle}>Gross Domestic Product</h2>
                <Bar data={data} />
                <ChartPicker buttons={buttons} />
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
            labels: interest_rates.labels.slice(0, interestRatesTimeFrame).reverse(),
            datasets: [{
                label: 'Percent',
                data: interest_rates.values.slice(0, interestRatesTimeFrame).reverse(),
                borderColor: '#F900BF',
                backgroundColor: '#F900BF',
            }]
        }
        const clickHandler = (arg: number) => {
            setInterestRatesTimeFrame(arg)
        }
        const buttons = [
            { title: '2yr', clickHandler: clickHandler, active: interestRatesTimeFrame === 24, duration: 24 },
            { title: '5yr', clickHandler: clickHandler, active: interestRatesTimeFrame === 60, duration: 60 },
            { title: '10yr', clickHandler: clickHandler, active: interestRatesTimeFrame === 120, duration: 120 }
        ]
        return (
            <div className={styles.sectionContainer}>
                <h2 className={styles.sectionTitle}>Federal Interest Rates</h2>
                <Line options={options} data={data} />
                <ChartPicker buttons={buttons} />
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
            labels: cpi.labels.slice(0, cpiTimeFrame).reverse(),
            datasets: [{
                label: 'CPI',
                data: cpi.values.slice(0, cpiTimeFrame).reverse(),
                borderColor: '#F900BF',
                backgroundColor: '#F900BF',
            }]
        }
        const clickHandler = (arg: number) => {
            setCpiTimeFrame(arg)
        }
        const buttons = [
            { title: '2yr', clickHandler: clickHandler, active: cpiTimeFrame === 24, duration: 24 },
            { title: '5yr', clickHandler: clickHandler, active: cpiTimeFrame === 60, duration: 60 },
            { title: '10yr', clickHandler: clickHandler, active: cpiTimeFrame === 120, duration: 120 }
        ]
        return (
            <div className={styles.sectionContainer}>
                <h2 className={styles.sectionTitle}>Consumer Price Index</h2>
                <Line options={options} data={data} />
                <ChartPicker buttons={buttons} />
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
            labels: inflation.labels.slice(0, inflationTimeFrame).reverse(),
            datasets: [{
                label: 'Inflation',
                data: inflation.values.slice(0, inflationTimeFrame).reverse(),
                borderColor: '#F900BF',
                backgroundColor: '#F900BF',
            }]
        }
        const clickHandler = (arg: number) => {
            setInflationTimeFrame(arg)
        }
        const buttons = [
            { title: '10yr', clickHandler: clickHandler, active: inflationTimeFrame === 10, duration: 10 },
            { title: '20yr', clickHandler: clickHandler, active: inflationTimeFrame === 20, duration: 20 },
            { title: '30yr', clickHandler: clickHandler, active: inflationTimeFrame === 30, duration: 30 }
        ]
        return (
            <div className={styles.sectionContainer}>
                <h2 className={styles.sectionTitle}>Inflation</h2>
                <Line options={options} data={data} />
                <ChartPicker buttons={buttons} />
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
            labels: unemployment.labels.slice(0, unemploymentTimeFrame).reverse(),
            datasets: [{
                label: 'Unemployment',
                data: unemployment.values.slice(0, unemploymentTimeFrame).reverse(),
                borderColor: '#F900BF',
                backgroundColor: '#F900BF',
            }]
        }
        const clickHandler = (arg: number) => {
            setUnemploymentTimeFrame(arg)
        }
        const buttons = [
            { title: '2yr', clickHandler: clickHandler, active: unemploymentTimeFrame === 24, duration: 24 },
            { title: '5yr', clickHandler: clickHandler, active: unemploymentTimeFrame === 60, duration: 60 },
            { title: '10yr', clickHandler: clickHandler, active: unemploymentTimeFrame === 120, duration: 120 }
        ]
        return (
            <div className={styles.sectionContainer}>
                <h2 className={styles.sectionTitle}>Unemployment</h2>
                <Line options={options} data={data} />
                <ChartPicker buttons={buttons} />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Economic Indicators</h1>
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

        // Get DB records
        const gdp = await prisma.gross_domestic_product.findMany()
        const interestRates = await prisma.interest_rates.findMany()
        const cpi = await prisma.consumer_price_index.findMany()
        const inflation = await prisma.inflation.findMany()
        const unemployment = await prisma.unemployment.findMany()

        // Annual GDP
        let annualGdpLabels = []
        let annualGdpValues = []
        for (const i of gdp) {
            let d = new Date(i.date)
            d.setDate(d.getDate() + 1)
            annualGdpLabels.push(d.toLocaleDateString('en-US'))
            annualGdpValues.push(i.value.toString())
        }
        annualGdp = { labels: annualGdpLabels, values: annualGdpValues }

        // Monthly Federal Funds Interest Rate 
        let monthlyInterestRateLabels = []
        let monthlyInterestRateValues = []
        for (const i of interestRates) {
            let d = new Date(i.date)
            d.setDate(d.getDate() + 1)
            monthlyInterestRateLabels.push(d.toLocaleDateString('en-US'))
            monthlyInterestRateValues.push(i.value.toString())
        }
        monthlyInterestRate = { labels: monthlyInterestRateLabels, values: monthlyInterestRateValues }

        // Monthly Consumer Price Index
        let monthlyCPILabels = []
        let monthlyCPIValues = []
        for (const i of cpi) {
            let d = new Date(i.date)
            d.setDate(d.getDate() + 1)
            monthlyCPILabels.push(d.toLocaleDateString('en-US'))
            monthlyCPIValues.push(i.value.toString())
        }
        monthlyCPI = { labels: monthlyCPILabels, values: monthlyCPIValues }

        // Annual Inflation
        let inflationLabels = []
        let inflationValues = []
        for (const i of inflation) {
            let d = new Date(i.date)
            d.setDate(d.getDate() + 1)
            inflationLabels.push(d.toLocaleDateString('en-US'))
            inflationValues.push(i.value.toString())
        }
        annualInflation = { labels: inflationLabels, values: inflationValues }

        // Unemployment
        let unemploymentLabels = []
        let unemploymentValues = []
        for (const i of unemployment) {
            let d = new Date(i.date)
            d.setDate(d.getDate() + 1)
            unemploymentLabels.push(d.toLocaleDateString('en-US'))
            unemploymentValues.push(i.value.toString())
        }
        monthlyUnemployment = { labels: unemploymentLabels, values: unemploymentValues }

    } catch (error) {
        if (error instanceof Error) console.log('error.message', error.message)
    }

    return {
        props: {
            gdp: annualGdp,
            interest_rates: monthlyInterestRate,
            cpi: monthlyCPI,
            inflation: annualInflation,
            unemployment: monthlyUnemployment
        },
        revalidate: 86400 // 24hours
    }
}

export default Economy