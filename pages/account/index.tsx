import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import devIcon from '../../public/development_icon_300x300.svg'
import styles from '@styles/MyAccount.module.css'

export const MyAccount = () => {
    const { data, status } = useSession()
    // console.log('session data', data)

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Account</h1>
            <div className={styles.constructionContainer}>
                <Image className={styles.constructionImg} src={devIcon} alt="construction icon" />
                <h2>This page is currently under construction. Thank you for your patience</h2>
            </div>
        </div>
    )
}

export default MyAccount