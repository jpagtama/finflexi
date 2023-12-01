import { authActions, menuActions } from '@store/index';
import { RootState } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const MenuListMobile = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const clickHandler = (path: string) => {
    dispatch(menuActions.close());
    router.push(path);
  }
  const signOut = () => {
    dispatch(menuActions.close());
    dispatch(authActions.logout());
    router.push('/');
  }
  const renderMenuItems = () => {
    return (
      <nav className='h-full'>
        <ul className='flex flex-col gap-16 text-dirty-white h-full'>
          <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/")} >Home</span></li>
          <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/economy")} >Economic Indicators</span></li>
          <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/about")} >About Us</span></li>
          <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/dashboard")} >Dashboard</span></li>
          {/* <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/account")} >My Account</span></li> */}
          {!isLoggedIn && <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={() => clickHandler("/signin")} >Sign In</span></li>}
          {isLoggedIn && <li className='hover:cursor-pointer hover:scale-110 hover:text-white duration-150'><span onClick={signOut} >Sign Out</span></li>}
        </ul>
      </nav>
    )
  }

  return (
    <div>
      {renderMenuItems()}
    </div>
  )
}

export default MenuListMobile;