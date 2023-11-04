import { IconContext } from 'react-icons';
import { BsGraphUp, BsGraphDown, BsCalendar3, BsReverseListColumnsReverse } from 'react-icons/bs';

const ExampleDashboard = () => {
    return (
        <div className='flex flex-col rounded-md gap-2 bg-white h-96 w-full shadow-md overflow-y-hidden'>
            <div className='flex items-end justify-between p-2'>
                <span className="text-xl">Dashboard</span>
            </div>
            <hr />
            <div className='flex flex-col items-center gap-3 mt-4'>
                <span className='text-sm text-slate-400'>Price Action Overview</span>
                <div className='flex justify-center gap-2 w-full px-2'>
                    <BsGraphUp size='50' color='#A5B4FC' />
                    <BsGraphDown size='50' color='#A5B4FC' />
                    <BsGraphUp size='50' color='#A5B4FC' />
                </div>
                <div className='flex justify-center gap-2 w-full px-2'>
                    <BsGraphDown size='50' color='#A5B4FC' />
                    <BsGraphUp size='50' color='#A5B4FC' />
                    <BsGraphUp size='50' color='#A5B4FC' />
                </div>
            </div>
            <div className='flex flex-col items-center gap-3 mt-4'>
                <span className='text-sm text-slate-400'>Upcoming Earnings</span>
                <div className='flex justify-center gap-2 w-full px-2'>
                    <BsReverseListColumnsReverse size='50' color='#4F46E5' />
                    <BsCalendar3 size='50' color='#4F46E5' />
                </div>
            </div>

        </div>
    )
}

export default ExampleDashboard