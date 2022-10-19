
export const isJSONEmpty = (obj: Object) => {
    return JSON.stringify(obj) === '{}'
}

// date argument must come from DB column of type date
export const dbDatetoString = (date: Date) => {
    let d = null
    d = new Date(date)
    d.setDate(d.getDate() + 1)
    d = d.toLocaleDateString('en-US')
    return d
}