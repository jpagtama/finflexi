import { menuActions } from 'store'
import { useSelector, useDispatch } from 'react-redux'
import styles from '@styles/UI/Menu.module.css'

const Menu = () => {
    const dispatch = useDispatch()
    const menuState = useSelector((state: {"menu": {"open": boolean}}) => state.menu)

    const menuHandler = () => {
        dispatch(menuActions.toggle())
    }

    return (
        <button className={styles.menu} onClick={menuHandler}>
            <div className={`${menuState.open && styles.isActive} ${styles.hamburger}`} id="burgerMenu">
                <span className={styles.line}></span>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
            </div>
        </button>
    )
}

export default Menu