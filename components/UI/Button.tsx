import React from 'react'

interface Props {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    label: string
}

const Button = ({ onClick, label }: Props) => {
    return (
        <button onClick={onClick} style={{ padding: '1em', border: 'none', borderRadius: '5px', cursor: 'pointer', backgroundColor: 'var(--neon-green)', color: 'black' }} >
            {label}
        </button>
    )
}

export default Button