import { createSlice, configureStore } from '@reduxjs/toolkit'
import { CookieValueTypes, getCookie } from 'cookies-next';
import axios from 'axios';

const initialState = {
    open: false,
    signOutOpen: false,
}

const initialAuth = {
    isLoggedIn: false,
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
            console.log('inside redux store...action :>> ', action);
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName ?? '';
            state.lastName = action.payload.lastName ?? '';
        },
        logout(state) {
            state.isLoggedIn = false;
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