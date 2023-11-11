import { useState } from 'react';
import { useRouter } from 'next/router';
import { RootState, authActions } from '@store/index';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import * as yup from 'yup';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import axios from 'axios';
import Loading from './Loading';

const signUpSchema = yup.object({
    email: yup.string().trim().required('Email is required').email('Email must be valid'),
    password: yup.string().required('Password is required')
})

interface FormValues {
    email: string;
    password: string;
}

const SignInForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const submitHandler = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
        console.log('Using main submit handler');
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/auth/signin', {
                email: values.email.trim().toLowerCase(),
                password: values.password
            });

            actions.resetForm();
            if (response.data.success) {
                console.log('success... response.data.userInfo :>> ', response.data.userInfo);
                dispatch(authActions.login(response.data.userInfo));
                router.push('/dashboard');
            } else {
                console.log('sign in failed:>>', response.data);
                dispatch(authActions.logout());
            }
            setIsSubmitting(false);
        } catch (error: any) {
            console.log('error.response :>> ', error.response);
            setIsSubmitting(false);
            if (error.response?.data?.errors?.length > 0) {
                error.response.data.errors.forEach((e: { name: string, message: string }) => {
                    actions.setFieldError(e.name, e.message);
                });
            }
        }
    }

    const guestSignInHandler = async () => {
        console.log('Using guest submit handler');
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/auth/signin', {
                email: 'guest@finflexi.com',
                password: 'P4ssword!'
            });

            if (response.data.success) {
                console.log('success... response.data.userInfo :>> ', response.data.userInfo);
                dispatch(authActions.login(response.data.userInfo));
                router.push('/dashboard');
            } else {
                console.log('sign in failed:>>', response.data);
                dispatch(authActions.logout());
            }
            setIsSubmitting(false);
        } catch (error: any) {
            setIsSubmitting(false);
        }
    }

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validationSchema={signUpSchema}
            onSubmit={submitHandler}
        >
            <Form className='flex flex-col justify-center items-center w-full gap-4'>
                <div className='flex flex-col w-full'>
                    <label htmlFor='email'>Email</label>
                    <Field id="email" name="email" className='rounded-md p-2 w-full ' type="text" placeholder='email' />
                    <span className='text-red-700 h-6 text-sm'><ErrorMessage name="email" /></span>
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="password">Password</label>
                    <Field id="password" name="password" type="password" className='rounded-md p-2 w-full ' placeholder='password' />
                    <span className='text-red-700 h-16 sm:h-7 text-sm'><ErrorMessage name="password" /></span>
                </div>
                <div className='flex justify-between flex-col sm:flex-row w-full'>
                    <button type='button' onClick={guestSignInHandler} className=' bg-green-300 rounded-full order-1 sm:-order-1 px-6 py-2 shadow-lg hover:scale-110 duration-150 mt-6'>Sign In as Guest</button>
                    {!isSubmitting && <button type='submit' className={`bg-indigo-300 rounded-full px-6 py-2 shadow-lg hover:scale-110 duration-150 mt-6 `} >Sign In</button>}
                    {isSubmitting && <Loading />}
                </div>
            </Form>
        </Formik>
    )
}

export default SignInForm;