import React from 'react'
import styles from '../../styles/company/Profile.module.css'

interface Props {
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

const Profile = (props: Props) => {
  return (
    <div>
      <span className={styles.symbol}>{props.Symbol} </span>
      <h1 className={styles.companyName} >{props.Name}</h1>
      <p><span>Exchange:</span> {props.Exchange}</p>
      <p><span>Industry:</span> {props.Industry}</p>
      <p><span>Address:</span> {props.Address}</p>
      <p><span>Country:</span> {props.Country}</p>
      <p><span>Market Cap:</span> {props.MarketCapitalization}</p>
      <p><span>50 Day Moving Avg:</span> ${props.movingAverage50day}</p>
      <p><span>200 Day Moving Avg:</span> ${props.movingAverage200day}</p>
      <p><span>Analyst Target Price:</span> ${props.AnalystTargetPrice}</p>
      <p><span>Fiscal Year End:</span> {props.FiscalYearEnd}</p>
      <p><span>Forward PE:</span> {props.ForwardPE}</p>
      <p><span>Shares Outstanding:</span> {props.SharesOutstanding}</p>
      <p><span>Description:</span> {props.Description}</p>
    </div>
  )
}

export default Profile