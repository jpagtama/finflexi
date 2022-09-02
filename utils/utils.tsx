
export const isJSONEmpty = (obj: Object) => {
    return JSON.stringify(obj) === '{}'
}