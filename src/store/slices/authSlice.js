import {createSlice} from '@reduxjs/toolkit';
import {fetchCurrentAuthAction, loginOrRegistrationAction, updateProfileAction} from "store/actions/authAction.js";

const initialState = {
    auth: null,
    authLoaded: false,
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        logoutAction(state) {
            state.auth = null
            state.authLoaded = true
            localStorage.removeItem("token")
        },
    },
    extraReducers: (builder) => {
        // login or registration successful
        builder.addCase(loginOrRegistrationAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.auth = action.payload
            }
            state.authLoaded = true
        })

        // handle rejection error
        builder.addCase(loginOrRegistrationAction.rejected, (state) => {
            state.auth = null
            state.authLoaded = true
        })


        // handle fetch current auth user
        builder.addCase(fetchCurrentAuthAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.auth = action.payload
                state.authLoaded = true
            }
        })

        // handle rejection
        builder.addCase(fetchCurrentAuthAction.rejected, (state) => {
            state.auth = null
            state.authLoaded = true
        })


        // update profile
        builder.addCase(updateProfileAction.fulfilled, (state, action) => {
            state.auth = {
                ...state.auth,
                ...action.payload
            }
        })


    }
});


// Action creators are generated for each case reducer function
export const {logoutAction} = authSlice.actions

export default authSlice.reducer