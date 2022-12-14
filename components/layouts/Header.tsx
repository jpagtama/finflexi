import { useRouter } from 'next/router'
import Menu from '@components/UI/Menu'
import MenuList from '@components/UI/MenuList'
import SearchBar from '@components/UI/SearchBar'
import { useSelector } from 'react-redux'
import styles from '@styles/layouts/Header.module.css'


const Header = () => {
  const router = useRouter()
  const isMenuOpen = useSelector((state: { "menu": { "open": boolean } }) => state.menu.open)

  return (
    <>
      <div className={styles.searchBarSection}>
        <span className={styles.searchBarContainer}>
          {(router.asPath !== '/' && !isMenuOpen) && <SearchBar />}
        </span>
      </div>
      <header className={`${styles.header} ${isMenuOpen ? styles.menuIsOpen : styles.menuIsClosed}`}>
        <div className={styles.headerSection} >
          <span className={styles.menuIcon}>
            <Menu />
          </span>
        </div>
        <MenuList />
      </header>
    </>
  )
}

export default Header