import { menuActions } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, RootState } from '@store/index';
import { PiSignOutBold, PiSignInBold } from 'react-icons/pi';
import { BiBarChartSquare } from 'react-icons/bi';
import { MdOutlineAccountCircle } from 'react-icons/md';
import SearchBar from './SearchBar';
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
            <ul className='flex justify-around items-center text-dirty-white sm:text-xs lg:text-base '>
                <ul className='flex justify-between items-center gap-4'>
                    <li className='hover:cursor-pointer hover:scale-105 hover:text-white duration-150'>
                        <button className='px-2 py-2 bg-white text-black rounded-sm' onClick={() => clickHandler("/")} >
                            <span className='font-bold'>FIN</span>flexi
                        </button>
                    </li>
                    <li className='hover:cursor-pointer hover:scale-105 hover:text-white duration-150'><span onClick={() => clickHandler("/economy")} >Economic Indicators</span></li>
                    <li className='hover:cursor-pointer hover:scale-105 hover:text-white duration-150'><span onClick={() => clickHandler("/about")} >About Us</span></li>
                </ul>
                <li className='w-1/3 hover:cursor-pointer hover:scale-105 text-default-black duration-150'><SearchBar /></li>

                <ul className='flex justify-between gap-4'>
                    <li className='hover:cursor-pointer hover:scale-105 hover:text-white duration-150' >
                        <span className='sm:block md:hidden justify-center items-center text-4xl' onClick={() => clickHandler("/dashboard")} >
                            <BiBarChartSquare />
                        </span>
                        <span className='md:block hidden' onClick={() => clickHandler("/dashboard")} >Dashboard</span>
                    </li>
                    {/* <li className='hover:cursor-pointer hover:scale-105 hover:text-white duration-150' >
                        <span className='sm:block md:hidden justify-center items-center text-4xl' onClick={() => clickHandler("/account")} ><MdOutlineAccountCircle /></span>
                        <span className='md:block hidden' onClick={() => clickHandler("/account")} >My Account</span>
                    </li> */}
                    {!isLoggedIn && <li className='hover:cursor-pointer hover:scale-105 hover:text-white duration-150' >
                        <button onClick={() => clickHandler("/signin")} >
                            <span className='sm:block md:hidden flex justify-center items-center text-4xl' ><PiSignInBold /></span>
                            <span className='md:block hidden' >Sign In</span>
                        </button>
                    </li>}
                    {isLoggedIn && <li className='hover:cursor-pointer hover:scale-105 hover:text-white duration-150' >
                        <button onClick={signOut} >
                            <span className='sm:block md:hidden flex justify-center items-center text-4xl' ><PiSignOutBold /></span>
                            <span className='md:block hidden' >Sign Out</span>
                        </button>
                    </li>}
                </ul>
            </ul>
        </nav>
    )
}

export default MenuListDeskTop