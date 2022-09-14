import Footer from './Footer'
import Header from './Header'
import styles from '../../styles/layouts/Main.module.css'

interface Props {
    children: React.ReactNode
}

const Main = (props: Props) => {
  return (
    <main id="main">
      <Header />
        {props.children}
      <Footer />
    </main>
  )
}

export default Main