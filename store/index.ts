import { createSlice, configureStore } from '@reduxjs/toolkit'
import { CookieValueTypes, getCookie, deleteCookie } from 'cookies-next';
import axios from 'axios';

interface InitialAuth {
    isLoggedIn: boolean | null;
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

const initialState = {
    open: false,
    signOutOpen: false,
}

const initialAuth: InitialAuth = {
    isLoggedIn: null,
    id: '',
    email: '',
    firstName: '',
    lastName: ''
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggle(state) {
            state.open = !state.open
            state.signOutOpen = false
        },
        close(state) {
            state.open = false
            state.signOutOpen = false
        },
        open(state) {
            state.open = true
            state.signOutOpen = false
        },
        toggleSignOut(state) {
            state.signOutOpen = !state.signOutOpen
        },
        closeSignOut(state) {
            state.signOutOpen = false
        },
        openSignOut(state) {
            state.signOutOpen = true
        }
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuth,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName ?? '';
            state.lastName = action.payload.lastName ?? '';
        },
        logout(state) {
            deleteCookie('jwt');
            state.isLoggedIn = false;
            state.id = '';
            state.email = '';
            state.firstName = '';
            state.lastName = '';
        }
    }
})

const store = configureStore({
    reducer: {
        menu: menuSlice.reducer,
        auth: authSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export const menuActions = menuSlice.actions;
export const authActions = authSlice.actions;
export default store;