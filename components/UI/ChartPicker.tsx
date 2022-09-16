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
    return <button key={`button_${item.duration}`} className={item.active? styles.isActive: ''} onClick={(e: React.MouseEvent) => item.clickHandler(item.duration)} >{item.title}</button>
  })

  return (
    <div className={styles.container}>
      {buttons}
    </div>
  )
}

export default ChartPicker