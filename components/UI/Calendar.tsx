import React, { ReactPropTypes } from "react"
import styles from './Calendar.module.css'

interface DayProps {
    number: number
    currentMonth: boolean
    isToday: boolean
    events: string[]
    rightBorder?: boolean
    bottomBorder?: boolean
}

interface Props {
    month?: number,
    year?: number,
    events?: {
        date: Date,
        event: string[]
    }[],
    styles?: {
        calendar?: { border?: boolean, borderColor?: string }
        header?: { background?: string, fontColor?: string },
        dates?: { background?: string, border?: boolean, borderColor?: string, numberColor?: string, todayBadgeColor?: string, todayFontColor?: string, outsideMonth?: { background?: string, fontColor?: string } },
        events?: { background?: string, fontColor?: string },
    }
}

const Calendar = ({ month, year, events, styles: propStyles }: Props) => {
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

    // Get only events within the current month
    let currentEvents: { [key: string]: string[] } = {} // store the events with day number as key and events [] as the value
    if (events) {
        for (const i of events) {
            if (i.date.getMonth() + 1 === month) {
                currentEvents[`${i.date.getDate()}`] = i.event
            }
        }
    }

    // Set up the array of days with all events and numbering
    let days: DayProps[] = []
    let nextMonthDay = 1
    let prevMonthDayStart = prevMonthLastDay - weekDayStart + 1
    let d = 1 // calendar day counter
    for (let i = 0; i < 35; i++) {
        if (i < weekDayStart) { days.push({ number: prevMonthDayStart++, currentMonth: false, isToday: false, events: [] }) }
        else if (i >= weekDayStart && d <= lastDay) {
            days.push({
                isToday: (today.getMonth() + 1 === month) && (today.getDate() === d) ? true : false,
                currentMonth: true,
                events: !currentEvents[d]?.length ? [] : currentEvents[d],
                number: d++,
            })
        } else { // for days i after lastDay
            days.push({ number: nextMonthDay++, currentMonth: false, isToday: false, events: [] })
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
            if ((i + 1) % 7 !== 0) week.push(
                <Day key={`${i}_day`} number={days[i].number} currentMonth={days[i].currentMonth} isToday={days[i].isToday} events={days[i].events} rightBorder={true} bottomBorder={true} />
            )
            else {
                week.push(
                    <Day key={`${i}_day`} number={days[i].number} currentMonth={days[i].currentMonth} isToday={days[i].isToday} events={days[i].events} rightBorder={false} bottomBorder={true} />
                )
                result.push(
                    <div key={`${i}_week`} className={styles.weekRow}>
                        {week}
                    </div>
                )
                week = []
            }
        }
        return <div className={styles.dayTilesContainer}>{result}</div>
    }

    const Day = ({ number, currentMonth, isToday, events, rightBorder, bottomBorder }: DayProps) => {
        const eventItems = events?.map((i, idx) => <li key={idx} className={styles.eventItem} style={{
            backgroundColor: propStyles?.events?.background || 'seagreen',
            color: propStyles?.events?.fontColor || 'black'
        }}>
            {i}
        </li>)

        return (
            <div className={`${currentMonth ? styles.dayContainer : styles.mobileViewDay}`} style={{
                background: currentMonth ? propStyles?.dates?.background || 'lightgray' : propStyles?.dates?.outsideMonth?.background || 'darkgray',
                borderRight: propStyles?.dates?.border === false || !rightBorder ? 'none' : `1px solid ${propStyles?.dates?.borderColor || 'black'}`,
                borderBottom: propStyles?.dates?.border === false || !bottomBorder ? 'none' : `1px solid ${propStyles?.dates?.borderColor || 'black'}`
            }}>
                <span className={`${styles.dayNumber} ${!isToday ? '' : styles.isToday}`} style={{
                    color: !isToday ? (currentMonth ? (propStyles?.dates?.numberColor || 'black') : propStyles?.dates?.outsideMonth?.fontColor || 'gray') : (propStyles?.dates?.todayFontColor || 'black'),
                    backgroundColor: !isToday ? 'none' : (propStyles?.dates?.todayBadgeColor || '#428bca'),
                }}>
                    {number}
                </span>
                {eventItems.length ? <ul className={styles.eventListContainer}>{eventItems}</ul> : ''}
            </div>
        )
    }

    return (
        <div className={styles.container} style={{
            border: propStyles?.calendar?.border === false ? 'none' : `1px solid ${propStyles?.calendar?.borderColor || 'black'}`,
        }}>
            <div className={styles.calendarHeader} style={{
                backgroundColor: propStyles?.header?.background,
                color: propStyles?.header?.fontColor || 'black'
            }}>
                {renderMonthTitle(monthName, year.toString())}
                {renderWeekHeader()}
            </div>
            {renderTiles()}
        </div>
    )
}

export default Calendar