import { useSession } from 'next-auth/react'
import { menuActions } from '@store/index'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import SignOut from './SignOut'
import styles from '@styles/UI/MenuList.module.css'

const MenuListMobile = () => {
  const isSignOutOpen = useSelector((state: { "menu": { "signOutOpen": boolean } }) => state.menu.signOutOpen)
  const dispatch = useDispatch()
  const router = useRouter()
  const { data, status } = useSession()

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
      <ul className={styles.menuList}>
        {status === 'unauthenticated' && <li><span onClick={() => clickHandler("/")} >Home</span></li>}
        {status === 'authenticated' && <li><span onClick={() => clickHandler("/dashboard")} >Dashboard</span></li>}
        <li><span onClick={() => clickHandler("/dashboard/favorites")} >My Favorites</span></li>
        <li><span onClick={() => clickHandler("/economy")} >Economic Indicators</span></li>
        {status === 'unauthenticated' && <li><span onClick={() => clickHandler("/about")} >About Us</span></li>}
        {status === 'authenticated' && <li><span onClick={() => clickHandler("/account")} >My Account</span></li>}
        {status === 'unauthenticated' && <li><span onClick={() => clickHandler("/signin")} >Sign In</span></li>}
        {status === 'authenticated' && <li><span onClick={displaySignOutAlert} >Sign Out</span></li>}
      </ul>
    )
  }

  return (
    <div className={styles.container}>
      {isSignOutOpen && <SignOut closeSignOutAlert={closeSignOutAlert} />}
      {!isSignOutOpen && renderMenuItems()}
    </div>
  )
}

export default MenuListMobile;