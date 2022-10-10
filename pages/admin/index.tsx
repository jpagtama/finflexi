import {prisma} from '@db/index'

const AdminHome = () => {
  const economyHandler = async() => {
    const response = await fetch(`/api/admin/economy`)
    const data = await response.json()
    console.log('response data :>> ', data);
  }
  const companyHandler = async (company: string) => {
    const response = await fetch(`/api/admin/company/${company}`)
    const data = await response.json()
  }
  const stockPriceHandler = async (company: string) => {
    const response = await fetch(`/api/admin/stock-price/${company}`)
    const data = await response.json()
  }

  return (
    <>
      <h1>Admin - Update Page</h1>
  
      <div>
        <h2>Economy</h2>
        <button onClick={economyHandler}>Update Economy Page</button>
      </div>
      <div>
        <h2>General Overview</h2>
        <button onClick={() => companyHandler('AAPL')} >AAPL</button>
        <button onClick={() => companyHandler('AMZN')} >AMZN</button>
        <button onClick={() => companyHandler('MSFT')} >MSFT</button>
        <button onClick={() => companyHandler('TGT')} >TGT</button>
        <button onClick={() => companyHandler('TSLA')} >TSLA</button>
        <button onClick={() => companyHandler('WMT')} >WMT</button>
      </div>
      <div>
        <h2>Stock Price</h2>
        <button onClick={() => stockPriceHandler('AAPL')} >AAPL</button>
        <button onClick={() => stockPriceHandler('AMZN')} >AMZN</button>
        <button onClick={() => stockPriceHandler('MSFT')} >MSFT</button>
        <button onClick={() => stockPriceHandler('TGT')} >TGT</button>
        <button onClick={() => stockPriceHandler('TSLA')} >TSLA</button>
        <button onClick={() => stockPriceHandler('WMT')} >WMT</button>
      </div>
    </>
  )
}

export default AdminHome