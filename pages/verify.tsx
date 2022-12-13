import React from 'react'
import { MdOutlineMarkEmailUnread } from 'react-icons/md'
import { IconContext } from 'react-icons'
import styles from '@styles/VerifyRequest.module.css'

const VerifyRequest = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}></div>
            <h1 className={styles.title}>Check your Email</h1>
            <h2>You&apos;re almost there!</h2>
            <div className={styles.mailIcon}>
                <IconContext.Provider value={{ size: '3em' }}>
                    <MdOutlineMarkEmailUnread />
                </IconContext.Provider>
            </div>
            <p>Click the sign-in link we sent you and you&apos;re ready to go</p>
        </div>
    )
}

export default VerifyRequest