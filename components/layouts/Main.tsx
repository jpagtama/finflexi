import styles from '../../styles/layouts/Main.module.css'

interface Props {
    children: React.ReactNode
}

const Main: React.FC<Props> = (props) => {
  return (
    <main id="main">
        {props.children}
    </main>
  )
}

export default Main