import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'

import authReducer from "./slices/authSlice";
import appReducer from "./slices/appSlice.js";
import {hotelSlice} from "store/slices/hotelSlice.js";

export const store = configureStore({
    reducer: {
        authState: authReducer,
        appState: appReducer,
        hotelState: hotelSlice.reducer,
    }
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)