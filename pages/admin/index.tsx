import { prisma } from '@db/index'

// TO ADD: 
const companies = ['AAL', 'AAPL', 'ABNB', 'ADBE', 'ADDYY', 'AMC', 'AMD', 'AMT', 'AMTD', 'AMZN', 'ATVI', 'AXP', 'BA', 'BABA', 'BAC', 'BB', 'BBBY', 'BBY', 'BLK', 'BMWYY', 'BRK.A', 'BRK.B', 'BYD', 'BYDDF', 'BYDDY', 'BYND', 'C', 'CAT', 'CCL', 'COF', 'COKE', 'COST', 'CRM', 'CRSP', 'CS', 'CSCO', 'CMCSA', 'CVS', 'CVX', 'DAL', 'DIS', 'DVA', 'DWAC', 'EBAY', 'EFX', 'EIX', 'F', 'FDX', 'FIS', 'FSR', 'FUBO', 'GE', 'GME', 'GOOG', 'GOOGL', 'GS', 'HAS', 'HCP', 'HD', 'HI', 'HOOD', 'HSBC', 'HUBS', 'IBM', 'INFY', 'INTC', 'INTU', 'IVC', 'JD', 'JNJ', 'JPM', 'KBH', 'KHC', 'KLAC', 'KO', 'KOSS', 'KR', 'LCID', 'LMND', 'LOW', 'LUV', 'MA', 'MATW', 'MCD', 'MDB', 'META', 'MGM', 'MMM', 'MRNA', 'MS', 'MSFT', 'NFLX', 'NIO', 'NKE', 'NOC', 'NTDOY', 'NVDA', 'O', 'ORCL', 'OXY', 'PEP', 'PFE', 'PG', 'PHM', 'PLTR', 'PPG', 'PYPL', 'QCOM', 'QSR', 'RCL', 'RIVN', 'RTX', 'SBUX', 'SCI', 'SCHW', 'SHEL', 'SHOP', 'SNOW', 'SONY', 'SNAP', 'SPCE', 'SPY', 'T', 'TGT', 'TM', 'TMUS', 'TSLA', 'TSM', 'TWTR', 'TXN', 'U', 'UAL', 'UBER', 'UNH', 'UPS', 'UPWK', 'USB', 'V', 'VAC', 'VMW', 'VWAGY', 'VTI', 'VZ', 'WFC', 'WING', 'WIX', 'WMT', 'WYNN', 'XOM', 'XPEV', 'ZM']

const ignore = ['BYDDF', 'BYDDY', 'NTDOY', 'SPY']

const AdminHome = () => {
    const economyHandler = async () => {
        const response = await fetch(`/api/admin/economy`)
        const data = await response.json()
        console.log(`economy update status: successful: ${data.status?.success} message: ${data.status?.message}`)
    }
    const companyHandler = async (company: string) => {
        try {
            if (ignore.includes(company)) {
                throw new Error(`Update ${company} manually`)
            }
            company = company.replace(/\./g, '-')
            const response = await fetch(`/api/admin/company/${company}`)
            const data = await response.json()
            console.log(`economy update status: successful: ${data.status?.success} message: ${data.status?.message}`)

        } catch (error) {
            if (error instanceof Error) {
                console.log(`economy update status: successful: false message: ${error.message}`)
                return
            }
            console.log(`economy update status: successful: false message: unable to process`)
        }
    }
    const stockPriceHandler = async (company: string) => {
        company = company.replace(/\./g, '-')
        const response = await fetch(`/api/admin/stock-price/${company}`)
        const data = await response.json()
        console.log(`economy update status: successful: ${data.status?.success} message: ${data.status?.message}`)
    }
    const earningsHandler = async (company: string) => {
        company = company.replace(/\./g, '-')
        const response = await fetch(`/api/admin/earnings/${company}`)
        const data = await response.json()
        console.log(`economy update status: successful: ${data.status?.success} message: ${data.status?.message}`)
    }

    return (
        <>
            <h1>Admin - Update Page</h1>

            <div>
                <h2>Economy x5</h2>
                <button onClick={economyHandler}>Update Economy Page</button>
            </div>
            <div>
                <h2>General Overview x1</h2>
                <span>Notes: update manually SPY, BYDDF, BYDDY, NTDOY, VWAGY, VTI, HOOD, LCID, ADDYY </span><br />
                {companies.map(i => <button key={i} onClick={() => companyHandler(i)} >{i}</button>)}
            </div>
            <div>
                <h2>Stock Price x1</h2>
                {companies.map(i => <button key={i} onClick={() => stockPriceHandler(i)} >{i}</button>)}
            </div>
            <div>
                <h2>Earnings and Calendar x2</h2>
                {companies.map(i => <button key={i} onClick={() => earningsHandler(i)} >{i}</button>)}
            </div>
        </>
    )
}

export default AdminHome