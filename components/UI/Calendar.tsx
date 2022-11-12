import React, { ReactPropTypes } from "react"
import styles from './Calendar.module.css'

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
    const prevMonth = new Date(`${month - 1 > 0 ? year : year - 1}/${month - 1 > 0 ? month - 1 : 12}/01`) // returns the date of previous month
    const prevMonthLastDay = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate() // returns some int from 1-31

    // Set up the array of days with all events and numbering
    let days: DayProps[] = []
    let nextMonthDay = 1
    let prevMonthDayStart = prevMonthLastDay - weekDayStart + 1
    let d = 1 // calendar day counter
    for (let i = 0; i < 35; i++) {
        if (i < weekDayStart) { days.push({ number: prevMonthDayStart++ }) }
        else if (i === weekDayStart) { days.push({ number: d++ }) }
        else if (i > weekDayStart && d <= lastDay) {
            days.push({ number: d++ })
        } else { // i > lastDay
            days.push({ number: nextMonthDay++ })
        }
    }

    const renderMonthTitle = (month: string, year: string) => {
        return <h1 className={styles.monthTitle}>{month} <span className={styles.year}>{year}</span></h1>
    }

    const renderWeekHeader = () => {

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const arrDays = dayNames.map((i, idx) => {
            return (
                <div key={idx} className={styles.weekdayContainer}>
                    <div className={styles.weekdayTitle}>
                        {i}
                    </div>
                </div>
            )
        })

        return (
            <div className={styles.weekdayRow}>
                {arrDays}
            </div>
        )
    }

    const renderTiles = () => {
        let result = []
        let week = []
        for (let i = 0; i < days.length; i++) {
            if ((i + 1) % 7 !== 0) week.push(<Day key={`${i}_day`} number={days[i].number} events={days[i].events} />)
            else {
                week.push(<Day key={`${i}_day`} number={days[i].number} events={days[i].events} />)
                result.push(
                    <div key={`${i}_week`} className={styles.row}>
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
            <div className={styles.dayContainer}>
                <span className={styles.dayNumber}>
                    {number}
                </span>
            </div>
        )
    }

    return (
        <div className={styles.container} >
            {renderMonthTitle(monthName, year.toString())}
            {renderWeekHeader()}
            {renderTiles()}
        </div>
    )
}

export default Calendar