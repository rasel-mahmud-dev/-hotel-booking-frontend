import {createSlice} from '@reduxjs/toolkit';
import {loginOrRegistrationAction} from "store/actions/authAction.js";

const initialState = {
    auth: null,
    authLoaded: false,
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {

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

    }
});


// Action creators are generated for each case reducer function
// export const {} = authSlice.actions

export default authSlice.reducer