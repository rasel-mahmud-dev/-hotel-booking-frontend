import {createAsyncThunk} from "@reduxjs/toolkit";
import errorResponse from "src/utils/errorResponse.js";
import apis from "src/apis/index.js";

export const createHotelAction = createAsyncThunk("hotelSlice/creteHotel", async (payload, thunkAPI) => {
    try {

        let {status, data} = await apis.post(`/hotel/create`, payload)
        if (status === 201) {
            return data.hotel
        }
    } catch (ex) {
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})

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


export const fetchOwnerHotelAction = createAsyncThunk("hotelSlice/fetchOwnerHotel", async (payload, thunkAPI) => {
    try {

        let {status, data} = await apis.get(`/hotel/owner`)
        if (status === 200) {
            return data
        }
    } catch (ex) {
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


export const fetchAllHotelAction = createAsyncThunk("hotelSlice/fetchHotel", async (payload, thunkAPI) => {
    try {

        let {status, data} = await apis.post(`/hotel/all`)
        if (status === 200) {
            return data.hotel
        }
    } catch (ex) {
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})

export const getHotelDetailAction = createAsyncThunk("hotelSlice/hotelDetail", async (payload, thunkAPI) => {
    try {

        let {status, data} = await apis.get(`/hotel/detail` + payload)
        if (status === 200) {
            return data.hotel
        }
    } catch (ex) {
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})

export const fetchAllRoomsAction = createAsyncThunk("rooms/fetchAllRooms", async (payload, thunkAPI) => {
    try {

        let {status, data} = await apis.get(`/rooms` + payload)
        if (status === 200) {
            return data.rooms
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
