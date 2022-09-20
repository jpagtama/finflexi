import { menuActions } from '@store/index'
import {useDispatch, useSelector} from 'react-redux'
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
            <li><span onClick={(e) => clickHandler(`${process.env.NEXT_PUBLIC_BASE_URL}/company/search/`)} >Search</span></li>
            <li><span onClick={(e) => clickHandler(`${process.env.NEXT_PUBLIC_BASE_URL}/economy/`)} >Economy</span></li>
            <li>Filings</li>
        </ul>
    </div>
  )
}

export default MenuList