import { menuActions } from 'store'
import { useSelector, useDispatch } from 'react-redux'
import styles from '@styles/UI/Menu.module.css'

const NavBurgerButton = () => {
    const dispatch = useDispatch()
    const menuState = useSelector((state: { "menu": { "open": boolean } }) => state.menu)

    const menuHandler = () => {
        dispatch(menuActions.toggle())
    }

    return (
        <button onClick={menuHandler}>
            <div className={`flex flex-col gap-1 ${menuState.open && styles.isActive} ${styles.hamburger}`} id="burgerMenu">
                <span className='bg-light-indigo w-[45px] h-[5px] rounded-full' ></span>
                <span className='bg-light-indigo w-[45px] h-[5px] rounded-full' ></span>
                <span className='bg-light-indigo w-[45px] h-[5px] rounded-full' ></span>
            </div>
        </button>
    )
}

export default NavBurgerButton;