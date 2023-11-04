import { IconContext } from 'react-icons';
import { BsStarFill, BsStar } from 'react-icons/bs';

const ExampleFave = () => {
    return (
        <div className='flex flex-col w-full h-36 shadow-md overflow-hidden bg-white rounded-md'>
            <div className='flex items-end justify-between p-2'>
                <span className='text-xl'>My Favorites</span>
                <span className='text-sm text-slate-400 hidden sm:block'>in one place</span>
            </div>
            <div className='flex flex-col justify-center items-center bg-slate-100 mx-2 p-2'>
                <div className='flex justify-between items-center w-full'>
                    <span className='text-xs'>NFLX</span>
                    <BsStarFill size='10' />
                </div>
                <div className='flex justify-between items-center w-full'>
                    <span className='text-xs'>SBUX</span>
                    <BsStar size='10' />
                </div>
                <div className='flex justify-between items-center w-full'>
                    <span className='text-xs'>MSFT</span>
                    <BsStarFill size='10' />
                </div>
                <div className='flex justify-between items-center w-full'>
                    <span className='text-xs'>TGT</span>
                    <BsStarFill size='10' />
                </div>
                <div className='flex justify-between items-center w-full'>
                    <span className='text-xs'>NVDA</span>
                    <BsStar size='10' />
                </div>

            </div>

        </div>
    )
}

export default ExampleFave