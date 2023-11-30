import SignInForm from '@components/UI/SignInForm'

const SignIn = () => {

    return (
        <div className='flex flex-col items-center gap-2 w-full min-h-screen pt-36 px-8'>
            <h1 className='text-4xl sm:text-7xl'><span className='font-bold'>SIGN</span><span className='font-thin'>in</span></h1>
            <div className='flex flex-col bg-dirty-white w-full sm:w-[400px] p-8 rounded-lg mb-12'>
                <SignInForm />
            </div>
        </div>
    )
}

export default SignIn