import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, RootState } from '@store/index';
import { CookieValueTypes, getCookie } from 'cookies-next';
import axios from 'axios';

const URL = 'api/auth/me';

interface User {
    email: string;
    firstName: string;
    lastName: string;
}

const useSession = () => {
    const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);
    const { isLoggedIn, email, firstName, lastName } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const jwt = getCookie('jwt');
        const verifyUser = async (jwt: CookieValueTypes) => {
            try {
                const res = await axios.get(URL, {
                    headers: { authorization: `Bearer ${jwt}` }
                });

                if (res.data.success) dispatch(authActions.login(res.data.userInfo));
                else dispatch(authActions.logout());

            } catch (e) {
                dispatch(authActions.logout());
            }
        }

        setIsLoadingUserInfo(true);
        if (isLoggedIn === null) {
            if (jwt) verifyUser(jwt);
            if (!jwt) dispatch(authActions.logout());

        }
        setIsLoadingUserInfo(false);
    }, []);

    return { isLoggedIn, email, firstName, lastName, isLoadingUserInfo };
}

export default useSession