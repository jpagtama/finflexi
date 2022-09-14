import {useState} from 'react'
import styles from '../../styles/UI/Menu.module.css'

const Menu = () => {
    const [open, setOpen] = useState(false)

    const menuHandler = () => {
        setOpen(!open)
    }

    return (
        <button className={styles.menu} onClick={menuHandler}>
            <div className={`${open && styles.isActive} ${styles.hamburger}`} id="burgerMenu">
                <span className={styles.line}></span>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
            </div>
        </button>
    )
}

export default Menu