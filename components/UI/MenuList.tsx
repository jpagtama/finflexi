import { menuActions } from '@store/index'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import styles from '@styles/UI/MenuList.module.css'
import React from 'react'

const MenuList = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const clickHandler = (path: string) => {
    dispatch(menuActions.close())
    router.push(path)
  }

  return (
    <div className={styles.container}>
      <ul className={styles.menuList}>
        <li><span onClick={() => clickHandler("/")} >Home</span></li>
        <li><span onClick={() => clickHandler("/signup")} >Sign-Up</span></li>
        <li><span onClick={() => clickHandler("/company/search")} >Search</span></li>
        <li><span onClick={() => clickHandler("/economy")} >Economy</span></li>
      </ul>
    </div>
  )
}

export default MenuList