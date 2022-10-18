export interface Status {
    status: string
    message?: string
}

export interface CustomError {
    error_message: string
}

export interface CompanyOverview {
    ticker: string
    movingavg50: number
    movingavg200: number
    analysttargetprice: number
    description: string
    exchange: string
    fiscalyearend: string
    forwardpe: number
    marketcap: string
    name: string
    sharesoutstanding: number
}

export interface StockPrice {
    open: number
    high: number
    low: number
    close: number
    volume: number
}

export interface StockData {
    labels: string[]
    price: StockPrice[]
}

export interface EarningsData {
    labels: string[]
    reportedEPS: number[]
    estimatedEPS: number[]
}

export interface EarningsCalendar {
    reportDate: string | null
    estimate: string | null
}