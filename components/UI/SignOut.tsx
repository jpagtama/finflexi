import React from 'react';
import Button from './Button';
import styles from '@styles/UI/SignOut.module.css';

interface Props {
    closeSignOutAlert: () => void
}

const signOutHandler = () => {
    signOut({ callbackUrl: '/' })
}

const SignOut = ({ closeSignOutAlert }: Props) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Are you sure you want to sign out?</h1>
            <div className={styles.buttonsContainer}>
                <Button onClick={closeSignOutAlert} label='Cancel' />
                <Button onClick={signOutHandler} label='Sign me out' />
            </div>
        </div>
    )
}

export default SignOut