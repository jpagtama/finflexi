import Image from 'next/image'
import barChartIcon from '../public/barchart_icon_300x300.svg'
import cellPhoneIcon from '../public/cellphone_icon_300x300.svg'
import gearsIcon from '../public/gears_icon_300x300.svg'
import disclaimerIcon from '../public/disclaimer_icon_300x300.svg'
import styles from '@styles/about.module.css'
import { MdSupportAgent, MdDevices, MdMenuBook } from 'react-icons/md';

const TitleDivider = () => (
    <div className='h-1 sm:h-2 w-24 bg-indigo-400 rounded-full'></div>
);

const About = () => {
    return (
        <div className='min-h-screen'>
            <div className='flex flex-col justify-center items-center pt-16 px-4 bg-[url("/humanity.webp")] bg-center md:bg-left-bottom bg-no-repeat overflow-none w-full bg-cover h-[50vh] sm:h-[100vh]'>
                <div className='w-full sm:w-4/5 p-4 bg-black bg-opacity-60 rounded-lg'>
                    <span className='flex flex-col items-center text-center gap-2'>
                        <h1 className='font-bold text-5xl sm:text-7xl md:text-8xl text-white'>OUR MISSION</h1>
                        <TitleDivider />
                        <span className='text-xl sm:text-3xl md:text-4xl text-white font-thin'> is to bring financial literacy for all</span>
                    </span>
                </div>
            </div>
            <section className='flex flex-col justify-center items-center gap-4 sm:gap-8 w-full p-8 min-h-[50vh]' >
                <div className='flex flex-col justify-center items-center gap-4 w-full md:w-3/4 lg:w-2/3'>
                    <h2 className='text-xl sm:text-2xl md:text-5xl'> WHO WE SERVE</h2>
                    <TitleDivider />
                    <p className='text-sm lg:text-xl '>
                        We serve over 1,000,000 people who want to stay informed and ahead of any financial events. We want you to feel confident knowing where the economy is headed so you can make more informed decisions. Our goal is to help prevent financial pitfalls so you can enjoy the life you deserve. We serve professionals young and old. We serve doctors, law-enforcement, office-workers, students, and anyone who wants to be more in tuned with the economy.
                    </p>
                </div>
            </section>
            <div className='flex flex-col justify-center items-center w-full h-[300px] sm:h-[400px] relative'>
                <div className='w-4/5 sm:w-3/4 md:w-1/2 h-full bg-[url("/centralpark.webp")] bg-no-repeat bg-center bg-cover rounded-lg shadow-lg absolute bottom-0 lg:-bottom-1/3 mb-4'>
                    <div className='flex flex-col justify-end h-full w-full bg-gradient-to-b from-transparent to-black rounded-lg text-white px-2 py-8'>
                        <h2 className='text-xl sm:text-2xl md:text-4xl' >Not just numbers, it's about people too.</h2>
                        <p className='text-sm lg:text-lg font-thin'>We care about the well-being of humanity and aim to solve the biggest burden that affects all of our lives.</p>
                    </div>
                </div>
            </div>
            <section className='flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 w-full h-auto md:min-h-screen bg-dirty-white' >
                <div className='flex flex-col items-center sm:items-end w-full sm:w-1/2 p-8'>
                    <div className='flex flex-col items-center gap-4 sm:gap-8 w-full sm:w-3/4'>
                        <h2 className='text-xl sm:text-2xl md:text-5xl self-center'>OUR COMMITMENT</h2>
                        <TitleDivider />
                        <p className='text-sm lg:text-xl text-left overflow-y-scroll'>
                            We work with professionals who come from a variety of backgrounds who has been through or witnessed financial hardships. We know what it's like constantly treading water just to stay afloat. We want to provide the tools that make it easier to notice the red flags that could potentially change your livelihood. By removing all the distractions that typically come with fintech software, Finflexi focuses only on the data that matters.
                        </p>
                    </div>
                </div>
                <div className='flex justify-center sm:justify-start items-center -order-1 sm:order-1 w-full sm:w-1/2 h-full p-4'>
                    <div className='bg-[url("/teamwork.webp")] bg-center md:bg-left bg-no-repeat overflow-none bg-cover hexagon h-48 md:h-96 w-48 md:w-96 shadow-md'></div>
                </div>
            </section>

            <section className='flex flex-col justify-center items-center lg:gap-8 w-full h-auto md:min-h-screen py-8' >
                <div className='flex justify-center w-full sm:w-2/3 gap-8 px-2 py-8 sm:p-0'>
                    <div className='flex flex-col items-center gap-3 w-1/3 sm:w-1/4 h-[200px] sm:h-auto'>
                        <div className='flex justify-center items-center h-10 md:h-24 w-10 mb-4 md:w-24 bg-gradient-to-bl from-indigo-400 to-green-400 rounded-full'>
                            <MdSupportAgent className='h-8 md:h-16 w-8 md:w-16 text-white' />
                        </div>
                        <span className='text-indigo-700 text-sm lg:text-3xl text-center'>Human Support</span>
                        <p className='text-xs lg:text-lg text-center text-indigo-400'>You can count on our experts for quality tech support</p>
                    </div>
                    <div className='flex flex-col items-center gap-3 w-1/3 sm:w-1/4 h-[200px] sm:h-auto'>
                        <div className='flex justify-center items-center h-10 md:h-24 w-10 mb-4 md:w-24 bg-gradient-to-bl from-indigo-400 to-green-400 rounded-full'>
                            <MdDevices className='h-8 md:h-16 w-8 md:w-16 text-white' />
                        </div>
                        <span className='text-indigo-700 text-sm lg:text-3xl text-center'>One Place</span>
                        <p className='text-xs lg:text-lg text-center text-indigo-400'>Access Finflexi on multiple devices so you can stay on top</p>
                    </div>
                    <div className='flex flex-col items-center gap-3 w-1/3 sm:w-1/4 h-auto'>
                        <div className='flex justify-center items-center h-10 md:h-24 w-10 mb-4 md:w-24 bg-gradient-to-bl from-indigo-400 to-green-400 rounded-full'>
                            <MdMenuBook className='h-8 md:h-16 w-8 md:w-16 text-white' />
                        </div>
                        <span className='text-indigo-700 text-sm lg:text-3xl text-center'>Resourceful</span>
                        <p className='text-xs lg:text-lg text-center text-indigo-400'>Finflexi has all the data you need to get you to a flying start</p>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-4 sm:gap-8 w-full md:w-3/4 p-8'>
                    <h2 className='text-xl sm:text-2xl md:text-5xl self-center'>ONE MORE THING</h2>
                    <TitleDivider />
                    <p className='text-sm lg:text-xl text-left'>
                        The key to our work is an intuitive and engaging user experience. We are constantly thinking creatively to find ways we can simplify complex financial mechanisms that fuel the economy.
                    </p>
                </div>

            </section>
        </div>
    )
}

export default About;