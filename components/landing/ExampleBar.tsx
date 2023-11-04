import examplebargraph from '../../public/examplebargraph.svg';
import Image from 'next/image';

const ExampleBar = () => {
    return (
        <div className='flex flex-col w-full h-36 shadow-md overflow-hidden bg-white rounded-md'>
            <div className='flex items-end justify-between p-2'>
                <span className='text-xl'>Earnings</span>
                <span className='text-sm text-slate-400 hidden sm:block'>estimated/reported</span>
            </div>
            <div className='flex flex-col justify-center items-center bg-slate-100 pt-1 mx-2'>
                <div className='flex justify-between'>
                    <Image src={examplebargraph} alt='example graph' />
                </div>
            </div>

        </div>
    )
}

export default ExampleBar