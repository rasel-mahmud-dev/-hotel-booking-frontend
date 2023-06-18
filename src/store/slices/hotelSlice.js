import {createSlice} from '@reduxjs/toolkit';

import {createHotelAction, fetchAllHotelAction, fetchOwnerHotelAction} from "store/actions/hotelAction.js";
import {fetchPopularRoomAction} from "store/actions/roomAction.js";

const initialState = {
    hotel: [], // public all hotel list
    ownerHotel: {}, // {[userId: string]: []}
    popularRooms: {}, // {pageNumber: number, data: []},
    bookingItemInfo: {
        room: null,
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date().toISOString()
    }
};

export const hotelSlice = createSlice({
    name: 'hotelSlice',
    initialState,
    reducers: {

        setBookingItemInfo(state, action) {
            state.bookingItemInfo = {
                ...state.bookingItemInfo,
                ...action.payload
            }
        }

    },
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

        builder.addCase(fetchPopularRoomAction.fulfilled, (state, action) => {
            if (action.payload.rooms && action.payload.pageNumber) {
                state.popularRooms[action.payload.pageNumber] = action.payload.rooms
            }
        })
    }
});


// Action creators are generated for each case reducer function
export const {setBookingItemInfo} = hotelSlice.actions

export default hotelSlice.reducer