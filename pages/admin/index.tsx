import {prisma} from '@db/index'

const AdminHome = () => {
  const companyHandler = async (company: String) => {
    const response = await fetch(`/api/admin/company/${company}`)
    const data = await response.json()
    console.log('data :>> ', data);
  }

  return (
    <>
      <h1>Admin</h1>
  
      <button onClick={() => companyHandler('AAPL')} >AAPL</button>
      <button onClick={() => companyHandler('AMZN')} >AMZN</button>
      <button onClick={() => companyHandler('TSLA')} >TSLA</button>
    </>
  )
}

export default AdminHome