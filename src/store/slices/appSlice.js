import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    openSidebar: null
};

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        toggleSidebarAction(state, action) {
            if (action.payload !== undefined) {
                state.openSidebar = action.payload
            } else {
                state.openSidebar = !state.openSidebar
            }

        },
    }
});


// Action creators are generated for each case reducer function
export const {toggleSidebarAction} = appSlice.actions

export default appSlice.reducer