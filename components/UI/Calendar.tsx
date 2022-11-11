

const Calendar = () => {

    const renderMonthTitle = (month: string, year: string) => {
        return <h1 style={{ color: 'black', padding: '0.25em' }}>{month} <span style={{ fontWeight: '300' }}>{year}</span></h1>
    }

    const renderDayTitles = () => {

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const arrDays = dayNames.map((i, idx) => {
            return (
                <div key={idx} style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    color: 'black'
                }}>
                    <span style={{
                        padding: '0.5em'
                    }}>
                        {i}
                    </span>
                </div>
            )
        })

        return (
            <div style={{
                display: 'flex',
                width: '100%',
                height: '3em'
            }}>
                {arrDays}
            </div>
        )
    }

    const renderWeeks = () => {
        let arrWeeks = []
        for (let i = 0; i < 5; i++) {
            arrWeeks.push(<Week />)
        }
        return arrWeeks
    }

    const renderDays = () => {
        let arrDays = []
        for (let i = 0; i < 7; i++) {
            arrDays.push(<Day />)
        }
        return arrDays
    }

    const Week = () => {

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                flex: 1,
                borderTop: '1px solid black',
                borderBottom: '1px solid black',
                width: '100%',
            }}>
                {renderDays()}

            </div>
        )
    }

    const Day = () => {
        return (
            <div style={{
                flex: 1,
                borderBottom: 'none',
                borderLeft: '1px solid black',
                borderRight: '1px solid black',
                backgroundColor: 'gray'
            }}>
                <span></span>
            </div>
        )
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: '1em',
            width: '960px',
            height: '540px',
            backgroundColor: 'brown',
            borderRadius: '10px',
            border: '1px solid black',
            overflow: 'hidden'
        }} >
            {renderMonthTitle('November', '2022')}
            {renderDayTitles()}
            {renderWeeks()}
        </div>
    )
}

export default Calendar