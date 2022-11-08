import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Divider from '@components/UI/Divider'
import styles from '@styles/Dashboard.module.css'
import Loading from '@components/UI/Loading'

const Dashboard = () => {
    const router = useRouter()

    const { data: sessionData, status: sessionStatus } = useSession({
        required: true,
        onUnauthenticated() {
            signIn('email', { callbackUrl: router.asPath })
        }
    })

    if (sessionStatus === 'loading') return <Loading />

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Dashboard</h1>
            <Divider />

        </div>
    )
}

export default Dashboard