import {createSlice} from '@reduxjs/toolkit';

import {createHotelAction} from "store/actions/hotelAction.js";

const initialState = {
    hotel: []
};

export const hotelSlice = createSlice({
    name: 'hotelSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // login or registration successful
        builder.addCase(createHotelAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.hotel.push(action.payload)
            }
        })
    }
});


// Action creators are generated for each case reducer function
// export const {} = hotelSlice.actions

export default hotelSlice.reducer