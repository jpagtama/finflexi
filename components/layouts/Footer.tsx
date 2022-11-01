import React from 'react'
import Divider from '../UI/Divider'
import styles from '../../styles/layouts/Footer.module.css'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Divider />

        <p >Julian Pagtama <span>&copy;</span> {year}</p>
      </div>
    </footer>
  )
}

export default Footer