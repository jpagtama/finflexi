import { menuActions } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { motion } from 'framer-motion';

const NavBurgerButton = () => {
    const dispatch = useDispatch();
    const { open: isMenuOpen } = useSelector((state: RootState) => state.menu);

    const variants = {
        animateTopToX: { rotate: -45, y: 9, width: '30px' },
        animateBottomToX: { rotate: 45, y: -9, width: '30px' },
        animateToHamburger: { rotate: 0, y: 0 },
    }

    const menuHandler = () => {
        dispatch(menuActions.toggle());
    }

    return (
        <button onClick={menuHandler}>
            <div className={`flex flex-col justify-center items-center gap-1`} id="burgerMenu">
                <motion.span className='bg-light-indigo w-[45px] h-[5px] rounded-full'
                    animate={isMenuOpen ? 'animateTopToX' : 'animateToHamburger'}
                    variants={variants}
                >

                </motion.span>
                <motion.span className='bg-light-indigo w-[45px] h-[5px] rounded-full'
                    animate={{ opacity: isMenuOpen ? 0 : 1, scaleX: isMenuOpen ? 0 : 1 }}
                    transition={{ style: 'spring' }}
                >
                </motion.span>
                <motion.span className='bg-light-indigo w-[45px] h-[5px] rounded-full'
                    animate={isMenuOpen ? 'animateBottomToX' : 'animateToHamburger'}
                    variants={variants}
                >
                </motion.span>
            </div>
        </button>
    )
}

export default NavBurgerButton;