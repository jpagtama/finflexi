import { menuActions } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import Loading from './Loading';

interface Props {
    isLoggedIn: boolean;
    isLoadingUserInfo: boolean;
}

const MenuListDeskTop = ({ isLoggedIn, isLoadingUserInfo }: Props) => {
    const isSignOutOpen = useSelector((state: { "menu": { "signOutOpen": boolean } }) => state.menu.signOutOpen)
    const router = useRouter();
    const dispatch = useDispatch();

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


    return (
        <nav >
            {isLoadingUserInfo && <Loading />}
            {!isLoadingUserInfo && <ul className='flex sm:gap-8 text-dirty-white'>
                {<li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/")} >Home</span></li>}
                {isLoggedIn && <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/dashboard")} >Dashboard</span></li>}
                {isLoggedIn && <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/dashboard/favorites")} >My Favorites</span></li>}
                <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/economy")} >Economic Indicators</span></li>
                {<li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/about")} >About Us</span></li>}
                {isLoggedIn && <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/account")} >My Account</span></li>}
                {!isLoggedIn && <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/signin")} >Sign In</span></li>}
                {isLoggedIn && <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={displaySignOutAlert} >Sign Out</span></li>}
            </ul>}
        </nav>
    )
}

export default MenuListDeskTop