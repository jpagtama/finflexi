import { motion } from 'framer-motion';
import { useRef } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface Props {
    title: string;
    content: string[];
    closeModalHandler: () => void;
}

const ModalAlert = ({ title, content, closeModalHandler }: Props) => {

    const closeModalOnBackdrop = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).id === 'modalBackdrop') closeModalHandler();
    }

    return <>
        <motion.div id='modalBackdrop' className='flex justify-center items-center w-screen h-screen bg-black bg-opacity-80 fixed z-40' onClick={closeModalOnBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            exit={{ opacity: 0 }}
        >
            <div className='flex flex-col rounded-md h-[40vh] w-[90vw] sm:w-3/5 lg:w-1/3 shadow-md bg-white'>
                <button type='button' className='text-3xl self-end px-2 py-2' onClick={() => closeModalHandler()}><AiOutlineCloseCircle className='text-slate-500 hover:scale-105 duration-150 hover:text-black' /></button>
                <h1 className='text-pink-800 text-3xl w-full text-center'>{title}</h1>
                <div className='flex flex-col h-full w-full bg-white rounded-b-md'>
                    <div className='flex justify-center items-center h-full w-full'>
                        {content.length > 0 && <ul>
                            {content.map((item: string, i: number) => <li key={`key_earnings_event_${i}`} >{item}</li>)}
                        </ul>}
                        {content.length === 0 && <span>
                            There are no events for this day
                        </span>}
                    </div>
                    <button type='button' className='bg-indigo-300 py-1 px-2 rounded-md hover:scale-105 duration-150 w-[75px] self-center mb-5 shadow-md' onClick={() => closeModalHandler()}>close</button>
                </div>
            </div>
        </motion.div>
    </>
}

export default ModalAlert