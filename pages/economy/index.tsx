import React, { useState } from 'react';
import { prisma } from '@db/index';
import ChartPicker from '../../components/UI/ChartPicker';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { ChartOptions, RadialLinearScale } from 'chart.js';
import EconomicIndicatorSectionGray from './EconomicIndicatorSectionGray';
import EconomicIndicatorSectionNoBg from './EconomicIndicatorSectionNoBg';


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
        RadialLinearScale,
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
                borderColor: 'none',
                backgroundColor: '#A5B4FC',
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
            <div className='w-full'>
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
                borderColor: '#A5B4FC',
                backgroundColor: '#A5B4FC',
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
            <div className='w-full'>
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
                borderColor: '#A5B4FC',
                backgroundColor: '#A5B4FC',
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
            <div className='w-full'>
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
                borderColor: '#A5B4FC',
                backgroundColor: '#A5B4FC',
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
            <div className='w-full'>
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
                borderColor: '#A5B4FC',
                backgroundColor: '#A5B4FC',
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
            <div className='w-full'>
                <Line options={options} data={data} />
                <ChartPicker buttons={buttons} />
            </div>
        )
    }



    return (
        <div className='flex flex-col justify-center items-center w-full pt-36'>
            <h1 className='text-3xl sm:text-5xl md:text-7xl text-center mb-24'><span className='font-bold'>ECONOMIC</span> indicators</h1>
            <EconomicIndicatorSectionGray title='GROSS DOMESTIC PRODUCT' leadDescBold='Gross Domestic Product' restOfDesc='or GDP, is a measure of the total value of all the goods and services produced in a country during a specific period of time. It is often used as an indicator of the economic health and growth of a country.' >
                {renderGDP()}
            </EconomicIndicatorSectionGray>
            <EconomicIndicatorSectionNoBg title='FEDERAL INTEREST RATES' leadDescBold='Federal interest rates'
                restOfDesc='are the target range set by the Federal Reserve, the central bank of the United States. The Federal Reserve uses interest rates as a tool to influence the money supply and the economic activity in the country. It affects the borrowing and lending costs of banks, businesses, and consumers, as well as the returns on savings and investments. Higher federal interest rates mean that it is more expensive to borrow money and more rewarding to save money. This can reduce the demand for credit and spending, and increase the supply of savings and investment. Higher federal interest rates can also lower inflation, slow down economic growth, and affect the exchange rate of the U.S. Dollar.'>
                {renderInterestRates()}
            </EconomicIndicatorSectionNoBg>
            <EconomicIndicatorSectionGray title='CONSUMER PRICE INDEX' leadDescBold='Consumer Price Idex' restOfDesc='or CPI, is a measure of the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services. It is one of the most popular measures of inflation and deflation. A higher CPI means that the average prices of goods and services in the economy have increased over a period of time. This can indicate an inflationary situation.' >
                {renderCPI()}
            </EconomicIndicatorSectionGray>
            <EconomicIndicatorSectionNoBg title='INFLATION' leadDescBold='Inflation'
                restOfDesc='is a general increase of the prices of goods and services in an economy over time. It means that the value of money decreases and the purchasing power of consumers and businesses erodes. It reduces the real income and wealth of people, especially those who have fixed incomes or savings. This means that they can buy fewer goods and services with the same amount of money.'>
                {renderInflation()}
            </EconomicIndicatorSectionNoBg>
            <EconomicIndicatorSectionGray title='UNEMPLOYMENT' leadDescBold='The unemployment indicator' restOfDesc='is a measure of the percentage of the labor force that is actively looking for work but cannot find a job. It affects the productivity and growth of the economy. When people are unemployed, they are not contributing to the output of the economy. This means that the economy is producing less than its potential.' >
                {renderUnemployment()}
            </EconomicIndicatorSectionGray>

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

    } catch (error) { }

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