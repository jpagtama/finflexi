import { menuActions } from '@store/index';
import { RootState } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import SignOut from './SignOut';
import styles from '@styles/UI/MenuList.module.css';

interface Props {
  isLoggedIn: boolean
}

const MenuListMobile = () => {
  const { signOutOpen } = useSelector((state: RootState) => state.menu);
  const dispatch = useDispatch()
  const router = useRouter()

  const clickHandler = (path: string) => {
    dispatch(menuActions.close())
    router.push(path)
  }
  const displaySignOutAlert = () => {
    dispatch(menuActions.openSignOut())
  }
  const closeSignOutAlert = () => {
    dispatch(menuActions.closeSignOut())
  }
  const renderMenuItems = () => {
    return (
      <nav >
        <ul className='flex flex-col gap-12 text-dirty-white'>
          <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/")} >Home</span></li>
          <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/dashboard")} >Dashboard</span></li>
          <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/dashboard/favorites")} >My Favorites</span></li>
          <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/economy")} >Economic Indicators</span></li>
          <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/about")} >About Us</span></li>
          <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/account")} >My Account</span></li>
          <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/signin")} >Sign In</span></li>
          <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={displaySignOutAlert} >Sign Out</span></li>
        </ul>
      </nav>
    )
  }

  return (
    <div>
      {/* {isSignOutOpen && <SignOut closeSignOutAlert={closeSignOutAlert} />} */}
      {renderMenuItems()}
    </div>
  )
}

export default MenuListMobile;