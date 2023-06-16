import {createSlice} from '@reduxjs/toolkit';

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

    }
});


// Action creators are generated for each case reducer function
// export const {} = authSlice.actions

export default authSlice.reducer