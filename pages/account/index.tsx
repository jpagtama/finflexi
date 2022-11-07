import React from 'react'
import { useSession } from 'next-auth/react'
import styles from '@styles/MyAccount.module.css'

export const MyAccount = () => {
    const { data, status } = useSession()
    console.log('session data', data)
    // const {data, status: sessionStatus} = useSession({
    //     required: true,

    // })

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Account</h1>
        </div>
    )
}

export default MyAccount