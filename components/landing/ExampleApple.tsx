import { AiFillApple } from 'react-icons/ai';
import examplelinegraph from '../../public/examplelinegraph.svg';
import Image from 'next/image';

const ExampleApple = () => {
    return (
        <div className='flex flex-col rounded-md gap-2 bg-white h-96 w-full shadow-md overflow-y-hidden'>
            <div className='flex justify-between items-center pt-4 pr-2'>
                <div className='flex items-center gap-2'>
                    <AiFillApple size='35px' />
                    <p className='text-xl'>Apple Inc.</p>
                </div>
                <span className='text-md text-slate-400'>$144.49</span>
            </div>
            <hr />
            <div className='flex justify-center items-center mt-4 p-2 bg-slate-100 mx-2'>
                <Image src={examplelinegraph} alt='example graph' />
            </div>
            <div className='flex flex-col items-center gap-6 mt-4'>
                <div className='flex justify-between w-full px-2'>
                    <span className='text-sm text-slate-600'>Ticker Symbol</span>
                    <span className='text-sm text-slate-600 font-bold'>AAPL</span>
                </div>

                <div className='flex justify-between w-full px-2'>
                    <span className='text-sm text-slate-600'>Exchange</span>
                    <span className='text-sm text-slate-600 font-bold'>NASDAQ</span>
                </div>

                <div className='flex justify-between w-full px-2'>
                    <span className='text-sm text-slate-600'>Market Cap</span>
                    <span className='text-sm text-slate-600 font-bold'>$2.3T</span>
                </div>

                <div className='flex justify-between w-full px-2'>
                    <span className='text-sm text-slate-600'>Analyst Target Price</span>
                    <span className='text-sm text-slate-600 font-bold'>$178.15</span>
                </div>

                {/* <div className='flex justify-between w-full px-2'>
                    <span className='text-sm text-slate-600'>Shares Outstanding</span>
                    <span className='text-sm text-slate-600 font-bold'>15.9B</span>
                </div>

                <div className='flex justify-between w-full px-2'>
                    <span className='text-sm text-slate-600'>Forward PE</span>
                    <span className='text-sm text-slate-600 font-bold'>23.09</span>
                </div>

                <div className='flex justify-between w-full px-2'>
                    <span className='text-sm text-slate-600'>50 Day Moving Avg</span>
                    <span className='text-sm text-slate-600 font-bold'>$145.15</span>
                </div>

                <div className='flex justify-between w-full px-2'>
                    <span className='text-sm text-slate-600'>200 Day Moving Avg</span>
                    <span className='text-sm text-slate-600 font-bold'>$153.43</span>
                </div> */}
            </div>
        </div>
    )
}

export default ExampleApple