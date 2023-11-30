import React from 'react'
import styles from '../../styles/UI/ChartPicker.module.css'

interface Config {
  title: string
  clickHandler: (arg: number) => void
  active: boolean
  duration: number
}

interface Props {
  buttons: Config[]
}

const ChartPicker = (props: Props) => {

  const buttons = props.buttons.map(item => {
    return <button key={`button_${item.duration}`} className={`${item.active ? 'bg-indigo-500 text-white' : ''} bg-indigo-300 rounded-md py-1 md:py-2 px-3 md:px-6`} onClick={(e: React.MouseEvent) => item.clickHandler(item.duration)} >{item.title}</button>
  })

  return (
    <div className='flex justify-center gap-8 mt-8' >
      {buttons}
    </div>
  )
}

export default ChartPicker