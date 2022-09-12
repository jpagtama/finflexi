export interface Status {
    status: string
    message?: string
}

export interface CustomError {
    error_message: string
}

export interface CompanyOverview {
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