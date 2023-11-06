import Link from 'next/link';
import * as yup from 'yup';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';

const signUpSchema = yup.object({
    email: yup.string().trim().required('Email is required').email('Email must be valid'),
    password: yup.string().required('Password is required').matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/, 'Needs at least one uppercase, lowercase, special character, number, and at least 8 characters in length'),
})

const SignUpForm = () => {
    const submitHandler = () => {

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
            <Form className='flex flex-col justify-center items-center w-full gap-4' action="">
                <div className='flex flex-col w-full'>
                    <label htmlFor='email'>Email</label>
                    <Field id="email" name="email" className='rounded-md p-2 w-full ' type="text" placeholder='your email here' />
                    <span className='text-red-700 h-6 text-sm'><ErrorMessage name="email" /></span>
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="password">Password</label>
                    <Field id="password" name="password" type="password" className='rounded-md p-2 w-full ' placeholder='desired password' />
                    <span className='text-red-700 h-16 sm:h-7 text-sm'><ErrorMessage name="password" /></span>
                </div>
                <div className='flex flex-col w-full'>
                    <span className='text-slate-500 self-end text-sm mt-2'>already have an account? <Link className='hover:scale-105 duration-150' href='/signin' >sign in instead</Link></span>
                </div>
                <div className='flex justify-between flex-col sm:flex-row w-full'>
                    <button className=' bg-green-300 rounded-full order-1 sm:-order-1 px-6 py-2 shadow-lg hover:scale-110 duration-150 mt-6'>Sign In as Guest</button>
                    <button className='bg-indigo-300 rounded-full px-6 py-2 shadow-lg hover:scale-110 duration-150 mt-6' >Sign Up</button>
                </div>
            </Form>
        </Formik>
    )
}

export default SignUpForm