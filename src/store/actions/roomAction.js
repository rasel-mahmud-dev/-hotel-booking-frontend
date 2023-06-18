// fetch room for owner and public
import {createAsyncThunk} from "@reduxjs/toolkit";
import apis from "src/apis/index.js";
import errorResponse from "src/utils/errorResponse.js";


// create a room under hotel
export const createRoomAction = createAsyncThunk("hotelSlice/createRoom", async (payload, thunkAPI) => {
    try {

        let {status, data} = await apis.post(`/room/create`, payload)
        if (status === 201) {
            return data.room
        }
    } catch (ex) {
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


export const fetchRoomsAction = createAsyncThunk("rooms/fetchRooms", async (payload, thunkAPI) => {
    try {

        let {status, data} = await apis.get(`/room` + payload)
        if (status === 200) {
            return data.rooms
        }
    } catch (ex) {
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})

// get room detail for edit
export const getRoomDetailAction = createAsyncThunk("rooms/fetchAllRooms", async (payload, thunkAPI) => {
    try {

        let {status, data} = await apis.get(`/room/detail` + payload)
        if (status === 200) {
            return data.room
        }
    } catch (ex) {
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


export const filterRoomsAction = createAsyncThunk("rooms/filter", async (payload, thunkAPI) => {
    try {

        let {status, data} = await apis.post(`/room/filter`, payload)
        if (status === 200) {
            return data.rooms
        }
    } catch (ex) {
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// reserve room action
export const reserveRoomAction = createAsyncThunk("hotelSlice/reserve-room", async (payload, thunkAPI) => {
    try {

        let {status, data} = await apis.post(`/room/reserve`, payload)
        if (status === 201) {
            return data
        }
    } catch (ex) {
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})

// fetch booked room
export const fetchBookedRoomAction = createAsyncThunk("hotelSlice/fetch-booked-room", async (payload, thunkAPI) => {
    try {

        let {status, data} = await apis.get(`/room/booked` + (payload ? payload : ""))
        if (status === 200) {
            return data
        }
    } catch (ex) {
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// cancel booking room
export const cancelBookingAction = createAsyncThunk("hotelSlice/fetch-booked-room", async (payload, thunkAPI) => {
    try {

        let {status, data} = await apis.post(`/room/cancel-booking`, payload)
        if (status === 201) {
            return data
        }
    } catch (ex) {
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})

// checkout booking room
export const checkOutBookingRoomAction = createAsyncThunk("hotelSlice/checkout-booked-room", async (payload, thunkAPI) => {
    try {

        let {status, data} = await apis.post(`/room/booked-checkOut`, payload)
        if (status === 201) {
            return data
        }
    } catch (ex) {
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// fetch popular rooms
export const fetchPopularRoomAction = createAsyncThunk("hotelSlice/checkout-booked-room", async (payload, thunkAPI) => {
    try {

        const {pageNumber = 1} = payload

        const {popularRooms} = thunkAPI.getState().hotelState

        // check cached
        if (popularRooms[pageNumber]) {
            return;
        }

        let {status, data} = await apis.post(`/room/popular?pageNumber=${pageNumber}`)
        if (status === 200) {
            return {
                pageNumber,
                rooms: data.rooms
            }
        }
    } catch (ex) {
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// filter room by type for home page
export const filterRoomByTypeAction = createAsyncThunk("hotelSlice/filter-room-by-type", async (payload, thunkAPI) => {
    try {

        let {status, data} = await apis.get(`/room/filter-by-type?roomType=${payload}`)
        if (status === 200) {
            return data.rooms
        }
    } catch (ex) {
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})

