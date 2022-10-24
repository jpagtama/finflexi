import React, { useState, useRef, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Input from '@components/UI/Input'
import Button from '@components/UI/Button'
import Loading from '@components/UI/Loading'
import * as EmailValidator from 'email-validator'
import styles from '@styles/Signin.module.css'

const SignIn = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    // console.log('router.asPath >>', router.asPath)

    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [emailSent, setEmailSent] = useState(true)
    const emailRef = useRef<HTMLInputElement>(null)

    useEffect(() => { emailRef.current?.focus() }, [])
    useEffect(() => {
        if (status === 'authenticated') {
            setTimeout(() => {
                router.push('/')
            }, 2000)
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
                <label htmlFor='email'>Email:</label>
                <Input ref={emailRef} id='email' value={email} type='email' changeHandler={emailChangeHandler} placeholder='your_email@example.com' />
                {error && <span style={{ color: 'var(--error)' }}>{errorMessage}</span>}
                <Button onClick={buttonClickHandler} label='Sign-in with email' />
            </form>
        )
    }

    return (
        <div className={styles.signupContainer}>
            <h1>{status === 'authenticated' ? 'You are signed in' : 'Sign In'}</h1>
            {status !== 'authenticated' ? renderSignInForm() : <Loading />}
        </div>
    )
}

export default SignIn