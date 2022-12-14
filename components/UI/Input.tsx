import React, { useRef, forwardRef, useImperativeHandle } from 'react'

interface Props {
    value: string
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
    id?: string
    ref?: string
    type?: string
    placeholder?: string
}

const Input = forwardRef(({ value, id, changeHandler, type = 'text', placeholder = '' }: Props, ref) => {

    const inputRef = useRef<HTMLInputElement>(null)
    // const setFocus = () => {
    //     inputRef.current?.focus()
    // }
    useImperativeHandle(ref, () => ({ focus: () => inputRef.current?.focus() }))

    return (
        <input ref={inputRef} id={id} type={type} value={value} onChange={changeHandler} placeholder={placeholder}
            style={{ width: "100%", padding: "1em", border: "none", borderRadius: "5px", color: "ivory", backgroundColor: "var(--gray)", fontSize: "16px" }} />
    )
})

// set display name
Input.displayName = 'InputComponent';

export default Input