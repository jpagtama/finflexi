import styles from '../../styles/layouts/Main.module.css'

interface Props {
    children: React.ReactNode
}

const Main = (props: Props) => {
  return (
    <main id="main">
        {props.children}
    </main>
  )
}

export default Main