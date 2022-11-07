import React from 'react'
import Divider from '../UI/Divider'
import styles from '../../styles/layouts/Footer.module.css'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Divider />
        <ul>
          <li className={styles.listTitle}>Company</li>
          <li>About</li>
          <li>API</li>
          <li>View the code</li>
        </ul>
        <p className={styles.disclaimer}>
          All data provided on Finflexi is provided for informational purposes only, and is not intended for trading or investing purposes. Stock prices displayed in the ticker are from a subset of exchanges, this price does not represent the real-time price.
        </p>
        <p className={styles.copyRight} >Julian Pagtama <span>&copy;</span> {year}</p>
      </div>
    </footer>
  )
}

export default Footer