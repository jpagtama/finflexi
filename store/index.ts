import {createSlice, configureStore} from '@reduxjs/toolkit'

const initialState = {
    open: false
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggle(state) {
            state.open = !state.open
        },
        close(state) {
            state.open = false
        },
        open(state) {
            state.open = true
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