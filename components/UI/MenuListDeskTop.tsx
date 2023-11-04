import { useSession } from 'next-auth/react';
import { menuActions } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'

const MenuListDeskTop = () => {
    const isSignOutOpen = useSelector((state: { "menu": { "signOutOpen": boolean } }) => state.menu.signOutOpen)
    const { status } = useSession();
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
        <nav className='hidden sm:block'>
            <ul className='flex sm:gap-8 text-dirty-white'>
                {status === 'unauthenticated' && <li className='hover:cursor-pointer hover:scale-110 duration-150'><span onClick={() => clickHandler("/")} >Home</span></li>}
                {status === 'authenticated' && <li className='hover:cursor-pointer hover:scale-110 duration-150'><span onClick={() => clickHandler("/dashboard")} >Dashboard</span></li>}
                <li className='hover:cursor-pointer hover:scale-110 duration-150'><span onClick={() => clickHandler("/dashboard/favorites")} >My Favorites</span></li>
                <li className='hover:cursor-pointer hover:scale-110 duration-150'><span onClick={() => clickHandler("/economy")} >Economic Indicators</span></li>
                {status === 'unauthenticated' && <li className='hover:cursor-pointer hover:scale-110 duration-150'><span onClick={() => clickHandler("/about")} >About Us</span></li>}
                {status === 'authenticated' && <li className='hover:cursor-pointer hover:scale-110 duration-150'><span onClick={() => clickHandler("/account")} >My Account</span></li>}
                {status === 'unauthenticated' && <li className='hover:cursor-pointer hover:scale-110 duration-150'><span onClick={() => clickHandler("/signin")} >Sign In</span></li>}
                {status === 'authenticated' && <li className='hover:cursor-pointer hover:scale-110 duration-150'><span onClick={displaySignOutAlert} >Sign Out</span></li>}
            </ul>
        </nav>
    )
}

export default MenuListDeskTop