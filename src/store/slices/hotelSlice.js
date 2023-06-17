import {createSlice} from '@reduxjs/toolkit';

import {createHotelAction, fetchAllHotelAction, fetchOwnerHotelAction} from "store/actions/hotelAction.js";

const initialState = {
    hotel: [], // public all hotel list
    ownerHotel: {} // {[userId: string]: []}
};

export const hotelSlice = createSlice({
    name: 'hotelSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // login or registration successful
        builder.addCase(createHotelAction.fulfilled, (state, action) => {
            const hotel = action.payload
            if (hotel) {
                let authId = hotel.ownerId

                if (state.ownerHotel[authId]) {
                    state.ownerHotel[authId].push(hotel)
                } else {
                    state.ownerHotel[authId] = [hotel]
                }
                state.hotel.push(hotel)
            }
        })

        builder.addCase(fetchAllHotelAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.hotel = action.payload
            }
        })

        builder.addCase(fetchOwnerHotelAction.fulfilled, (state, action) => {

            if (action.payload.hotel && action.payload.authId) {
                state.ownerHotel[action.payload.authId] = action.payload.hotel
            }
        })
    }
});


// Action creators are generated for each case reducer function
// export const {} = hotelSlice.actions

export default hotelSlice.reducer