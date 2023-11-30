import { GetServerSidePropsContext } from 'next';
import * as jose from 'jose';

// Update manually (after retrieving data from request): ADDYY, 

const companies = ['AAL', 'AAPL', 'ABNB', 'ADBE', 'ADDYY', 'AMC', 'AMD', 'AMT', 'AMTD', 'AMZN', 'ATVI', 'AXP', 'BA', 'BABA', 'BAC', 'BB', 'BBBY', 'BBY', 'BLK', 'BMWYY', 'BRK.A', 'BRK.B', 'BYD', 'BYND', 'C', 'CAT', 'CCL', 'COF', 'COKE', 'COST', 'CRM', 'CRSP', 'CS', 'CSCO', 'CMCSA', 'CVS', 'CVX', 'DAL', 'DIS', 'DKNG', 'DVA', 'DWAC', 'EBAY', 'EFX', 'EIX', 'F', 'FDX', 'FIS', 'FSR', 'FUBO', 'GE', 'GME', 'GOOG', 'GOOGL', 'GS', 'HAS', 'HCP', 'HD', 'HI', 'HOOD', 'HSBC', 'HUBS', 'IBM', 'INFY', 'INTC', 'INTU', 'IVC', 'JD', 'JNJ', 'JPM', 'KBH', 'KHC', 'KLAC', 'KO', 'KOSS', 'KR', 'LCID', 'LMND', 'LOW', 'LUV', 'MA', 'MATW', 'MCD', 'MDB', 'META', 'MGM', 'MMM', 'MRNA', 'MS', 'MSFT', 'NFLX', 'NIO', 'NKE', 'NOC', 'NTDOY', 'NVDA', 'O', 'ORCL', 'OXY', 'PEP', 'PFE', 'PG', 'PHM', 'PINS', 'PLTR', 'PPG', 'PYPL', 'QCOM', 'QSR', 'RCL', 'RIVN', 'RTX', 'SBUX', 'SCI', 'SCHW', 'SHEL', 'SHOP', 'SNOW', 'SONY', 'SNAP', 'SPCE', 'SPY', 'T', 'TGT', 'TM', 'TMUS', 'TSLA', 'TSM', 'TWTR', 'TXN', 'U', 'UAL', 'UBER', 'UNH', 'UPS', 'UPWK', 'USB', 'V', 'VAC', 'VMW', 'VWAGY', 'VTI', 'VZ', 'WFC', 'WING', 'WIX', 'WMT', 'WYNN', 'XOM', 'XPEV', 'ZM', 'ZOM']

const popularCompanies = ['AAPL', 'AMC', 'AMZN', 'BABA', 'BB', 'BBBY', 'GOOG', 'GOOGL', 'GME', 'META', 'NFLX', 'NIO', 'TGT', 'TSLA', 'TWTR', 'WMT', 'UBER']

const ignore = ['BYDDF', 'BYDDY', 'NTDOY', 'SPY']

const AdminHome = (props: { isAuthorized: boolean }) => {
    if (!props.isAuthorized) return;

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
    const incomeStatementsHandler = async (company: string) => {
        company = company.replace(/\./g, '-')
        const response = await fetch(`/api/admin/income-statements/${company}`)
        const data = await response.json()
        console.log(company + ' income statements :>>', JSON.stringify(data.incomeStatements.annualReports[0]));
    }


    return (
        <div className='flex flex-col w-full gap-8 pt-36 pb-24'>
            <h1 className='text-5xl self-center'>Admin - Update Page</h1>
            <ul className='bg-yellow-200 p-8'>
                <li>Alphavantage only allowing 25 requests per day now. Before, it was 5 per min.</li>
                <li>To update stock prices: search the ticker symbol on yahoo finance, download the historical data, change the headers to column names, export as csv, update on supabase.</li>
            </ul>

            <div className='px-8 py-4'>
                <h2 className='text-indigo-900 text-2xl'>Economy x5</h2>
                <button className='py-2 px-4 bg-dirty-white rounded-md' onClick={economyHandler}>Update Economy Page</button>
            </div>

            <div className='bg-white'>
                <div className='w-full px-8 py-4'>
                    <h2 className='text-indigo-900 text-2xl'>General Overview x1</h2>
                    <span className='text-slate-700 text-sm'>Notes: update manually ADDYY, BMWYY, HOOD, LCID, NTDOY, RIVN, SPY, TWTR, VWAGY, VTI </span><br />
                </div>
                <div className='flex flex-wrap gap-2 px-8'>
                    {companies.map(i => <button key={i} className='py-2 px-4 bg-dirty-white rounded-md' onClick={() => companyHandler(i)} >{i}</button>)}
                </div>
            </div>
            <div className='flex flex-wrap gap-2 px-8'>
                <h2 className='text-indigo-900 text-2xl w-full'>Stock Price Popular Companies x1</h2>
                {popularCompanies.map(i => <button key={i} className='py-2 px-4 bg-dirty-white rounded-md' onClick={() => stockPriceHandler(i)} >{i}</button>)}
                <h2 className='text-indigo-900 text-2xl w-full'>Stock Price All Companies x1</h2>
                {companies.map(i => <button key={i} className='py-2 px-4 bg-dirty-white rounded-md' onClick={() => stockPriceHandler(i)} >{i}</button>)}
            </div>
            <div className='flex flex-wrap gap-2 px-8 bg-white'>
                <h2 className='text-indigo-900 text-2xl w-full'>Earnings and Calendar x2</h2>
                {companies.map(i => <button key={i} className='py-2 px-4 bg-dirty-white rounded-md' onClick={() => earningsHandler(i)} >{i}</button>)}
            </div>
            <div className='flex flex-wrap gap-2 px-8'>
                <h2 className='text-indigo-900 text-2xl w-full'>Income Statements x1</h2>
                {companies.map(i => <button key={i} className='py-2 px-4 bg-dirty-white rounded-md' onClick={() => incomeStatementsHandler(i)} >{i}</button>)}
            </div>
        </div>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    interface UserToken {
        payload: {
            email: string;
            exp: number
        }
    }
    const cookiesStore = context.req.cookies;
    let isAuthorized = false;
    let userToken: UserToken | null = null;
    const jwt = cookiesStore.jwt;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        userToken = await jose.jwtVerify(String(jwt), secret);
        if (userToken.payload.email === 'jpagtama.dev@gmail.com') isAuthorized = true;

    } catch (e) {
        console.log('e.message :>> ', e instanceof Error ? e.message : e);
        isAuthorized = false;
    }


    if (!isAuthorized || !userToken) isAuthorized === false;

    if (!isAuthorized) return { notFound: true };

    return {
        props: {
            isAuthorized
        }
    }

}

export default AdminHome