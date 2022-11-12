import React, { ReactPropTypes } from "react"

interface DayProps {
    number: number
    events?: string[]
}

interface Props {
    month?: number,
    year?: number,
    events?: {
        date: Date,
        event: string[]
    }[]
}

const Calendar = ({ month, year, events }: Props) => {
    if (month !== undefined && (month < 1 || month > 12)) throw new Error('Invalid month: enter a number within 1 and 12.')

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const today = new Date()
    month = month === undefined ? today.getMonth() + 1 : month
    year = year === undefined ? today.getFullYear() : year
    const monthName = monthNames[month - 1]

    const thisMonth = new Date(`${year}/${month}/01`)
    const weekDayStart = thisMonth.getDay() // returns some int where 0 (Sun), 1 (Mon), etc.
    const lastDay = new Date(year, month, 0).getDate() // returns some int from 1-31

    // Set up the array of days with all events and numbering
    let days: DayProps[] = []
    let nextMonthDay = 1
    let d = 1 // calendar day counter
    for (let i = 0; i < 35; i++) {
        if (i < weekDayStart) { days.push({ number: i + 1 }) }
        else if (i === weekDayStart) { days.push({ number: d++ }) }
        else if (i > weekDayStart && d <= lastDay) {
            days.push({ number: d++ })
        } else { // i > lastDay
            days.push({ number: nextMonthDay++ })
        }
    }
    // console.log('days array length', days.length)
    // console.log('days array :>>', days)


    const renderMonthTitle = (month: string, year: string) => {
        return <h1 style={{ color: 'black', padding: '0.25em' }}>{month} <span style={{ fontWeight: '300' }}>{year}</span></h1>
    }

    const renderWeekHeader = () => {

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

    const renderTiles = () => {
        let result = []
        let week = []
        for (let i = 0; i < days.length; i++) {
            if ((i + 1) % 7 !== 0) week.push(<Day number={days[i].number} events={days[i].events} />)
            else {
                week.push(<Day number={days[i].number} events={days[i].events} />)
                result.push(
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        flex: 1,
                        borderTop: '1px solid black',
                        borderBottom: '1px solid black',
                        width: '100%',
                    }}>
                        {week}
                    </div>
                )
                week = []
            }
        }
        return result
    }

    const Day = ({ number, events }: DayProps) => {
        return (
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                borderBottom: 'none',
                borderLeft: '1px solid black',
                borderRight: '1px solid black',
                backgroundColor: 'gray',
                overflow: 'hidden'
            }}>
                <span style={{
                    alignSelf: 'flex-end',
                    color: 'black'
                }}>
                    {number}
                </span>
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
            {renderMonthTitle(monthName, year.toString())}
            {renderWeekHeader()}
            {renderTiles()}
        </div>
    )
}

export default Calendar