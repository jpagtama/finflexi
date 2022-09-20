import Menu from '@components/UI/Menu'
import MenuList from '@components/UI/MenuList'
import { useSelector } from 'react-redux'
import styles from '@styles/layouts/Header.module.css'


const Header = () => {
  const isMenuOpen = useSelector((state: {"menu":{"open": boolean}}) => state.menu.open)

  return (
    <>
    <header className={`${styles.header} ${isMenuOpen && styles.menuIsOpen}`}>
      <Menu />
      {isMenuOpen && <MenuList />}
    </header>
    </>
  )
}

export default Header