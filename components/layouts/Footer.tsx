import React from 'react'
import Divider from '../UI/Divider'
import styles from '../../styles/layouts/Footer.module.css'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <Divider />
      <p >Julian Pagtama <span>&copy;</span> {year}</p>
    </footer>
  )
}

export default Footer