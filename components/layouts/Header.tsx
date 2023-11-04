import { useRouter } from 'next/router'
import NavBurgerButton from '@components/UI/NavBurgerButton'
import MenuListMobile from '@components/UI/MenuListMobile'
import SearchBar from '@components/UI/SearchBar'
import { useSelector } from 'react-redux'
import styles from '@styles/layouts/Header.module.css'
import MenuListDeskTop from '@components/UI/MenuListDeskTop'


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
      <header className={`flex justify-center items-center bg-gray-700 w-full h-20 px-4 fixed z-50`}>
        <div className='sm:hidden flex justify-end w-full'>
          <NavBurgerButton />
          {/* <MenuListMobile /> */}
        </div>
        <MenuListDeskTop />
      </header>
    </>
  )
}

export default Header