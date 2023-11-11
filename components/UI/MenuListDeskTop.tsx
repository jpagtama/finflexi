import { menuActions } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, RootState } from '@store/index';
import { useRouter } from 'next/router'

interface Props {
    isLoggedIn: boolean;
    isLoadingUserInfo: boolean;
}

const MenuListDeskTop = () => {
    const isSignOutOpen = useSelector((state: { "menu": { "signOutOpen": boolean } }) => state.menu.signOutOpen)
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
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
    const signOut = () => {
        router.push('/');
        dispatch(authActions.logout());
    }


    return (
        <nav className='w-screen'>
            <ul className='flex justify-around text-dirty-white sm:text-xs md:text-base '>
                <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/")} >Home</span></li>
                <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150' >
                    <span onClick={() => clickHandler("/dashboard")} >Dashboard</span>
                </li>

                <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150' >
                    <span onClick={() => clickHandler("/dashboard/favorites")} >My Favorites</span>
                </li>
                <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/economy")} >Economic Indicators</span></li>
                <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/about")} >About Us</span></li>
                <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150' >
                    <span onClick={() => clickHandler("/account")} >My Account</span>
                </li>
                {!isLoggedIn &&
                    <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150' >
                        <button onClick={() => clickHandler("/signin")} >Sign In</button>
                    </li>
                }
                {isLoggedIn &&
                    <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150' >
                        <button onClick={signOut} >Sign Out</button>
                    </li>
                }
            </ul>
        </nav>
    )
}

export default MenuListDeskTop