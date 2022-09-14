import Menu from '../UI/Menu'
import styles from '../../styles/layouts/Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <Menu />
    </header>
  )
}

export default Header