import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { menuActions } from '@store/index'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import styles from '@styles/UI/MenuList.module.css'
import SignOut from './SignOut'

const MenuList = () => {
  const [displaySignOut, setDisplaySignOut] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { data, status } = useSession()

  const clickHandler = (path: string) => {
    dispatch(menuActions.close())
    router.push(path)
  }
  const displaySignOutAlert = () => {
    setDisplaySignOut(true)
  }
  const closeSignOutAlert = () => {
    setDisplaySignOut(false)
  }
  const renderMenuItems = () => {
    return (
      <ul className={styles.menuList}>
        {status === 'unauthenticated' && <li><span onClick={() => clickHandler("/")} >Home</span></li>}
        <li><span onClick={() => clickHandler("/favorites")} >My Favorites</span></li>
        <li><span onClick={() => clickHandler("/economy")} >Economic Indicators</span></li>
        <li><span onClick={() => clickHandler("/account")} >My Account</span></li>
        {status === 'unauthenticated' && <li><span onClick={() => clickHandler("/signin")} >Sign In</span></li>}
        {status === 'authenticated' && <li><span onClick={displaySignOutAlert} >Sign Out</span></li>}
      </ul>
    )
  }

  return (
    <div className={styles.container}>
      {displaySignOut && <SignOut closeSignOutAlert={closeSignOutAlert} />}
      {!displaySignOut && renderMenuItems()}
    </div>
  )
}

export default MenuList