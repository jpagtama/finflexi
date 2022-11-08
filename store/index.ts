import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    signOutOpen: false,
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

const store = configureStore({
    reducer: {
        menu: menuSlice.reducer
    }
})

export const menuActions = menuSlice.actions
export default store