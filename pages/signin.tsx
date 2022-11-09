import React, { useState, useRef, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Input from '@components/UI/Input'
import Loading from '@components/UI/Loading'
import * as EmailValidator from 'email-validator'
import { FaExclamationCircle, FaKey } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import styles from '@styles/Signin.module.css'

const SignIn = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const emailRef = useRef<HTMLInputElement>(null)

    useEffect(() => { emailRef.current?.focus() }, [])
    useEffect(() => {
        if (status === 'authenticated') {
            const redirectTo = router.query?.callbackUrl ? router.query.callbackUrl as string : '/dashboard'
            setTimeout(() => {
                router.push(redirectTo)
            }, 1000)
        }
    }, [status])

    const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        const isValid = EmailValidator.validate(email)
        if (isValid) {
            const res = await signIn('email', { email: email })
            if (res?.error) {
                setError(true)
                setErrorMessage('Please use a valid email')
            }
        } else {
            setError(true)
            setErrorMessage('Please use a valid email')
        }
    }
    const buttonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        submitHandler(e)
    }
    const renderSignInForm = () => {
        return (
            <form className={styles.form} onSubmit={submitHandler}>
                <div className={styles.labelSection}>
                    <label htmlFor='email'>Email:</label>
                    {error && <span className={styles.error}>{errorMessage}</span>}
                </div>
                <Input ref={emailRef} id='email' value={email} type='email' changeHandler={emailChangeHandler} placeholder='youremail@example.com' />
                <button onClick={buttonClickHandler} >Sign In</button>
            </form>
        )
    }
    const renderSignInMessage = () => {
        return (
            <div className={styles.signInMsgContainer}>
                <IconContext.Provider value={{ size: '2em' }}>
                    <FaExclamationCircle />
                </IconContext.Provider>
                <p className={styles.signInMsg}>Please sign in to continue</p>
            </div>
        )
    }

    return (
        <div className={styles.signupContainer}>
            <div className={styles.signupContent}>
                <div className={styles.keyIcon}>
                    <IconContext.Provider value={{ size: '3em' }}>
                        <FaKey />
                    </IconContext.Provider>
                </div>
                <h1 className={styles.title} >{status === 'authenticated' ? 'You are signed in' : 'Sign In'}</h1>
                {/* {renderSignInMessage()} */}
                {(router.query?.error && status === 'unauthenticated') && renderSignInMessage()}
                {/* {renderSignInForm()} */}
                {status !== 'authenticated' ? renderSignInForm() : <Loading />}
                {/* <Loading /> */}
            </div>
        </div>
    )
}

export default SignIn