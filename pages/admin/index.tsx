import { prisma } from '@db/index'

const AdminHome = () => {
    const economyHandler = async () => {
        const response = await fetch(`/api/admin/economy`)
        const data = await response.json()
    }
    const companyHandler = async (company: string) => {
        company = company.replace(/\./g, '-')
        const response = await fetch(`/api/admin/company/${company}`)
        const data = await response.json()
    }
    const stockPriceHandler = async (company: string) => {
        company = company.replace(/\./g, '-')
        const response = await fetch(`/api/admin/stock-price/${company}`)
        const data = await response.json()
    }
    const earningsHandler = async (company: string) => {
        company = company.replace(/\./g, '-')
        const response = await fetch(`/api/admin/earnings/${company}`)
        const data = await response.json()
        console.log('data response :>> ', data);
    }

    // TO ADD: 'AAL','ADBE','BLK','CAT','CCL','COF','CVX','COST','CSCO','CRM','CMCSA','DAL','EBAY','EFX','EIX','F','FDX','FIS','GE','GS','HAS','HD','HSBC','KR','INTU','INTC','INFY','JNJ','JD','KBH','KHC','LOW','LUV','LVMUY','LVMHF','LMND','MA','MDB','MGM','PHM','NOC','O','ORCL','PEP','Q','QSR','RTX','SHEL','SCHW','SNOW','SPY','TSM','TM','TXN','UPS','VAC','VMW','VTI','WING','WIX','XPEV','ZM'
    const companies = ['AAPL', 'AMD', 'AMT', 'AMTD', 'AMZN', 'BA', 'BABA', 'BAC', 'BBBY', 'BBY', 'BRK.A', 'BRK.B', 'C', 'COKE', 'CS', 'DIS', 'GME', 'GOOG', 'GOOGL', 'HCP', 'HI', 'IBM', 'IVC', 'JPM', 'KLAC', 'KO', 'KOSS', 'MATW', 'MCD', 'META', 'MMM', 'MRNA', 'MS', 'MSFT', 'NFLX', 'NIO', 'NKE', 'NVDA', 'OXY', 'PFE', 'PG', 'PPG', 'PYPL', 'RCL', 'SBUX', 'SCI', 'SHOP', 'SONY', 'T', 'TGT', 'TMUS', 'TSLA', 'UAL', 'UNH', 'USB', 'V', 'VZ', 'WFC', 'WMT', 'XOM']

    return (
        <>
            <h1>Admin - Update Page</h1>

            <div>
                <h2>Economy x5</h2>
                <button onClick={economyHandler}>Update Economy Page</button>
            </div>
            <div>
                <h2>General Overview x1</h2>
                {companies.map(i => <button key={i} onClick={() => companyHandler(i)} >{i}</button> )}
            </div>
            <div>
                <h2>Stock Price x1</h2>
                {companies.map(i => <button key={i} onClick={() => stockPriceHandler(i)} >{i}</button> )}
            </div>
            <div>
                <h2>Earnings and Calendar x2</h2>
                {companies.map(i => <button key={i} onClick={() => earningsHandler(i)} >{i}</button> )}
            </div>
        </>
    )
}

export default AdminHome