
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

export const formatNumberScale = (num: number): string => {
    // Define the suffixes for different orders of magnitude
    const suffixes = ["", "K", "M", "B", "T"];
    // Find the index of the suffix based on the number of digits
    const index = Math.floor(Math.log10(Math.abs(num)) / 3);
    // If the index is out of range, return the original number
    if (index < 0 || index >= suffixes.length) {
        return num.toString();
    }
    // Divide the number by the corresponding power of 1000
    const shortNum = num / Math.pow(1000, index);
    // Round the number to two decimal places and add the suffix
    let result = shortNum.toFixed(2) + suffixes[index];
    // If the result ends with .00, remove it
    if (result.endsWith(".00")) {
        result = result.slice(0, -3);
    }
    return result;
}