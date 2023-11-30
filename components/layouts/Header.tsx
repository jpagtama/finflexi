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
  const router = useRouter();
  const isMenuOpen = useSelector((state: RootState) => state.menu.open);

  return (
    <>
      {/* <div className={styles.searchBarSection}>
        <span className={styles.searchBarContainer}>
          {(router.asPath !== '/' && !isMenuOpen) && <SearchBar />}
        </span>
      </div> */}
      <header className={`flex justify-center items-center bg-gray-700 w-full h-20 sm:px-4 fixed z-30`}>
        <div className='sm:hidden flex justify-end gap-4 w-full px-8'>
          <AnimatePresence>
            {!isMenuOpen &&
              <motion.div className='w-full'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                exit={{ opacity: 0 }}
              >
                <SearchBar />
              </motion.div>
            }
          </AnimatePresence>
          <NavBurgerButton />
        </div>
        <div className='hidden sm:block'>
          <MenuListDeskTop />
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
            <MenuListMobile />
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default Header