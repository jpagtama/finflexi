const EconomicIndicatorSectionGray = (props: { children: React.ReactNode, title: string, leadDescBold: string, restOfDesc: string }) => {
    return (
        <section className='flex flex-col justify-center sm:flex-row w-full py-24 px-4 bg-dirty-white gap-8'>
            <div className='flex sm:w-1/2'>
                {props.children}
            </div>
            <div className='flex flex-col gap-4 sm:w-1/3 mt-8 sm:mt-0'>
                <h2 className='font-bold text-xl' >{props.title}</h2>
                <p className='text-slate-600 font-thin'><span className='font-bold text-indigo-700'>{props.leadDescBold}</span> {props.restOfDesc}</p>
            </div>
        </section>
    )
};

export default EconomicIndicatorSectionGray;