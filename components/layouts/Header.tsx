import { useRouter } from 'next/router';
import NavBurgerButton from '@components/UI/NavBurgerButton';
import MenuListMobile from '@components/UI/MenuListMobile';
import SearchBar from '@components/UI/SearchBar';
import { authActions, RootState } from '@store/index';
import { useSelector, useDispatch } from 'react-redux';
import MenuListDeskTop from '@components/UI/MenuListDeskTop';
import useSession from 'hooks/useSession';
import { motion, AnimatePresence } from 'framer-motion';


const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, email, firstName, lastName, isLoadingUserInfo } = useSession();
  const router = useRouter();
  const isMenuOpen = useSelector((state: RootState) => state.menu.open)

  console.log('isLoggedIn? :>> ', isLoggedIn);

  return (
    <>
      {/* <div className={styles.searchBarSection}>
        <span className={styles.searchBarContainer}>
          {(router.asPath !== '/' && !isMenuOpen) && <SearchBar />}
        </span>
      </div> */}
      <header className={`flex justify-center items-center bg-gray-700 w-full h-20 sm:px-4 fixed z-50`}>
        <div className='sm:hidden flex flex-col justify-center w-full'>
          <div className='flex flex-col items-end w-full relative'>
            <div className='mx-4'>
              <NavBurgerButton />
            </div>
          </div>
        </div>
        <div className='hidden sm:block'>
          <MenuListDeskTop isLoggedIn={isLoggedIn} isLoadingUserInfo={isLoadingUserInfo} />
        </div>
      </header>
      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMenuOpen &&
          <motion.div className='flex justify-center sm:hidden bg-gray-700 w-full h-screen fixed z-10 pt-36'
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.25 }}
            exit={{ y: '-100%' }}
          >
            <MenuListMobile isLoggedIn={isLoggedIn} />
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default Header